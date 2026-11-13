import { readFile } from 'node:fs/promises';
import { publicationErrors } from './publication.mjs';

const site = JSON.parse(await readFile(new URL('../src/data/site.json', import.meta.url), 'utf8'));
const worker = JSON.parse(await readFile(new URL('../wrangler.json', import.meta.url), 'utf8'));
const errors = publicationErrors(site, worker);

if (errors.length) {
  console.error('Not ready to publish:\n' + errors.map((error) => `- ${error}`).join('\n'));
  process.exitCode = 1;
} else {
  console.log(
    'Publication configuration passed. Owner approval and live verification are still required.',
  );
}
