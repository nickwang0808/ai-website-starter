import assert from 'node:assert/strict';
import { readFile, readdir, access } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import test from 'node:test';
import { parse } from 'yaml';

test('documentation links resolve to files in the repository', async () => {
  const documents = [
    'README.md',
    'AGENTS.md',
    'CLAUDE.md',
    ...(await readdir('docs')).filter((name) => name.endsWith('.md')).map((name) => `docs/${name}`),
  ];
  for (const path of documents) {
    const text = await readFile(path, 'utf8');
    for (const [, link] of text.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
      if (/^[a-z]+:\/\//i.test(link) || link.startsWith('#')) continue;
      await assert.doesNotReject(
        access(resolve(dirname(path), link.split('#')[0])),
        `${path}: broken link ${link}`,
      );
    }
  }
});

test('workflow deploys only from main with explicit opt-in and checks before secrets', async () => {
  const workflow = parse(await readFile('.github/workflows/site.yml', 'utf8'));
  assert.deepEqual(workflow.on.push.branches, ['main']);
  assert.equal(workflow.on.pull_request, undefined);
  assert.equal(workflow.permissions.contents, 'read');
  assert.equal(workflow.concurrency['cancel-in-progress'], false);
  const steps = workflow.jobs.website.steps;
  const publishIndex = steps.findIndex((step) => step.run?.includes('wrangler deploy'));
  const publish = steps[publishIndex];
  assert.equal(publish.if, "vars.DEPLOY_ENABLED == 'true' && github.ref == 'refs/heads/main'");
  assert.equal(publish.env.CLOUDFLARE_API_TOKEN, '${{ secrets.CLOUDFLARE_API_TOKEN }}');
  assert.equal(publish.env.CLOUDFLARE_ACCOUNT_ID, '${{ vars.CLOUDFLARE_ACCOUNT_ID }}');
  for (const command of ['npm ci', 'npm run check', 'npm run build', 'npm run check:publish']) {
    const index = steps.findIndex((step) => step.run === command);
    assert.ok(index >= 0 && index < publishIndex, `${command} must precede deployment`);
    if (command === 'npm run check:publish') assert.equal(steps[index].if, publish.if);
  }
  assert.ok(
    steps.some((step) => step.run?.includes('commits/main')),
    'Stale deployments must be checked',
  );
  assert.ok(!steps.some((step) => step['continue-on-error']), 'Checks must not be ignored');
});
