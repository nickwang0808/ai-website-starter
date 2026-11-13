import assert from 'node:assert/strict';
import test from 'node:test';
import { publicationErrors } from '../scripts/publication.mjs';

// Fixtures stay independent of owner content: customizing the site must not break tests.
const worker = { name: 'your-business-website' };
const ready = () => ({
  publishReady: true,
  url: 'https://garden-service.workers.dev',
  language: 'en',
  name: 'Garden service',
  description: 'Garden care for local households.',
  eyebrow: 'Local garden care',
  headline: 'Help with your garden',
  intro: 'Talk to us about the work you need.',
  contact: { label: 'Call us', href: 'tel:+442079460123', note: 'Tell us about your garden.' },
  about: { title: 'About us', description: 'An owner-operated garden service.' },
  services: [{ title: 'Garden care', description: 'Discuss your garden with us.' }],
  steps: [{ title: 'Get in touch', description: 'Call to discuss your needs.' }],
  faqs: [{ question: 'Where do you work?', answer: 'Call to check your address.' }],
});
const namedWorker = { ...worker, name: 'garden-service' };

test('untouched starter is blocked from publication', () => {
  const draft = { ...ready(), publishReady: false, headline: '[Your headline]' };
  const errors = publicationErrors(draft, worker);
  assert.ok(errors.some((error) => error.includes('publishReady')));
  assert.ok(errors.some((error) => error.includes('headline')));
  assert.ok(errors.some((error) => error.includes('Worker name')));
});

test('explicit approval does not bypass placeholder checks', () => {
  const draft = { ...ready(), headline: '[Your headline]' };
  assert.ok(publicationErrors({ ...draft, publishReady: true }, namedWorker).length > 0);
});

test('a completed site is accepted', () => {
  assert.deepEqual(publicationErrors(ready(), namedWorker), []);
});

test('unsafe and non-public site URLs are rejected', () => {
  for (const url of [
    '',
    'not-a-url',
    'http://garden-service.workers.dev',
    'https://localhost',
    'https://127.0.0.1',
    'https://example.com',
    'https://demo.example.com',
    'https://site.test',
    'https://user:password@garden-service.workers.dev',
    'https://garden-service.workers.dev/subpath',
    'https://garden-service.workers.dev?query=true',
  ]) {
    assert.ok(
      publicationErrors({ ...ready(), url }, namedWorker).some((e) => e.includes('HTTPS')),
      url,
    );
  }
});

test('working contact link types are accepted; fake or executable links are rejected', () => {
  for (const href of [
    'mailto:owner@garden-service.co.uk',
    'tel:+442079460123',
    'https://booking.service.org/garden',
  ]) {
    const site = ready();
    site.contact.href = href;
    assert.deepEqual(publicationErrors(site, namedWorker), [], href);
  }
  for (const href of [
    '',
    '#contact',
    'javascript:alert(1)',
    'mailto:hello@example.com',
    'https://example.com',
    'http://booking.service.org',
  ]) {
    const site = ready();
    site.contact.href = href;
    assert.ok(
      publicationErrors(site, namedWorker).some((e) => e.includes('contact.href')),
      href,
    );
  }
});

test('missing sections and bracketed text are rejected without throwing', () => {
  for (const change of [
    { about: undefined },
    { contact: undefined },
    { services: [] },
    { steps: [null] },
    { faqs: undefined },
    { headline: '[Write this later]' },
  ]) {
    assert.ok(publicationErrors({ ...ready(), ...change }, namedWorker).length > 0);
  }
});

test('Worker names cannot retain the default or contain shell metacharacters', () => {
  for (const name of ['your-business-website', '', 'My Website', 'site;echo bad', '../site']) {
    assert.ok(
      publicationErrors(ready(), { ...worker, name }).some((e) => e.includes('Worker name')),
      name,
    );
  }
});
