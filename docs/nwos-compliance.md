---
id: "NWOS-COMPLIANCE"
title: "STD-015 compliance for numengames-web"
type: documentation
status: active
version: "1.0.0"
created: "2026-09-11T00:00:00Z"
updated: "2026-09-11T00:00:00Z"
author: "ursa"
owner: "oracle"
tags: [compliance, std-015, nwos, admin]
license: "CC-BY-4.0"
registration: exempt
registration_reason: "singular document, not a numbered series"
---

# STD-015 compliance — what is done, and what needs admin rights

`STD-015` lives in `numinia-nwos` and is the source of truth. This file
records where this repository stands against it, measured — not asserted — by
`scripts/audit-nwos.mjs`.

Run it yourself:

```bash
node scripts/audit-nwos.mjs
```

## What the agent could not do

The `ursa-numinia` account has `push` and `maintain` on this repository, and
**not** `admin`. Measured:

```
admin=false  push=true  maintain=true
```

Consequences, precisely:

| Action | Why it is blocked |
| --- | --- |
| Create Actions secrets | `gh secret list` → HTTP 403 |
| Edit the `proteger-main` ruleset | ruleset writes need admin |
| Enable `require_code_owner_review` | same |
| Read Dependabot alerts | `dependabot/alerts` → HTTP 403 |
| Set repository topics | needs admin |

Everything in this table is an Oracle act. The rest was done in the pull
request that introduced this file.

## The six items needing admin

### 1. Deploy path — RESOLVED 2026-09-16, no secrets needed

Publication is Cloudflare Workers Builds, connected to this repository
(Worker `numengames-web` → Settings → Builds → `numengames/numengames-web`,
branch `main`). Every push runs the build and `wrangler deploy` inside
Cloudflare; GitHub holds no Cloudflare token. `deploy.yml` — which needed
`CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` that never existed here,
and failed on every merge since `59c8087` — is retired. Same model as
numinia.org.

Known failure mode (seen on numinia.org 2026-08-25 and here 2026-09-16):
the Git connection drops silently and the Builds page reads "disconnected
from your Git account". Production then serves a stale build and nothing
warns. `curl -s https://numen.games/version.json` against `main` is the
check.

### 2. Ruleset: require status checks (`ARC-002`) — DONE, verify the name

Added on 2026-09-11 at 16:59. `strict_required_status_checks_policy` is
`true`, and it works: pull request #7 moved to `BEHIND` on its own. The rule
you asked for — a branch must be up to date with `main` — is now enforced by
GitHub rather than by anyone remembering it.

One correction was needed. The ruleset requires a check named **`build`**,
which is the right name — it is the same value in `numinia-nwos` and
`numinia-web`, so the rule is literally identical across the three
repositories. But this repository's CI job was called `test-and-build`, so
the required check never arrived.

A required check that no workflow produces stays `pending` forever and blocks
every merge, even with everything else green. Measured with a probe pull
request: branch up to date with `main`, five checks passing,
`mergeable_state: blocked`.

Fixed by renaming the job to `build` in `ci.yml`. Nothing to do in the
ruleset.

**If you ever rename that job again, change the ruleset in the same move.**

### 3. Ruleset: require code owner review (`SEC-010`)

`Settings → Rules → proteger-main → Require review from Code Owners`

`.github/CODEOWNERS` now exists and lists Pablo, María and Christian on `*`,
with the Oracle alone on licensing, CI and published copy. GitHub will
**request** their review on every pull request as soon as the file is on
`main`. It will not **require** it until this box is ticked.

Note what the standard actually says: `DEV-007` requires *at least one*
approval, and the ruleset is set to 1. Requiring three reviewers is a
practice, not a written rule — see the note at the end.

### 4. Licence ruling (`AUT-006`, `LIC-002`)

Three sources disagree:

| Source | Says |
| --- | --- |
| `LICENSE` at the root | GPL-3.0 |
| `package.json` | no `license` field at all |
| Source files with SPDX | `AGPL-3.0-only` |
| `LIC-002` of `STD-010` | deployable app → `AGPL-3.0-only` |

`REUSE.toml` now declares what `LIC-002` prescribes. The root `LICENSE` file
still contradicts it, and replacing a licence is an Oracle act — an agent
does not decide the legal regime of a published work.

### 5. Dependabot (`SEC-003`)

15 alerts on `main`: 1 critical, 9 high, 5 moderate. Three pull requests
(#7 astro, #8 vitest, #9 sharp) waiting for approval.

### 6. Repository topics (`TRC-001`)

About has a description and a website, and zero topics.

## Also worth noting

`homepage` in About points to `numengames.com`. The site this repository
deploys is **`numen.games`**. One of the two is wrong.

## On requiring three reviewers

The instruction to put Pablo, María and Christian on every review is recorded
in `CODEOWNERS` and honoured. It is **not** currently a rule of the standard:

- the ruleset requires `required_approving_review_count: 1`
- `required_reviewers` is empty
- no document in `numinia-nwos` names a second or third reviewer
- history: #12–#15 were approved by María alone, #16 and #17 by Pablo alone

By `AUT-063` of `STD-017` — *a rule written in a decision, a mission or a
commit message is not a rule yet; the sentence goes into the document a
reader looks in* — making this binding across the organisation means writing
it into `STD-015`, in `numinia-nwos`, by pull request.
