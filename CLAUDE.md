# CLAUDE.md — numengames-web

This repository serves **numen.games**, the company site. The rules, the
vocabulary and the decisions of Numen Games live in one place,
`numengames/numinia-nwos` (numinia.org): read its `AGENTS.md` first,
transition regime included. This file only says what is specific here.

## What this is

Astro (static) + Tailwind, pnpm via corepack, Node pinned in `.nvmrc`.
Locale-prefixed routes under `src/pages/[locale]/`: home, `numen` (who we
are), `experiencias`, `como-trabajamos`, `contacto`, `legal/[doc]`,
`updates`, `telemetry`; `version.json` for the build line. Copy lives in
`src/content/dictionary.ts` (Spanish is the reference language, English
mirrors it). `worker/index.js` is the Cloudflare Worker in front of the
assets: www → apex, `/` → locale, legacy 301s.

- **Legal texts** (`src/content/legal/`): verbatim copies of the masters
  in numinia-nwos `operations/`; a test pins id, version and a sha256 of
  the body — refresh by re-copying, never by editing here.
- **Contact** is a `mailto:` with the fields pre-written. No form service,
  no build secrets: `tests/contacto-fields.test.ts` refuses an
  `access_key`, an external form API or an `import.meta.env.PUBLIC_*` read.
  Keep it that way.
- **Footer** (`src/components/site/SiteFooter.astro`): the house shape
  shared by the four Numen sites; data in `src/content/house-links.ts`,
  `social-links.ts`, `updates.ts`.

## Commands

```bash
corepack enable && corepack pnpm install --frozen-lockfile
pnpm dev
pnpm exec astro check && pnpm test && pnpm build   # what CI runs, job named `build`
npx wrangler dev --local                           # the site through the Worker
```

## Gates that bite

- `scripts/check-version-bump.mjs`: any change under `src/**` needs a new
  entry in `src/content/updates.ts` and a raised version.
- The CI job is literally named `build`; the ruleset requires that name.
  Renaming it leaves the required check pending forever.
- Tests go in `tests/`, never under `src/pages/` (Astro would publish a
  `.test.ts` there as a route).
- Do not remove Tailwind: it generates the `.grid` and `.hidden` classes
  the live code depends on.
- Form field keys are ASCII; visible labels stay translated.

## Deploy

Cloudflare Workers Builds on push to `main`; the build command lives in
`wrangler.jsonc` (`build.command` = `pnpm build`), the panel field stays
empty. `WORKERS_CI_COMMIT_SHA` is injected there and absent in CI (the
footer prints `dev`, correct). Verify a publication with
`numen.games/version.json` against the `main` SHA.
