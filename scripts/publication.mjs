/**
 * A guardrail against accidentally publishing the untouched scaffold.
 * This is not a substitute for the owner's factual and visual review.
 */
export function publicationErrors(site, worker) {
  const errors = [];
  if (site.publishReady !== true)
    errors.push('Set publishReady only after the owner approves the site.');

  let url;
  try {
    url = new URL(site.url);
  } catch {
    errors.push('Set url to the final public HTTPS origin.');
  }
  if (
    url &&
    (url.protocol !== 'https:' ||
      url.username ||
      url.password ||
      url.port ||
      url.pathname !== '/' ||
      url.search ||
      url.hash ||
      !url.hostname.includes('.') ||
      /(^|\.)(localhost|example\.com|example\.org|example\.net)$/.test(url.hostname) ||
      /(\.local|\.test|\.invalid)$/.test(url.hostname) ||
      /^[\d.]+$/.test(url.hostname) ||
      url.hostname.includes(':'))
  ) {
    errors.push('url must be a real public HTTPS origin, without a path, credentials, or query.');
  }

  function requireText(value, path) {
    if (typeof value !== 'string' || !value.trim() || /\[[^\]]+\]/.test(value)) {
      errors.push(`${path}: replace the bracketed placeholder with confirmed business content.`);
    }
  }

  for (const field of ['name', 'description', 'eyebrow', 'headline', 'intro', 'language']) {
    requireText(site[field], field);
  }
  for (const field of ['title', 'description']) requireText(site.about?.[field], `about.${field}`);
  for (const field of ['label', 'note']) requireText(site.contact?.[field], `contact.${field}`);
  for (const [field, keys] of [
    ['services', ['title', 'description']],
    ['steps', ['title', 'description']],
    ['faqs', ['question', 'answer']],
  ]) {
    if (!Array.isArray(site[field]) || !site[field].length) {
      errors.push(
        `${field}: provide at least one entry, or deliberately remove this section and its check.`,
      );
      continue;
    }
    site[field].forEach((entry, index) =>
      keys.forEach((key) => requireText(entry?.[key], `${field}[${index}].${key}`)),
    );
  }

  const contact = site.contact?.href;
  let validContact = false;
  if (typeof contact === 'string') {
    if (/^mailto:[^\s@?]+@[^\s@?]+\.[^\s@?]+$/.test(contact)) {
      validContact = !/@(?:[^@]*\.)?example\.(com|org|net)$/i.test(contact);
    } else if (/^tel:\+?[0-9 ()-]{7,}$/.test(contact)) {
      validContact = true;
    } else {
      try {
        const booking = new URL(contact);
        validContact =
          booking.protocol === 'https:' &&
          !booking.username &&
          !booking.password &&
          booking.hostname.includes('.') &&
          !/(^|\.)(localhost|example\.com|example\.org|example\.net)$/.test(booking.hostname);
      } catch {
        // Report a readable error below rather than a URL parser exception.
      }
    }
  }
  if (!validContact) {
    errors.push('contact.href: set a real mailto:, tel:, or HTTPS booking link and test it.');
  }

  if (
    typeof worker.name !== 'string' ||
    !/^[a-z][a-z0-9-]{0,62}$/.test(worker.name) ||
    worker.name === 'your-business-website'
  ) {
    errors.push(
      'Choose a unique Worker name in wrangler.json (lowercase letters, numbers, hyphens).',
    );
  }
  return errors;
}
