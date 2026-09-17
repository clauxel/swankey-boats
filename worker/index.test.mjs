import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import worker from './index.ts';
import settings from '../site.config.json' with { type: 'json' };

test('www redirects to the canonical HTTPS origin with path and query intact', async () => {
 const response=await worker.fetch(new Request('https://'+settings.wwwHost+'/product?topic=dealer'),{ASSETS:{fetch(){throw Error('Redirect must not request assets');}}});
 assert.equal(response.status,308);
 assert.equal(response.headers.get('location'),settings.origin+'/product?topic=dealer');
});
test('canonical HTTPS pages retain asset handling',async()=>{
 const response=await worker.fetch(new Request(settings.origin+'/product'),{ASSETS:{fetch:async()=>new Response('E498')}});
 assert.equal(await response.text(),'E498');
});
test('video range requests remain playable on the custom domain',async()=>{
 const response=await worker.fetch(new Request(settings.origin+'/media/film.mp4',{headers:{range:'bytes=2-4'}}),{ASSETS:{fetch:async()=>new Response('0123456789',{headers:{'content-type':'video/mp4'}})}});
 assert.equal(response.status,206);assert.equal(response.headers.get('content-range'),'bytes 2-4/10');assert.equal(await response.text(),'234');
});
test('routing and public IndexNow verification agree with the canonical site config',async()=>{
 const wrangler=JSON.parse(await readFile(new URL('../wrangler.worker.jsonc',import.meta.url),'utf8'));
 assert.deepEqual(wrangler.routes.map(r=>r.pattern).sort(),[new URL(settings.origin).hostname,settings.wwwHost].sort());
 assert.ok(wrangler.routes.every(r=>r.custom_domain));
 assert.equal(wrangler.assets.run_worker_first,true);
 assert.equal((await readFile(new URL('../public/'+settings.indexnowKey+'.txt',import.meta.url),'utf8')).trim(),settings.indexnowKey);
});
