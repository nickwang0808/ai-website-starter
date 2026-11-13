# Initial implementation validation

This record concerns the starter's software, not a completed business-owner pilot.
The following checks were executed during the initial implementation.

## Environment

- Host: Windows, Git Bash command runner.
- Project runtime: Node 24.22.3 (invoked through an npm execution environment because
  the host's default Node is 26); no host-wide version change.
- Browser tests: Playwright Chromium, 1440 × 1000 desktop and 390 × 844 phone viewports.
- Browser binaries were installed into the ignored `.cache/ms-playwright` directory.

## Results

| Check                    | Observed result                                                                                                                           |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `npm ci`                 | Fresh locked installation succeeded                                                                                                       |
| `npm run check`          | Astro/TypeScript: no errors, warnings, or hints; 9 unit/repository tests passed; formatting passed                                        |
| `npm run build`          | Static homepage, 404, and robots.txt generated; built-site checks passed                                                                  |
| `npm run dev`            | Bound to `127.0.0.1:4321`; HTTP 200 and actual scaffold content verified                                                                  |
| `npm run test:browser`   | 6 tests passed across desktop/phone, using `npm run preview`                                                                              |
| Browser screenshots      | Desktop and phone screenshots inspected: visible sections, wrapped navigation, no observed overlap; automated overflow checks also passed |
| `npm run check:publish`  | Exited 1 as intended: untouched placeholders, missing public origin/contact, default Worker name, and lack of approval block publication  |
| `npm run deploy:dry-run` | Wrangler read the built static assets and exited successfully without publishing                                                          |
| `npm audit`              | Zero known vulnerabilities after upgrading Astro from upstream's version                                                                  |
| `git diff --check`       | Passed                                                                                                                                    |

Browser coverage includes page content/title, draft noindex, no fake form,
keyboard skip link, section navigation, native FAQ expansion, custom 404 status,
and the return-home link. These are functional smoke tests, not a comprehensive
accessibility audit or a real phone/device test.

Commands were run under Node 24 with
`npm exec --yes --package=node@24 --package=npm@11 -- npm ...`.
Browser execution additionally set `PLAYWRIGHT_BROWSERS_PATH=.cache/ms-playwright`;
Wrangler's dry run set `WRANGLER_SEND_METRICS=false`.
The ordinary documented commands remain the path for a computer already on Node 24.

The first dependency audit found Astro advisories; the pinned version was updated
before final validation. Browser-test JSON loading was corrected for native ESM.
The current npm version also reports lifecycle-script approval warnings for
`esbuild` and `workerd`; installation, build, and the Wrangler dry run succeeded.
No global npm permissions or machine security policy was weakened.

## Not exercised

- Fresh-computer Node/Git/Claude Code installation by a non-technical owner.
- A fresh Claude conversation following only the repository link.
- macOS and Linux local installation.
- GitHub authorization, Actions enablement, or an actual hosted Actions run.
- Cloudflare account onboarding, token authorization, or a live deployment.
- Custom domain/DNS/HTTPS provisioning.
- Live update and revert deployment.

Do not infer these results from the unit tests, browser checks, or Wrangler dry run.
No account, repository visibility, DNS, or public hosting changes are part of this
local implementation validation.
