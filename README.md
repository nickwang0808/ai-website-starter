# Build your business website with Claude

A working website foundation and a step-by-step playbook for turning a conversation
about your business into a site you can preview, refine, publish, and maintain.
You make the business decisions. Claude works with the engineering decisions
already made here.

**Status: private development prototype.** The local software can be tested now;
the complete non-technical-owner journey still needs a pilot. This repository must
not be made public without the maintainer's explicit approval.

## Start here

Paste this repository's link into Claude with:

> Help me build my business website using this starter. Read the README, then
> CLAUDE.md and the linked playbook. Ask about my business and guide me one step
> at a time. Assume I'm not a developer. We will review the site locally before
> publishing anything.

If Claude cannot read this private repository, give it the README and instruction
files through your authorized local copy or attachments. A private link by itself
does not grant access. Don't make the repository public just to get around this.

### What you will need

- A computer and a browser. The preview runs on **your computer**, not a cloud service.
- **Node.js 24 LTS**, which includes npm, to run the website. TypeScript and the
  other website tools are installed automatically with the project.
- **Git** to save versions, and **Claude Code running locally** to let Claude edit
  files and run commands. Regular Claude chat can guide setup, but reading a link
  alone does not give it access to your computer.
- Later: your own GitHub and Cloudflare accounts. The publishing guide also
  walks through GitHub CLI for browser-based sign-in and direct pushes.

You do not need to understand these tools before starting. Ask Claude to follow
[the computer setup guide](docs/SETUP.md) with you.

**Cost:** this starter is free software; the default hosting path uses Cloudflare's
free offering within its limits. Claude Code access requires an eligible paid plan
or paid API usage. Domains, external booking/form services, and usage beyond free
limits may cost money. This is not a promise of a zero-cost AI account.

## What happens next?

1. Claude helps set up your computer and asks about your business, audience,
   services, contact preferences, branding, and reference sites.
2. It customizes the included site and opens a local preview.
3. You ask for changes until you are happy with it.
4. Claude guides GitHub, Cloudflare, and optionally domain setup.
5. **After you approve publication**, it pushes directly to your site's `main`
   branch. GitHub Actions checks and deploys the site. No pull requests.
6. Return to the same project folder for later changes. Preview and approve them
   before the next publishing push.

The scaffold deliberately uses bracketed placeholders, not fictional testimonials,
credentials, or business claims. Deployment is **off by default**, and publication
checks reject incomplete starter content.

## Instructions for Claude and other coding assistants

Read [CLAUDE.md](CLAUDE.md), [AGENTS.md](AGENTS.md), and
[docs/PLAYBOOK.md](docs/PLAYBOOK.md) before guiding the owner. Follow the stage-specific
links from the playbook. If a linked file cannot be read, say so and ask for access;
do not pretend its contents are known.

## For developers

Using Node 24, from this folder:

```sh
npm ci
npm run dev
```

Open the local URL printed by the command (normally `http://127.0.0.1:4321`).
Keep that terminal running; press `Ctrl+C` to stop it.

| Command                  | Purpose                                                                                                 |
| ------------------------ | ------------------------------------------------------------------------------------------------------- |
| `npm run check`          | Astro/TypeScript diagnostics, unit tests, formatting check                                              |
| `npm run build`          | Static build plus generated-site checks                                                                 |
| `npm run preview`        | Serve the production build locally                                                                      |
| `npm run test:browser`   | Desktop/phone browser regression tests after a build; see the evaluation guide for browser installation |
| `npm run check:publish`  | Reject unapproved/incomplete publication configuration; intentionally fails on the starter              |
| `npm run deploy:dry-run` | Validate Wrangler packaging after a build, without publishing                                           |
| `npm run format`         | Format source and documentation                                                                         |

The stack is Astro 7 + Tailwind CSS 4, with a deliberately small set of adapted
AstroWind primitives, static Cloudflare Workers assets, and GitHub Actions.
No database, contact-form backend, analytics, CMS, or cloud preview is included.
See [architecture and upstream provenance](docs/UPSTREAM.md).

### Documentation

- [Owner-guidance playbook](docs/PLAYBOOK.md)
- [Computer setup and local preview](docs/SETUP.md)
- [Publishing and domain setup](docs/DEPLOY.md)
- [Updates, recovery, and troubleshooting](docs/MAINTENANCE.md)
- [Saved project context](docs/PROJECT.md)
- [Evaluation scenarios and run template](docs/EVALUATION.md)
- [Product handoff](HANDOFF.md)

## License

[MIT](LICENSE.md). AstroWind's required onWidget copyright notice is retained.
An open-source license does not change this repository's current private visibility.
