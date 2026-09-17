import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const API = 'https://openrouter.ai/api/v1/videos';

export function apiUrl(value) {
  const url = new URL(value, `${API}/`);
  if (url.origin !== 'https://openrouter.ai' || !/^\/api\/v1\/videos(?:\/|$)/.test(url.pathname) || url.username || url.password) {
    throw new Error('Refusing to send credentials outside the OpenRouter video API.');
  }
  return url;
}

function apiKey() {
  if (process.env.OPENROUTER_API_KEY) return process.env.OPENROUTER_API_KEY;
  try {
    return execFileSync('/usr/bin/security', ['find-generic-password', '-s', 'OPENROUTER_API_KEY', '-a', 'codex-env', '-w'], {
      encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
  } catch {
    throw new Error('OPENROUTER_API_KEY is unavailable in the environment or configured Keychain entry.');
  }
}

async function request(url, init = {}) {
  const response = await fetch(apiUrl(url), {
    ...init, redirect: 'error', signal: AbortSignal.timeout(60_000),
    headers: { Authorization: `Bearer ${apiKey()}`, 'Content-Type': 'application/json' },
  });
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    const error = new Error(`OpenRouter HTTP ${response.status}: ${body.error?.message ?? body.error ?? response.statusText}`);
    error.httpStatus = response.status;
    throw error;
  }
  return response;
}

function save(path, data, exclusive = false) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, JSON.stringify(data, null, 2) + '\n', { mode: 0o600, flag: exclusive ? 'wx' : 'w' });
}

export function validate(body, model) {
  if (!model || body.model !== model.id) throw new Error('Model is not in the current video catalog.');
  if (!body.prompt?.trim()) throw new Error('A prompt is required.');
  if (body.model === 'black-forest-labs/flux-video-edit' && ['duration', 'resolution', 'aspect_ratio', 'size', 'generate_audio'].some(field => body[field] !== undefined)) {
    throw new Error('FLUX Video Edit inherits source timing, geometry and audio; omit generation overrides.');
  }
  for (const [field, list] of [['duration', 'supported_durations'], ['resolution', 'supported_resolutions'], ['aspect_ratio', 'supported_aspect_ratios']]) {
    if (body[field] !== undefined && model[list]?.length && !model[list].includes(body[field])) {
      throw new Error(`Unsupported ${field}: ${body[field]}`);
    }
  }
  if (body.frame_images?.length && body.input_references?.length) {
    throw new Error('frame_images would override the video references. Choose one mode.');
  }
  for (const ref of body.input_references ?? []) {
    const value = ref[ref.type]?.url;
    if (!['image_url', 'video_url', 'audio_url'].includes(ref.type) || !value || new URL(value).protocol !== 'https:') {
      throw new Error('References must use documented media types and HTTPS URLs.');
    }
  }
}

function summary(job) {
  return { id: job.id, status: job.status, cost: job.usage?.cost, error: job.error };
}

async function main() {
  const [command, file, extra] = process.argv.slice(2);
  if (command === 'models') {
    const catalog = await (await request(`${API}/models`)).json();
    if (file) save(file, catalog);
    console.log(JSON.stringify(catalog.data.map(({ id, supported_durations, supported_resolutions, pricing_skus }) => ({ id, supported_durations, supported_resolutions, pricing_skus })), null, 2));
    return;
  }
  if (command === 'submit') {
    if (!file || !extra) throw new Error('Usage: submit request.json job.json');
    if (existsSync(extra)) throw new Error('Job file already exists. Resume with status; submission is never automatically retried.');
    const body = JSON.parse(readFileSync(file, 'utf8'));
    const catalog = await (await request(`${API}/models`)).json();
    validate(body, catalog.data.find(model => model.id === body.model));
    const record = {
      model: body.model, submittedAt: new Date().toISOString(),
      requestSha256: createHash('sha256').update(JSON.stringify(body)).digest('hex'),
      status: 'submitting',
    };
    // Persist before the paid request. Even an uncertain network failure must not resubmit automatically.
    save(extra, record, true);
    try {
      const job = await (await request(API, { method: 'POST', body: JSON.stringify(body) })).json();
      save(extra, { ...record, ...job });
      console.log(JSON.stringify(summary(job)));
    } catch (error) {
      const rejected = error.httpStatus >= 400 && error.httpStatus < 500;
      save(extra, { ...record, status: rejected ? 'rejected' : 'submission_unconfirmed', error: error.message });
      throw error;
    }
    return;
  }
  if (command === 'status' || command === 'download') {
    if (!file) throw new Error('A job file is required.');
    const record = JSON.parse(readFileSync(file, 'utf8'));
    if (!record.id) throw new Error('No confirmed job ID. Inspect the submission response before trying another paid request.');
    const job = await (await request(`${API}/${encodeURIComponent(record.id)}`)).json();
    save(file, { ...record, ...job, checkedAt: new Date().toISOString() });
    console.log(JSON.stringify(summary(job)));
    if (command === 'download') {
      if (job.status !== 'completed') throw new Error('Video is not completed.');
      if (!extra || existsSync(extra)) throw new Error('Provide a new output filename. Existing assets are never overwritten.');
      const response = await request(`${API}/${encodeURIComponent(record.id)}/content?index=0`);
      if (!response.headers.get('content-type')?.includes('video/')) throw new Error('Content endpoint did not return a video.');
      const bytes = Buffer.from(await response.arrayBuffer());
      mkdirSync(dirname(extra), { recursive: true });
      writeFileSync(extra, bytes, { flag: 'wx', mode: 0o600 });
      console.log(JSON.stringify({ bytes: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex') }));
    }
    return;
  }
  throw new Error('Usage: openrouter-video.mjs models [catalog.json] | submit request.json job.json | status job.json | download job.json output.mp4');
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main().catch(error => { console.error(error.message); process.exitCode = 1; });
}
