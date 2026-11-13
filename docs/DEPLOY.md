# Publish the approved website

Default path: **GitHub Actions → Cloudflare Workers static assets**. This is not
Cloudflare Pages Git integration, Workers Builds, or a server-rendered Worker.
Do not enable a second automatic deployment system.

Preview stays local. GitHub Actions runs on direct pushes to `main`; deployment
stays off until the repository variable `DEPLOY_ENABLED` is exactly `true`.
No pull requests are required.

Claude must explain and verify one step at a time. Dashboard labels can change:
use the official links below when the displayed interface differs. Do not
invent a button or ask the owner to expose a token in a screenshot.

## 1. Confirm publication approval

Review the real content, contact link, rights to assets, mobile/desktop preview,
and open questions with the owner. Ask explicitly to publish this version.
Keep `publishReady` false until approval; do not treat a stored boolean as
permission for later publishing pushes.

## 2. Create the owner's GitHub repository

1. Open [github.com](https://github.com), create an account if needed, verify the
   email, and sign in. The owner keeps control of the account.
2. In GitHub email settings, explain the option to keep their personal email
   private and use GitHub's provided no-reply address for future Git commits.
3. Choose **New repository**, give it a site-specific name, and choose visibility.
   Private is a reasonable default; explain that the deployed website is public
   even if its source repository is private.
4. Create an **empty** repository: do not initialize a README, license, or gitignore
   because the local starter already supplies them.
5. Record its URL in `PROJECT.md`. This must be the owner's website repository,
   **not this product's starter repository**.

For the guided terminal push path, install [GitHub CLI](https://cli.github.com)
using the official instructions for the owner's OS. On Windows its supported
WinGet route is `winget install --id GitHub.cli`; on macOS use the official
release installer if Homebrew is not already installed; on Linux follow the
documented distribution-specific package instructions. Do not install a package
manager merely to avoid explaining another supported installation option.

Verify `gh --version`, then:

```sh
gh auth login --hostname github.com --git-protocol https --web
gh auth setup-git
gh auth status
```

Let the owner approve the browser login and Git authentication. Do not use
`--show-token`, print stored credentials, or ask for a personal access token in chat.
If the account/organization blocks workflow pushes, inspect the actual permission
error and follow GitHub's authorization guidance; never request unrestricted
credentials as a workaround.

Inspect `git remote -v`. For a new ZIP-based repository with no remotes, add
`origin` using the actual owner repository URL. If a remote exists, show its
destination and get approval before changing it. Confirm the current branch is
`main` and the worktree contains only intended files.

After local checks and an inspected commit, push with `git push -u origin main`.
This first push can safely happen with deployment disabled.
If rejected because the remote has other commits, stop and inspect; never force-push.

## 3. Check GitHub Actions is enabled

1. Open the owner's repository → **Settings → Actions → General**.
2. Confirm Actions is allowed. If an organization controls this setting, the
   owner may need its administrator. This workflow uses `actions/checkout` and
   `actions/setup-node`; permit those rather than broadly weakening restrictions.
3. Open the **Actions** tab. If GitHub asks to enable workflows (for example in a
   fork), review and enable them.
4. Find **Check and publish website** for the pushed commit. Confirm install,
   checks, and build pass. With no deploy switch, it should report deployment off.
5. If Actions was disabled during the push, select **Run workflow** on `main`
   after enabling it.

Default `GITHUB_TOKEN` permissions are read-only; deployment uses the separate
Cloudflare token. Do not enable GitHub write permissions unnecessarily.

GitHub Actions has plan-dependent limits, particularly for private repositories.
Review usage before enabling paid overages. Free hosting does not imply unlimited CI.

## 4. Prepare Cloudflare and choose the website address

1. Open [dash.cloudflare.com](https://dash.cloudflare.com), create/sign into the
   owner's account, and select the intended account.
2. Open **Workers & Pages** and complete the free Workers onboarding if needed.
   Establish the account's `workers.dev` subdomain. Use
   [workers.dev documentation](https://developers.cloudflare.com/workers/configuration/routing/workers-dev/)
   if the account has not registered one. Do not enable a paid Workers plan for
   this static starter.
3. Locate and copy the **Account ID**; it is not a zone ID. See
   [find account IDs](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/).
4. Choose an unused Worker name, such as `riverside-garden-care`. Check the existing
   Workers list so you do not overwrite a different site.
5. Change `name` in `wrangler.json` to that exact name. The first successful
   deployment creates the Worker; do not create a competing Git-connected build.
6. Set `url` in `src/data/site.json` to
   `https://WORKER-NAME.ACCOUNT-SUBDOMAIN.workers.dev`, substituting the confirmed
   values. Use the site origin only, without a page path.

Keep `workers_dev: true`. The configured Worker has only static assets; no
database, server code, or Cloudflare adapter is required.

## 5. Create the Cloudflare API token

Follow Cloudflare's [GitHub Actions authentication guide](https://developers.cloudflare.com/workers/ci-cd/external-cicd/github-actions/).

1. In the selected account's API tokens area, choose **Create Token**.
2. Choose the **Edit Cloudflare Workers** permission template and give it a clear
   name, such as “Website GitHub deployment.”
3. Scope it to **only the account that owns this site**. This path deploys to
   `workers.dev`, not zone routes: do not add access to unrelated zones or DNS.
   Review the template's current permissions against Cloudflare's guide; do not
   substitute a Global API Key.
4. Review and create the token. If an expiry is selected, record only the expiry
   date and a renewal reminder, never the token value.
5. Copy the token directly into GitHub in the next step. Do not send it to Claude,
   put it in `PROJECT.md`, or write it into source files.

If a token is exposed, revoke it in Cloudflare and create a replacement. Removing
it from the current file is not sufficient if it entered Git history.

## 6. Add GitHub secrets and variables

In the **owner's repository**, open **Settings → Secrets and variables → Actions**:

| Tab                                 | Name                    | Value                                    |
| ----------------------------------- | ----------------------- | ---------------------------------------- |
| Secrets → New repository secret     | `CLOUDFLARE_API_TOKEN`  | Token copied directly from Cloudflare    |
| Variables → New repository variable | `CLOUDFLARE_ACCOUNT_ID` | The selected account's ID                |
| Variables → New repository variable | `DEPLOY_ENABLED`        | `false` until ready; then exactly `true` |

These names and locations must match `.github/workflows/site.yml`. An Account ID
is an identifier, not a password. The workflow intentionally reads it as a variable.
The API token is a secret and is only passed to the deployment step.

## 7. Publish through the configured workflow

1. Confirm all placeholders have been replaced, the contact destination works,
   and the owner approves the current version.
2. Set `publishReady: true` in `src/data/site.json`. This removes the draft banner
   and allows indexing. It does not deploy anything by itself.
3. Run:

   ```sh
   npm run check
   npm run build
   npm run check:publish
   npm run deploy:dry-run
   ```

4. Preview the production build locally with `npm run preview`.
5. Review the exact diff and destination. Set `DEPLOY_ENABLED` to `true` in GitHub.
   Changing a variable does not itself start a workflow.
6. Commit only the approved changes and push directly to `main`.
7. Open Actions and inspect the run for **that commit**. A green check-only run
   with publishing off is not a deployment. Confirm the publish step succeeded
   and record the URL it reports.
8. Visit the reported URL. Verify the actual copy, layout, contact action, favicon,
   and a nonexistent path (which should show the custom 404). Check HTTPS.
9. Confirm `site.url` matches the actual public origin; correct any mismatch with
   another approved push before calling the setup complete.

The workflow rejects attempts to publish an older run after `main` has moved.
If configuration was fixed without a new commit, use **Run workflow** on the
latest `main`, not a historical run.

If checks fail, the existing public site is unchanged. Fix locally; do not bypass
checks or switch to an unreviewed manual deployment.

## 8. Optional custom domain

Get explicit permission before domain purchases, nameserver changes, or DNS edits.
The `workers.dev` address is usable without buying a domain.

For this path, the domain must be an active zone in the owner's Cloudflare account.
If it is not, follow Cloudflare's zone onboarding. Before changing nameservers,
inventory existing DNS and confirm all needed records are preserved—especially
email MX, SPF, DKIM, and DMARC records. Do not delete existing records to “start fresh.”
Explain that nameserver changes can affect other services and may take time.

Then follow [Workers Custom Domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/):

1. Open the deployed Worker → **Settings → Domains & Routes → Add → Custom Domain**.
2. Enter the chosen hostname. Inspect conflicts with any existing website record
   and obtain approval before replacing it.
3. Let Cloudflare create/manage the needed DNS record and certificate. Do not
   invent a CNAME target, change mail records, or add DNS permissions to the CI
   token just for this dashboard-managed operation.
4. Wait for DNS and certificate activation, then verify the hostname over HTTPS.
5. Change `site.url` to the confirmed preferred origin and publish that approved
   metadata change through the normal workflow.
6. Verify the custom hostname again after the push. Test apex and `www` separately;
   do not promise both work or redirect unless configured and verified.

Keep dashboard-managed domains out of the initial Wrangler routes configuration;
if moving domain management into code later, treat that as a separate reviewed
change with its own permissions. Record the chosen hostname and management method
in `PROJECT.md`.

## Completion

Record the source repository, Worker name, public URL, verified commit, and any
owner-reported checks in `PROJECT.md`. Never record secrets. Show the owner the
return-and-update and recovery instructions in `MAINTENANCE.md`.
