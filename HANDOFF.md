# AI Website Starter — Product Handoff

## Purpose

Create a public, open-source website starter that lets a business owner begin by pasting a repository link into Claude.

The owner should not need to understand the technology or prepare a technical brief. The repository supplies the instructions and foundation that allow Claude to guide them from an initial conversation to a website they can preview, refine, publish, and maintain.

The repository starts private during development. Public release is a later, explicit decision.

## The offer

> **Build your business website by having a conversation with Claude.**
>
> Paste our starter link into Claude. It guides you from your first idea to a website you can preview, refine, and publish—one step at a time. No coding experience required.
>
> The starter is free and open source, with hosting available on Cloudflare’s free tier. Your domain and any paid AI usage are separate.

“One link to get started” is the promise—not “no accounts, decisions, or setup will ever be required.”

## Who it serves

Business owners who want a professional website and are willing to collaborate with an AI assistant, but do not want to learn web development first.

The initial focus is business and service websites. Complex applications, e-commerce, authenticated portals, and bespoke backend functionality are not assumed to be included.

## Intended user experience

### 1. Start with a link

The owner pastes the public repository URL into Claude, accompanied by a simple request such as:

> Help me build my business website using this starter. Ask me about my business and guide me through the process. Assume I’m not a developer.

The README is the entry point for both the owner and the assistant. It must clearly direct the assistant to the relevant instructions rather than assume it will discover and read the entire repository.

### 2. Have a conversation

Claude asks approachable questions about:

- The business and its customers.
- Services or products.
- What visitors should do next.
- Style preferences and available branding.
- Existing content, images, and websites.

Gather information progressively. Do not require a long questionnaire before making useful progress. Do not invent testimonials, credentials, business results, or other factual claims.

### 3. Build something worth publishing

Help the owner create and preview a first version before introducing deployment infrastructure wherever the supported environment permits.

The owner should be able to give ordinary feedback:

- “Make this simpler.”
- “Change these colors.”
- “Add this service.”
- “Make booking more obvious.”

The assistant should explain only the technical details necessary for the current step.

### 4. Publish when ready

Once the owner is satisfied with the preview, guide them through:

- Creating or connecting their GitHub account.
- Saving the website in a repository they own.
- Creating or connecting their Cloudflare account.
- Configuring deployment.
- Optionally connecting a custom domain.
- Verifying the published website.

Introduce each requirement when it becomes relevant. Prefer supported authorization flows over manual credential handling. Never instruct users to paste secrets into chat or commit them to source control.

### 5. Keep improving

The guidance must support later changes, not only initial generation.

Owners should be able to return to their project and ask for content updates, new pages, design adjustments, and other routine improvements. Provide a clear way to preview changes before publication and recover from mistakes.

## Technical foundation

- **AstroWind** as the intended website foundation.
- **Astro** for the site.
- **Cloudflare’s free tier** for the default static-hosting path.
- **GitHub** for owner-controlled source code.
- Repository-based instructions and skills for AI-assisted setup and maintenance.

AstroWind already supplies components, agent instructions, skills, and Cloudflare deployment support. Inspect and reuse its current capabilities rather than duplicating them. Preserve required upstream license notices.

Keep the default website static. Additional services and dynamic functionality must have their requirements, limits, and potential costs explained separately.

## What makes this useful

The product is not just a template or a collection of prompts.

Its value is a coherent, approachable experience that helps an owner answer:

1. What should my website contain?
2. How do I turn that into a working site?
3. How do I see and refine it?
4. How do I publish it?
5. How do I change it later?

The free path must be genuinely complete. Avoidable confusion should be fixed in the starter, not used to create demand for paid support.

## Important constraints

- Reading a public repository does not automatically give an assistant file-editing, build, preview, or deployment capabilities.
- Determine and test the supported Claude environment before promising an end-to-end experience.
- If the user starts in an environment without the necessary capabilities, guide them clearly to a supported path.
- Do not claim a build passed, a deployment succeeded, or a domain works without verifying it.
- Free hosting does not mean every aspect of owning or extending a website is free.
- Do not promise guaranteed AI spending, search rankings, performance scores, or equivalence to every bespoke professional build.
- Keep this project separate from High Viz CTO’s existing repository. Do not copy private client information, credentials, internal business material, or unrelated project history.

## Relationship to High Viz CTO

The starter provides standalone value and demonstrates practical AI-assisted building.

Optional help may later fit the existing service model:

- **Build with you:** hands-on guidance at $250/hour.
- **Build for you:** separately scoped implementation.

Neither service is required to benefit from the starter. The immediate priority is the usefulness of the free experience, not sales mechanics.

## Initial validation

Test the experience with a willing business owner who receives only the repository link and opening prompt.

Confirm that they can:

- Understand how to begin.
- Describe their business without writing a technical brief.
- Reach a working preview.
- Request and inspect changes.
- Publish through the documented account and deployment steps.
- Verify the public site.
- Make a subsequent update.
- Recover from an unwanted change using the documented process.

Record where assistance is needed. Improve the guidance wherever the difficulty is avoidable.

## Decisions for the implementation phase

- The supported Claude environment and its preview mechanism.
- The exact AstroWind version and upstream reuse strategy.
- The default Cloudflare deployment and authorization flow.
- How content, branding, and configuration are organized for reliable editing.
- Which checks run before publication.
- How updates, rollback, and ongoing maintenance are explained.

Do not expand this into a platform or custom website editor before validating the simple repository-guided experience.

## Decisions confirmed after this handoff

- Ship a runnable, dependency-configured scaffold, not only prompts for creating one.
- The repository includes an operational playbook: Claude checks prerequisites,
  explains the next step, and verifies it before proceeding.
- Preview is local on the owner's computer, not a cloud preview deployment.
- Claude guides Node installation and the local tooling needed to edit, run, and
  save the site. TypeScript is a project dependency, not a separate global install.
- GitHub Actions is preconfigured. Account setup includes enabling Actions,
  creating a scoped Cloudflare API token, and putting it directly in GitHub secrets.
- Publication uses approved direct pushes to the owner's `main` branch, with
  checks before deployment. No pull-request workflow.
- Evaluate both the deterministic foundation and the Claude-guided owner journey.
  A successful local build is not evidence of an unassisted end-to-end experience.

The initial implementation chooses local Claude Code and Cloudflare Workers
static assets as the concrete route. These are documented implementation choices,
not a claim that account setup or the non-technical-owner pilot has been validated.
