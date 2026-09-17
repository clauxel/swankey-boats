import test from 'node:test';
import assert from 'node:assert/strict';
import { apiUrl, validate } from './openrouter-video.mjs';

test('credentials remain on the OpenRouter video API origin', () => {
  assert.equal(apiUrl('https://openrouter.ai/api/v1/videos/job/content?index=0').origin, 'https://openrouter.ai');
  for (const url of ['https://example.com/api/v1/videos', 'http://openrouter.ai/api/v1/videos', 'https://openrouter.ai.evil.test/api/v1/videos', 'https://openrouter.ai/api/v1/keys', 'https://openrouter.ai/api/v1/videos-leak']) {
    assert.throws(() => apiUrl(url));
  }
});

test('video edit models inherit source timing and reject generation-only controls', () => {
  const model = { id: 'black-forest-labs/flux-video-edit' };
  const body = { model: model.id, prompt: 'Make the boat consistent in all shots.' };
  assert.doesNotThrow(() => validate(body, model));
  for (const extra of [{ duration: 15 }, { aspect_ratio: '21:9' }, { resolution: '720p' }, { generate_audio: false }]) {
    assert.throws(() => validate({ ...body, ...extra }, model));
  }
});

test('rejects unsupported settings and accidental loss of the source video', () => {
  const model = { id: 'sample', supported_durations: [15], supported_resolutions: ['720p'], supported_aspect_ratios: ['21:9'] };
  const body = { model: 'sample', prompt: 'Replace the boat', duration: 15, resolution: '720p', aspect_ratio: '21:9', input_references: [{ type: 'video_url', video_url: { url: 'https://example.com/source.mp4' } }] };
  assert.doesNotThrow(() => validate(body, model));
  assert.throws(() => validate({ ...body, duration: 3 }, model));
  assert.throws(() => validate({ ...body, resolution: '4K' }, model));
  assert.throws(() => validate({ ...body, frame_images: [{}] }, model));
  assert.throws(() => validate({ ...body, input_references: [{ type: 'video_url', video_url: { url: 'http://example.com/source.mp4' } }] }, model));
  assert.throws(() => validate({ ...body, input_references: [{ type: 'video_url', video_url: { url: 'data:video/mp4;base64,AAAA' } }] }, model));
  assert.throws(() => validate({ ...body, input_references: [{ type: 'video_url', video_url: { url: 'data:text/html;base64,AAAA' } }] }, model));
});
