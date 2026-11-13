import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const read = (path) => readFile(resolve('dist', path), 'utf8');
const home = await read('index.html');
assert.equal((home.match(/<h1(?:\s|>)/g) || []).length, 1, 'Homepage must have exactly one h1.');
for (const id of ['main', 'services', 'about', 'process', 'questions', 'contact']) {
  assert.ok(home.includes(`id="${id}"`), `Missing section: ${id}`);
}
assert.ok(
  !/<form(?:\s|>)/.test(home),
  'Do not ship a contact form without an implemented service.',
);
assert.ok(
  !/<script[^>]+src=["']https?:/.test(home),
  'Default site must not load third-party scripts.',
);
assert.ok((await read('404.html')).includes('This page isn'), 'Missing custom 404 page.');
assert.ok((await read('robots.txt')).includes('User-agent: *'), 'Missing crawler policy.');
assert.ok(
  (await read('_headers')).includes('X-Content-Type-Options'),
  'Missing static asset headers.',
);
assert.ok((await read('favicon.svg')).includes('<svg'), 'Missing favicon.');

// Check every generated homepage fragment and local asset, not just the build exit code.
for (const [, href] of home.matchAll(/(?:href|src)="([^"]+)"/g)) {
  if (href.startsWith('#') || href.startsWith('/#')) {
    const id = href.slice(href.indexOf('#') + 1);
    assert.ok(home.includes(`id="${id}"`), `Broken anchor: ${href}`);
  } else if (href.startsWith('/') && href !== '/') {
    await read(href.slice(1).split('?')[0]);
  }
}
console.log('Built-site checks passed: sections, links, assets, metadata files, and 404.');
