---
id: "CONTRIBUTING"
title: "Contributing to numengames-web"
type: documentation
status: active
version: "1.0.0"
created: "2026-09-11T00:00:00Z"
updated: "2026-09-11T00:00:00Z"
author: "ursa"
owner: "oracle"
tags: [contributing, workflow, review]
license: "CC-BY-4.0"
registration: exempt
registration_reason: "singular document, not a numbered series"
---

# Contributing

This is the site published at **numen.games**. It is governed by the Numinia
engineering standard `STD-015`, which lives in the `numinia-nwos` repository
and is the source of truth. Where this file and `STD-015` disagree,
`STD-015` wins.

Satisfies `OSS-001`: a stranger can follow it.

## From a clean clone to green tests

```bash
pnpm install --frozen-lockfile
pnpm test          # unit tests
pnpm exec astro check   # types — CI runs this too
pnpm build         # 11 pages
```

Node version is pinned in `.nvmrc` (24). CI uses that same version: a green
run on a different one proves nothing.

To see the site exactly as production serves it — through the Cloudflare
Worker, with its redirects and 404 handling — build first, then:

```bash
npx wrangler dev --local
```

`pnpm dev` runs Astro alone and does **not** exercise the Worker.

## Branch, commit, pull request

1. **Branch from an up-to-date `main`.** The ruleset requires linear history,
   so a branch behind `main` cannot be merged without rebasing or merging
   first. Check before you open the pull request, not after.
2. **Conventional commits** (`ARC-006`): `feat:`, `fix:`, `chore:`, `ci:`,
   `docs:`. The commit message says *why*, not just what.
3. **Small pull requests** (`DEV-006`) stating what, why, and how to verify.
4. **One approval before `main`** (`DEV-007`). `CODEOWNERS` requests review
   from Pablo, María and Christian.

Force-pushing to `main` is blocked, as is deleting it.

## What CI checks

`ci.yml` runs type-check, tests and build on Node 24, in a job named
**`build`**.

That name is load-bearing. Branch protection requires a status check *by
name*, and `build` is the value used in `numinia-nwos`, `numinia-web` and
here — one value, so the rule is literally identical in all three rather than
three similar rules with different names.

**Renaming that job silently breaks the repository.** A required check that
no workflow produces stays `pending` forever and blocks every merge, even
with everything else green. If you rename it, change the ruleset in the same
move.

**Deploy is Cloudflare's, not ours.** Workers Builds is connected to this
repository (Worker `numengames-web` → Settings → Builds): every push to
`main` installs dependencies (Cloudflare detects `pnpm-lock.yaml`) and runs
`npx wrangler deploy`; wrangler builds first via the `build.command` in
`wrangler.jsonc` (`pnpm build`), so the panel's "Build command" field can
stay empty — the build lives in the repo, versioned, not in a panel. The
`deploy.yml` workflow that used to do this from Actions was retired on
2026-09-16: it needed Cloudflare secrets this repository never had, and
failed red on every merge for a week. Same model as numinia.org. If the
connection drops, the Builds page says "disconnected from your Git account"
and nothing warns — check it when a merge does not reach production.

A guard is verified by its step in the job, never by the run's colour
(`TRC-006`).

## Conventions that have bitten us

- **Tests go in `tests/`, never under `src/pages/`.** In Astro a `.test.ts`
  under `src/pages/` is published as a route.
- **Form field keys are ASCII.** They become the lines of the composed
  email today and JSON keys the day a backend exists; visible labels stay
  translated.
- **Do not remove Tailwind.** It looks unused, but it generates the `.grid`
  and `.hidden` classes the live code depends on.
- **Check the published site before deleting assets.** The legacy portfolio
  renders with JavaScript, so an import graph over `src/` does not see the
  images it uses.

## Licensing

Per `STD-010`: this is a deployable application, so the code is
`AGPL-3.0-only`. Public assets are `CC0-1.0` and documentation `CC-BY-4.0`.
Every file declares its licence with an `SPDX-License-Identifier`; the map
lives in `REUSE.toml`.

Ownership must be demonstrable before anything is published (`LIC-001`).
