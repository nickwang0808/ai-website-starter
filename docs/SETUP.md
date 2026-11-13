# Set up the computer and open the local preview

Claude should guide one step at a time. The commands below run **on the owner's
computer**, not in a cloud coding session. Do not silently install software or
modify machine-wide settings; explain the action and get agreement first.

## 1. Choose a place for the website

Ask which operating system the owner uses. Have them create a folder somewhere
they can find again, such as `Documents/Websites`. Avoid protected system folders.
Explain that the project is a folder of files, not a website account.

From the starter's GitHub page, choose **Code → Download ZIP** and extract it there.
Open the extracted folder containing `package.json`, not the ZIP itself or its
parent folder. This route needs no GitHub account for a public starter and does
not inherit a remote that could accidentally push to the starter repository.

During the private pilot, an authorized maintainer must provide access or an
authorized archive. Do not change repository visibility. Keep this starter
separate from any existing business/client repository.

## 2. Install Node.js 24 LTS

First check whether it is already installed. On Windows open **Terminal** or
**PowerShell** from Start; on macOS open **Terminal** from Applications → Utilities.
On Linux use the distribution's terminal app.

Run these commands separately:

```sh
node --version
npm --version
```

Expected: Node `v24.x.x` and npm `10` or later. This project standardizes on Node 24
rather than whichever major happens to be installed.

If missing or incompatible:

- **Windows/macOS:** visit [nodejs.org/download](https://nodejs.org/en/download),
  select **Node 24 LTS** and the installer for the computer, and follow the installer.
  Include npm and the normal PATH option. Do not choose extra native build tools
  unless a diagnosed dependency actually requires them.
- **Linux:** use the official download page's instructions for the actual
  distribution and Node 24. Do not assume the default distro package is recent
  enough, or install a second version manager over an existing one.

Close and reopen the terminal, then run the two checks again. Do not proceed
because an installer merely finished.

No separate TypeScript installation is needed.

## 3. Install Git

Run `git --version`. If it works, reuse it.

- **Windows:** use [Git for Windows](https://git-scm.com/downloads/win). Its Git Bash
  terminal is also useful for Claude Code. Keep normal installer defaults.
- **macOS:** running `git --version` may prompt for Apple's command line tools;
  explain and complete that prompt, or use the official Git installation guidance.
- **Linux:** use the distribution's Git package through its normal package manager.

Reopen the terminal if necessary and verify `git --version`.
Git saves versions locally; a GitHub account is not needed yet.

## 4. Set up local Claude Code

Use the [official Claude Code setup guide](https://code.claude.com/docs/en/setup)
and [terminal guide](https://code.claude.com/docs/en/terminal-guide). Explain that
Claude Code requires eligible paid access or API billing; the free chat plan is
not a promise of local coding access.

The native installer is the default path. Before asking the owner to run an
installer command, explain that it downloads and installs Anthropic's software,
check the current official command, and match the shell:

- **Windows PowerShell:** `irm https://claude.ai/install.ps1 | iex`
- **macOS/Linux shell:** `curl -fsSL https://claude.ai/install.sh | bash`

Do not paste a PowerShell command into Git Bash or vice versa. Do not ask for
administrator privileges as a generic fix. If remote-script execution is blocked
by an organization, follow the official alternative installation route instead
of weakening security policy.

After installation, reopen the terminal and run `claude --version`.
In the project folder, run `claude` and complete the provider's browser sign-in.
Never paste account credentials or API keys into the conversation. Review the
project trust prompt and grant access only to the intended folder.

If beginning in ordinary Claude chat, give the new local session the initial
request and a non-secret discovery summary. Ask it to read `CLAUDE.md`.

## 5. Install the website's locked dependencies

Open a terminal in the extracted folder. Claude should provide the exact command
using the owner's actual path, quoted if it contains spaces; do not hand them an
unexplained `<project-path>` placeholder.

Verify the folder contains `package.json` and `package-lock.json`, then run:

```sh
npm ci
```

This creates `node_modules` on the computer using the versions in the lockfile.
Do not upload or commit that folder. Installation can take a few minutes and
requires internet access.

If PowerShell blocks `npm.ps1`, use `npm.cmd ci` (and `npm.cmd` for later npm
commands), or Git Bash. Do not globally disable execution policy.

## 6. Open the local preview

```sh
npm run dev
```

Open the exact address printed in the terminal, usually
`http://127.0.0.1:4321`. The server binds only to the local computer.
It stays running while the owner reviews and Claude edits. This is not a public
URL and will not work on their phone just by sending them the link.

If the port is occupied, Astro may choose a different port: read the actual
output. Do not kill an unknown process. If needed, use `npm run dev -- --port 4322`.

Confirm that the owner sees the draft banner and scaffold. If they do not,
diagnose the URL/server before starting customization. Press `Ctrl+C` in the
server terminal to stop it.

For the production version, use:

```sh
npm run check
npm run build
npm run preview
```

Again, open the address printed by `preview`. This is still local.

## 7. Save a local starting point

If the ZIP has no Git history, initialize with `git init -b main`.
If history already exists, inspect it and `git remote -v` first; do not reinitialize
or overwrite a remote blindly.

Git needs an author name and email to make commits. Explain that these appear in
commit history, ask what identity the owner wants, and configure it **for this
repository**, not globally. A chosen non-personal development address can be
used until they set up GitHub's private commit email.

Inspect `git status` and the files to be committed. Exclude secrets and generated
files. Create a baseline commit, then save logical local checkpoints as you work.
No push or hosting setup is necessary for the first preview.

Record the local folder and completed setup steps in `PROJECT.md`.
