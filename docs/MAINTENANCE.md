# Return, update, and recover

## Make a later change

The owner can say:

> Open my website project, read its saved context, and help me change my services.
> Show me a local preview. Don't publish until I approve.

Claude should:

1. Open the same local folder and read `CLAUDE.md` and `PROJECT.md`.
2. Inspect `git status`, the current branch, and `git remote -v`. Confirm it is the
   owner's site, not the starter or another business project.
3. If the worktree is clean, fetch and check for remote changes. Use
   `git pull --ff-only origin main` only on the intended local `main`.
   If there are local edits or histories have diverged, stop and reconcile with
   the owner. Do not overwrite local work or force-push.
4. Use `npm ci` if dependencies changed or this is a new local copy; run
   `npm run dev` and open the printed local address.
5. Make the requested changes, run `npm run check` and `npm run build`, and inspect
   the preview at phone and desktop sizes.
6. Ask the owner to approve **publishing this change**, not just the wording.
7. Run `npm run check:publish`, review the exact diff, commit the intended files,
   and push directly to `main`. Remember: when enabled, a push publishes.
8. Verify the workflow for that commit and the actual public site.
9. Update `PROJECT.md` without adding secrets.

Keep `publishReady` true for an already published site unless intentionally taking
it back to draft status. Local editing itself does not publish anything. Do not
push unfinished changes to the publishing branch as a backup.

If the computer was replaced, clone the owner's repository, follow `SETUP.md`
for the required tools, run `npm ci`, and resume from `PROJECT.md`. Do not start
again from the product's untouched starter.

## Recover an unwanted published change

Default recovery is a **new commit that reverts the bad change**, followed by the
same checked deployment. This keeps source history and the public site aligned.
No history rewrite or PR is needed.

1. Identify the unwanted commit and the last version the owner liked using
   `git log --oneline` and the GitHub Actions history.
2. Inspect the commit's diff. Confirm that reverting it will not remove later
   work that should stay. Begin with a clean worktree; preserve uncommitted work
   before proceeding.
3. Get the owner's permission to prepare the reversal. For a single ordinary
   commit, run `git revert --no-commit ACTUAL_COMMIT_SHA`, substituting the
   inspected SHA. Do not give the owner a placeholder to run.
4. If there are conflicts, stop and resolve them deliberately; do not guess or
   select “ours/theirs” globally. `git revert --abort` can abandon a conflicted
   revert, but inspect and preserve any other work before undoing anything.
5. Run checks, build, and preview the restored version locally.
6. Get publication approval, create the revert commit, push normally to `main`,
   and verify the new Actions run and public content.

Do not use `git reset --hard`, force-push, or rerun an old deployment as the normal
recovery method. The workflow intentionally rejects stale commits.
For several intertwined changes, prepare a reviewed corrective change rather
than blindly reverting a range.

If deployment infrastructure itself is broken and an emergency provider-side
rollback is necessary, get explicit approval, verify the provider's current
rollback behavior, and reconcile source afterward. Do not claim a dashboard
rollback guarantees the next Git push will preserve it.

## Troubleshooting checkpoints

| Symptom                                              | First useful action                                                                                                                           |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `node`/`npm` not found                               | Reopen terminal, verify installation/PATH and Node 24; don't reinstall everything                                                             |
| PowerShell blocks `npm.ps1`                          | Use `npm.cmd` or Git Bash; don't weaken system execution policy                                                                               |
| `npm ci` says lockfile is out of sync                | Inspect dependency changes; maintainer regenerates the lockfile with `npm install`, then tests with `npm ci`                                  |
| Dependency install reports blocked lifecycle scripts | Inspect the named packages and current npm guidance; approve only required, reviewed packages rather than enabling arbitrary scripts globally |
| Local URL doesn't open                               | Confirm server still runs and read the exact URL/port; localhost on another device is not this computer                                       |
| Port already in use                                  | Use the newly printed port or select another port; don't terminate unknown processes                                                          |
| Wrong version of the site                            | Confirm project folder, URL, dev-server process, and the commit being previewed                                                               |
| Git rejects the push                                 | Inspect remote history and authentication; never force-push to “fix” it                                                                       |
| Workflow absent                                      | Verify the workflow file is on `main`, Actions is enabled, and organization policy permits it                                                 |
| Checks green but site unchanged                      | Check `DEPLOY_ENABLED` is exactly `true`, the run's branch/commit, and whether the publish step actually ran                                  |
| Publication check fails                              | Replace remaining placeholders and configure a real URL/contact/Worker name; don't bypass it                                                  |
| Missing Cloudflare credentials                       | Verify the secret/variable names and locations in `DEPLOY.md`; do not print their values                                                      |
| Cloudflare authentication/permission error           | Check account ID, token account scope, expiry, and documented permissions; don't substitute a Global API Key                                  |
| Cloudflare deployment error                          | Read the specific Wrangler error, preserve the existing site, and correct only the diagnosed configuration                                    |
| Domain not working                                   | Check zone activation, exact hostname attachment, DNS, and certificate status separately                                                      |
| Secret accidentally shared                           | Revoke/rotate immediately; coordinate any history cleanup rather than assuming deleting a file fixes it                                       |

After each correction, rerun the failed checkpoint and verify the result. Record
undocumented rescues so the instructions can be improved.

## Routine maintenance

- Keep account access and domain renewal details under the owner's control.
- Check expiring CI tokens and free-tier/CI usage limits.
- Treat dependency upgrades as deliberate maintenance: update, inspect the
  lockfile and advisories, test locally, then seek approval before publishing.
- Do not run `npm audit fix --force` as an automatic remedy; it may change the
  stack or introduce incompatible dependencies.
- Keep the Node major in `.nvmrc`, `package.json`, and the setup instructions aligned.
- Back up source with normal approved Git pushes. Do not treat Git as a secret vault.
