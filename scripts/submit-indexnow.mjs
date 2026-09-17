import {readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
const settings=JSON.parse(readFileSync('site.config.json','utf8'));
execFileSync(process.execPath,['scripts/indexnow-submit.mjs','--site-url',settings.origin,'--key',settings.indexnowKey],{stdio:'inherit'});
