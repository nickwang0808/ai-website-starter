# Build your business website with Claude

A working website foundation and a step-by-step playbook for turning a conversation
about your business into a site you can preview, refine, publish, and maintain.
You make the business decisions. Claude works with the engineering decisions
already made here.

## Start here

Paste this into Claude:

> Help me build our website using this link: https://github.com/nickwang0808/ai-website-starter

That's all you need to provide to get started. You don't need a technical brief,
a special prompt, or a list of files for Claude to read. The repository contains
the instructions for Claude to ask about your business and guide you through each
step, including setup when it is needed.

## What happens next?

1. Claude asks about your business, services, contact preferences, branding, and
   reference sites, then guides the computer setup needed for your local preview.
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

## Requirements and costs

You don't need to set these up before starting the conversation. Claude guides
the necessary steps using [the computer setup guide](docs/SETUP.md):

- A computer and a browser. The preview runs on **your computer**, not a cloud service.
- **Node.js 24 LTS**, which includes npm, to run the website. TypeScript and the
  other website tools are installed automatically with the project.
- **Git** to save versions, and **Claude Code running locally** to let Claude edit
  files and run commands. Regular Claude chat can guide setup, but reading a link
  alone does not give it access to your computer.
- Later: your own GitHub and Cloudflare accounts. The publishing guide also
  walks through GitHub CLI for browser-based sign-in and direct pushes.

This starter is free software; the default hosting path uses Cloudflare's free
offering within its limits. GitHub Actions uses a standard Linux runner: free
for public repositories, and generally within the included allowance for
occasional updates to a private business website, depending on other account
usage. Claude Code access requires an eligible paid plan or paid API usage.
Domain registrars, booking/form providers, and cloud services may charge for
their services or usage beyond free allowances. Those are provider fees, not
charges from this starter's author.

Want a feature that is not included? Ask your assistant to help plan, build,
and test it in your own site. You do not need to contact the starter's author
or buy a feature upgrade. Your assistant should explain any outside service
fees before you agree; your AI plan or API usage still applies.

### Why these tools?

Read the [business owner's FAQ](docs/FAQ.md) for plain-language answers about
Cloudflare's free hosting, GitHub, website ownership, costs, speed, search engines,
and the tools behind the site. It also explains how to use a Cal.com or Calendly
booking link without building a booking system. You do not need to read it all
before starting; your assistant can explain each choice when it becomes relevant.

## Instructions for Claude and other coding assistants

The owner's repository link and request to build a site are the complete starting
brief. Do not require them to name instruction files, compose a detailed prompt,
or choose a technology stack.

Retrieve and read [CLAUDE.md](CLAUDE.md), [AGENTS.md](AGENTS.md), and
[docs/PLAYBOOK.md](docs/PLAYBOOK.md) before guiding the owner. Follow the stage-specific
links yourself rather than asking the owner to study the documentation. Begin with
a few approachable business questions and introduce setup steps when needed.

If you cannot access the repository, explain the access problem and guide the
owner to authorize access, open a downloaded copy in local Claude Code, or attach
the needed instructions. Do not pretend unread files are known or assume a link
grants local editing capabilities.

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

- [Business owner's FAQ: why this approach?](docs/FAQ.md)
- [Owner-guidance playbook](docs/PLAYBOOK.md)
- [Computer setup and local preview](docs/SETUP.md)
- [Publishing and domain setup](docs/DEPLOY.md)
- [Updates, recovery, and troubleshooting](docs/MAINTENANCE.md)
- [Saved project context](docs/PROJECT.md)
- [Evaluation scenarios and run template](docs/EVALUATION.md)

## License

[MIT](LICENSE.md). AstroWind's required onWidget copyright notice is retained.
