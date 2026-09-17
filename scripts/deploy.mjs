import { execFileSync } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';

const project = 'swankey-boats';
const dryRun = process.argv.includes('--dry-run');
function credential(name) {
  if (process.env[name]) return process.env[name];
  if (process.platform !== 'darwin') throw new Error(`Set ${name} before deploying.`);
  return execFileSync('/usr/bin/security', ['find-generic-password', '-s', name, '-a', 'codex-env', '-w'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
}
const apiKey = credential('CLOUDFLARE_API_KEY');
const email = credential('CLOUDFLARE_EMAIL');
async function api(path) {
  const response = await fetch(`https://api.cloudflare.com/client/v4${path}`, { headers: { 'X-Auth-Key': apiKey, 'X-Auth-Email': email } });
  const body = await response.json();
  if (!response.ok || !body.success) throw new Error(`Cloudflare preflight failed (${response.status})`);
  return body.result;
}
const accounts = process.env.CLOUDFLARE_ACCOUNT_ID ? [{ id: process.env.CLOUDFLARE_ACCOUNT_ID }] : await api('/accounts');
let target;
for (const account of accounts) {
  try {
    const settings = await api(`/accounts/${account.id}/workers/scripts/${project}/settings`);
    if (target) throw new Error('More than one matching Worker. Set CLOUDFLARE_ACCOUNT_ID.');
    target = { accountId: account.id, settings };
  } catch (error) {
    if (!error.message.startsWith('Cloudflare preflight failed (404)')) throw error;
  }
}
if (!target) throw new Error('The existing swankey-boats Worker was not found.');
if (target.settings.bindings?.some(binding => binding.type !== 'assets')) throw new Error('Unexpected production bindings; review data continuity before deployment.');
const deployments = await api(`/accounts/${target.accountId}/workers/scripts/${project}/deployments`);
mkdirSync('.release', { recursive: true });
writeFileSync('.release/previous-deployment.json', JSON.stringify({ project, capturedAt: new Date().toISOString(), deployments: deployments.deployments?.map(({ id, versions }) => ({ id, versions })) }, null, 2));
execFileSync('npm', ['run', 'domain:test'], { stdio: 'inherit' });
execFileSync('npm', ['run', 'lint'], { stdio: 'inherit' });
execFileSync('npm', ['run', 'build'], { stdio: 'inherit' });
const env = { ...process.env, CLOUDFLARE_API_KEY: apiKey, CLOUDFLARE_EMAIL: email, CLOUDFLARE_ACCOUNT_ID: target.accountId, WRANGLER_SEND_METRICS: 'false' };
delete env.CLOUDFLARE_API_TOKEN;
execFileSync('node', ['node_modules/wrangler/bin/wrangler.js', 'deploy', '--config', 'wrangler.worker.jsonc', '--keep-vars', ...(dryRun ? ['--dry-run'] : [])], { stdio: 'inherit', env });

if (!dryRun) {
  execFileSync('npm', ['run', 'verify:live'], { stdio: 'inherit' });
  execFileSync('npm', ['run', 'indexnow'], { stdio: 'inherit' });
}
