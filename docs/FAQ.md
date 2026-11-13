# Why this approach? Questions for business owners

You do not need to learn web development to use this starter. Your assistant
handles the technical work it has access to and guides you through the steps
that need your computer, accounts, or approval. This guide explains the choices
behind that process.

- [The approach, ownership, and costs](#the-approach-ownership-and-costs)
- [Hosting and publishing](#hosting-and-publishing)
- [The tools behind the website](#the-tools-behind-the-website)
- [Speed, search, and accessibility](#speed-search-and-accessibility)
- [Bookings, enquiries, and ongoing care](#bookings-enquiries-and-ongoing-care)

For the starting prompt, return to the [README](../README.md). You can ask your
assistant about any of these topics when they become relevant; this is not
required reading before you start.

## The approach, ownership, and costs

### Why use this starter instead of asking AI to make a website from scratch?

The starter supplies a working site, a chosen set of tools, checks, and a
publishing procedure. Your assistant can spend its effort understanding your
business and adapting the site rather than inventing a new technical setup.

It is a starting point, not a requirement that every business look the same.
You can change the wording, colors, layout, and sections with your assistant.
You still need to provide accurate business facts and review the result.

### Why not use a website builder or hire a professional?

This approach gives you editable website files and an assistant-guided workflow
without requiring a subscription to a visual website builder. It suits owners
who are comfortable discussing changes with an assistant and completing guided
setup steps.

A visual builder may suit you better if you want to drag and drop everything
yourself. A professional may be the better choice for complex requirements,
specialist design, or ongoing support you do not want to manage. This starter
reduces the work involved; it does not remove every responsibility or cost.

### What kinds of websites is it designed for?

Business websites that explain what you offer and help visitors contact you:
service descriptions, an introduction, answers to common questions, and an
email, phone, or booking link.

The included site is not a shop, customer portal, or application with user
accounts. Those features need additional services and decisions. Linking to an
existing booking or commerce service can be much simpler than building one.

### Do I own the website? Can I leave this setup later?

Keep your website in your own GitHub repository and use accounts you control.
You retain your own business content and assets, subject to any third-party
licenses. The starter is provided under the [MIT license](../LICENSE.md);
retain its required notices.

You receive editable source files, not just access to a hosted editor. Another
developer or capable coding assistant can work on them. The generated site is
ordinary HTML, CSS, and assets, so it can be moved to another static host.
Moving still requires configuring the new host, publishing process, and domain.

### What is free, and what might I pay for?

- **Starter and website tools:** this starter and its included open-source
  development tools do not require a software subscription.
- **Hosting:** the default static-site path uses Cloudflare's free offering.
  See the hosting explanation below for the distinction between static files
  and paid services.
- **Source storage and automation:** GitHub has free offerings, but Actions
  usage has plan-dependent allowances, particularly for private repositories.
  Review [GitHub's billing guidance](https://docs.github.com/en/billing/concepts/product-billing/github-actions)
  before enabling paid usage.
- **AI assistance:** Claude Code requires eligible paid access or API billing.
  A free browser-chat account is not a substitute for local coding access.
- **Optional extras:** a custom domain, business email, booking tools, form
  services, paid assets, or added functionality may have separate charges.

Providers can change plans and limits. Your assistant should check current
pricing before you approve a paid service. Free hosting is not a promise that
every part of running a business website is free forever.

## Hosting and publishing

### What is Cloudflare, and why did we choose it?

Cloudflare is a widely used internet infrastructure provider offering website
delivery, security, and developer services. It is not the tool that designs
your website.

We use **Cloudflare Workers static assets** to serve the finished files over
its global network. It fits a lightweight business site: there is no server
operating system for you to administer, it supports HTTPS, and the static
hosting has a free offering. We do not need Cloudflare's other products to
launch this starter.

### Why is the hosting free? Will more visitors force me onto a paid plan?

Cloudflare offers free services alongside paid products. For this starter's
hosting mode, its [static-assets billing documentation](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/)
currently states that requests for static assets are free and unlimited, with
no additional charge for storing those assets. Platform limits and service
terms still apply.

This is more specific than saying that a small business will stay below a
traffic allowance. Serving these static files does not become paid merely
because more people visit.

If you add code that runs on Cloudflare's servers, a database, or other
services, different limits and prices may apply. The
[Workers Paid plan](https://developers.cloudflare.com/workers/platform/pricing/)
currently has a **$5 USD monthly minimum**, with additional usage charges
possible. That is not a maximum bill or the price of every Cloudflare product.
The default starter does not require that plan.

### What is GitHub, and why do I need it as well as Cloudflare?

They have different jobs:

- **GitHub** stores your website's source files and history, and runs the
  automated publishing steps.
- **Cloudflare** serves the published website to visitors.

Keeping the source in your own repository makes changes recoverable and lets
you hand the project to another assistant or developer. Your source repository
can be private while the website itself is public.

### What is Git? Is it the same as GitHub?

Git is the tool that saves named versions of files on your computer. GitHub
is an online service where you can store that history and run automation.
Saved versions let your assistant inspect what changed and prepare a reversal
if needed.

You do not need Git to read the public instructions or download the starter as
a ZIP. Your assistant guides installation when preparing your computer; the
[setup guide](SETUP.md) covers Windows, macOS, and Linux.

### Why automate publishing with GitHub Actions?

GitHub Actions follows a saved set of instructions: install the specified
dependencies, check the source, build the website, and publish it when enabled.
This avoids relying on someone remembering a sequence of manual uploads.

You may hear this called **CI/CD**: automated checking and delivery of changes.
Checks can catch some mistakes before they reach visitors, but cannot verify
your business claims or replace your review of the page.

### Why preview on my computer? Why not publish every change immediately?

A local preview lets you experiment without changing the public website or
setting up hosting accounts first. Its address is only for the computer
running it; sending that address to someone else does not share your preview.

After you approve publication, the assistant pushes the approved changes
directly to your site's `main` branch, the publishing version of the project.
There is no required pull-request review process. This keeps the owner workflow
simple, but means unfinished changes must stay local when automatic deployment
is enabled. Liking a design is not the same as asking to make it public.

### Why do I need an API token? Is it my password?

An API token gives software permission to do a specific job. Here it lets
GitHub's automation publish to your Cloudflare account without asking you to
sign in during every update.

Create a token scoped to the intended account and put it directly into
**GitHub Actions secrets**, following the [publishing guide](DEPLOY.md).
It is sensitive: never paste it into the assistant conversation, website
files, or project notes. You remain in control of sign-in and token entry.
An expired token can be replaced; an exposed token must be revoked.

### Do I need to buy a domain? Does hosting include business email?

No domain purchase is needed to start. Cloudflare supplies a public
`workers.dev` address. A custom domain gives you a branded address and normally
has a registration and renewal cost.

The domain is the address; hosting serves the website; **DNS** connects names
to services. Business email is a separate service, not something this starter
creates. Existing email may rely on the domain's DNS records, so your assistant
must preserve those records when helping connect a website.

## The tools behind the website

### Why a static website? Does “static” mean it cannot change?

Static means the pages are prepared as files before visitors request them.
The host does not need to query a database or run application code to assemble
each page. That reduces infrastructure and maintenance for a service website.

You can still change the content and design, then publish a new version.
Links, responsive layouts, and expandable answers work without a custom
backend. Live account data, form processing, and similar features need a
separate service or additional implementation.

### Why Astro?

[Astro](https://astro.build/) is a website framework suited to content-focused
pages. We use it to turn reusable page sections and business content into
static HTML.

It lets us avoid sending a large application runtime to the visitor's browser.
The default starter needs no client-side application JavaScript for its
navigation and expandable FAQs. Astro can support more interactive features
later, but we do not add them without a reason.

### Why TypeScript? Do I have to learn or install it?

TypeScript helps the assistant and contributors catch some programming mistakes
before publication, such as passing the wrong kind of value to a component.
It helps maintain the code as the website changes.

You do not need to learn it or install it separately: the project installs its
own version. TypeScript does not itself make the website faster, verify business
facts, or guarantee that code is correct.

### Why Tailwind and shared components?

Tailwind provides styling utilities, while shared components supply consistent
building blocks such as buttons and section headings. The starter keeps theme
colors in one place so a palette change does not require finding every button
individually.

For you, the benefit is consistency and easier revisions. You describe the
look you want; the assistant works with the styling tools. You do not need to
memorize class names.

### Why reuse AstroWind rather than start with a blank page?

This starter adapts a small set of AstroWind's layout and UI building blocks.
Reusing them provides a coherent foundation without including an entire demo
site and features you may not need.

The source, retained license, and intentional changes are documented in
[architecture and upstream provenance](UPSTREAM.md). Your website can still
be customized; the scaffold is not a fixed catalog of designs.

### Why install Node.js and npm? Why use specific versions?

Node.js runs the development tools on your computer. npm installs the website's
dependencies, the libraries those tools use. The project standardizes on
Node 24 and records dependency versions in a lockfile so your computer and
the publishing system use the same dependency set.

Your assistant uses `npm ci` to install that recorded set instead of choosing
new versions each time. Dependencies still need deliberate updates over time.

**Your computer does not need to stay on after publication.** Cloudflare
serves the finished files; Node is a building tool here, not a server you must
leave running for customers.

### Why local Claude Code instead of just browser chat?

An assistant with web-reading tools can read the public instructions without
Git or a clone. Browser chat can help plan the website and explain setup.
But a link alone does not let it edit files or run a preview on your computer.

The documented path uses local Claude Code for that work, with your permission.
Your assistant guides the setup and carries the business context into the
project. Other capable coding assistants may use the instructions too, but
their file, terminal, browser, and account capabilities must be checked rather
than assumed.

## Speed, search, and accessibility

### What makes this approach fast?

The foundation reduces work for both the host and the visitor's browser:
prebuilt pages, little browser-side code, system fonts instead of an external
font download, and delivery through Cloudflare's network.

Those are useful starting conditions, not a guaranteed speed score. Large
photos, embedded videos, third-party widgets, and tracking scripts can make
a site slower. Your assistant should prepare appropriately sized assets and
check the actual pages after changes.

### Is the website ready for search engines?

The starter provides readable HTML, page titles and descriptions, canonical
URLs when configured, and controls for search-engine indexing. Drafts request
that search engines do not index them; publication removes that draft setting.
A noindex instruction is not password protection or a privacy boundary.

This is a technical foundation, not a complete SEO campaign or a promise of
rankings. Clear, relevant content, useful pages, local business information,
and the site's reputation still matter. Adding structured data or other SEO
features is separate work, not something to assume is already included.

### Why check phones, keyboard navigation, and readability?

Visitors use different screen sizes, input methods, and assistive technology.
Readable text, visible focus, sensible headings, and usable links help more
people reach your services and contact information.

The starter includes accessibility-oriented building blocks and browser checks.
Those do not certify every customized site as accessible. The assistant should
inspect the actual phone and desktop layouts and interactions; you should
review the content and whether the main action is clear.

## Bookings, enquiries, and ongoing care

### Can I use Cal.com or Calendly instead of building booking functionality?

**Yes.** Use a hosted booking page from [Cal.com](https://cal.com/) or
[Calendly](https://calendly.com/), or another booking service you already use.
Give your assistant the public HTTPS booking link, and it can make your
website's booking button open that page.

You configure appointment types, availability, time zone, and calendar access
with the booking provider. The website does not need to implement scheduling,
store appointments, or receive your calendar credentials. You do not need to
self-host Cal.com to use its hosted booking service.

Check the provider's current pricing, privacy terms, and required features.
Before publishing, test that the link opens the right booking page and that
your booking setup behaves as intended.

### Why use a booking link rather than embed the calendar on my website?

A normal link is the simplest starting point. It does not load the booking
provider's widget or scripts into your website, and the provider handles the
booking experience after the visitor follows the link.

An embedded calendar can be added if you want it, but it needs a separate
review of loading speed, phone layout, accessibility, and privacy implications.
An embed is optional, not required to accept bookings.

### Why start with email, phone, or a booking link instead of a contact form?

These options use contact channels you already control. An email link opens
the visitor's email app; a phone link can open their dialer; a booking link
opens the provider's page.

A form needs somewhere to securely receive, validate, and deliver submissions,
plus spam handling and decisions about personal data. A form that only looks
finished can silently lose enquiries. If you need one, approve a submission
service and have it implemented and tested before publication.

### Why no database, CMS, or analytics by default?

A simple service site does not need a database or content management system
(CMS) just to display its pages. You can ask your assistant to update the
source files instead. Avoiding unused services means fewer accounts, costs,
permissions, and things to maintain.

Analytics can help answer real business questions, but also introduces
measurement and privacy decisions. None is added by default. If you need
frequent editing by a team, stored customer data, or visitor measurement,
discuss that requirement rather than adding infrastructure speculatively.

### How does the assistant remember my business next time?

Your site's [saved project context](PROJECT.md) records confirmed business
facts, design choices, the current stage, and the next action. A new session
reads it instead of relying only on a previous conversation.

Keep useful, non-secret context there, not customer records, passwords, or
tokens. Return to your own website folder, not a fresh copy of the starter.

### What happens if an update goes wrong?

Git history lets the assistant inspect changes and prepare a new commit that
reverses an unwanted one. You review the restored local preview and approve
publishing it through the same workflow.

Changing a local file does not change the live site. Likewise, marking a
local copy as a draft does not take an existing public site offline. If your
goal is to remove a live site, say so explicitly; that needs a separate,
approved hosting action. See [updates and recovery](MAINTENANCE.md).

### Is the website maintenance-free?

No. A static site avoids many server and database maintenance tasks, but you
still need to keep business information current, retain account access,
renew any domain, and replace expiring deployment tokens.

Dependencies should be updated deliberately and tested. Contact and booking
links should be checked when their destinations change. Keep ownership and
billing under your control; the assistant can guide the work, but should not
make purchases or publish changes without your approval.
