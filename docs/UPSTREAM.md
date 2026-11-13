# Architecture and upstream provenance

## Selected foundation

AstroWind upstream:
<https://github.com/arthelokyo/astrowind>
(the original `onwidget/astrowind` URL redirected here when inspected).

- Inspected upstream revision: `14e1a691f80548dcc36370847b1a02c0d0b12821`
- Upstream package version: `1.0.0-beta.66`
- Upstream license: MIT, copyright (c) 2023 onWidget; retained in `LICENSE.md`.
- Upstream used Astro 7.3.1. This starter pins Astro 7.4.11 because the dependency
  audit identified security advisories affecting 7.3.1. Exact installed versions
  are recorded in `package-lock.json`.

This is a **small AstroWind-derived scaffold**, not an unmodified distribution
of the entire AstroWind demo. It deliberately omits the demo gallery, blog,
MDX, analytics, icon catalog, remote font fetching, image CDN helpers, and SSR.
Add capabilities only when a real owner needs them.

## Reuse map

| Upstream file/capability inspected              | Use here                                                                                                               |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `src/components/ui/Headline.astro`              | Adapted layout/class merging; local props and escaped text instead of raw HTML                                         |
| `src/components/ui/WidgetWrapper.astro`         | Adapted section/container/background-slot convention; removed script-dependent reveal classes and unused dark-mode API |
| `src/components/ui/Button.astro`                | Adapted variant/class merging; narrowed to typed links with slots, no icon package or raw HTML                         |
| `src/assets/styles/tailwind.css`                | Reused semantic `--aw-*` theme mapping and button utility approach, reduced to the starter's palette                   |
| `astro.config.ts`                               | Static output and Tailwind Vite integration; no YAML virtual-module layer needed for one JSON data source              |
| `wrangler.jsonc`                                | Reused static `dist` assets and custom-404 hosting model; local config is plain `wrangler.json`                        |
| `AGENTS.md` and `.agents/skills/use-widgets.md` | Reused shared primitives, heading hierarchy, typed props, and verification conventions in our project instructions     |
| `.agents/skills/styling.md`                     | Reused one-place semantic theme editing, documented in this repository                                                 |
| `.agents/skills/deploy-cloudflare.md`           | Chose its default static-assets path, made account setup and direct-push CI explicit in `DEPLOY.md`                    |

Upstream instructions were inspected rather than copied wholesale because many
refer to features intentionally absent here. The owner-facing playbook adds the
discovery, checkpoints, local setup, approval, and recovery behavior this product needs.

## Where things live

| Location                         | Responsibility                                                                         |
| -------------------------------- | -------------------------------------------------------------------------------------- |
| `src/data/site.json`             | Business copy, contact link, canonical origin, language, initial publication readiness |
| `src/assets/styles/tailwind.css` | Palette, fonts, global focus styling, shared button utilities                          |
| `src/components/ui/`             | Adapted AstroWind primitives                                                           |
| `src/layouts/PageLayout.astro`   | Metadata, draft/noindex behavior, navigation, footer, skip link                        |
| `src/pages/`                     | Homepage, 404 page, generated robots.txt                                               |
| `public/`                        | Favicon and Cloudflare static-asset headers; approved owner assets can be added here   |
| `scripts/` and `tests/`          | Build/publication checks and regression tests                                          |
| `wrangler.json`                  | Worker name and static asset configuration                                             |
| `.github/workflows/site.yml`     | Check-only by default; opt-in publication from `main`                                  |
| `docs/PROJECT.md`                | Non-secret facts and context for a fresh Claude session                                |

System fonts avoid an external download during every build. The initial navigation
wraps on small screens instead of needing a JavaScript menu. FAQs use native
`details`/`summary`. The default site requires no client-side application runtime,
third-party scripts, or backend.

## Updating upstream

Do not run a blind upstream merge: this is a curated subset, not a full fork.
Inspect relevant upstream changes, carry over useful fixes with their notices,
update this provenance record, and run the local checks and browser review.
Keep package upgrades separate from unrelated visual or product changes.
