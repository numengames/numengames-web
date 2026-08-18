# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**First instruction (AGT-01): audit the current branch state before assuming anything.** Never trust that the repo matches this file, the README, or a mission brief — read what is actually there first.

## Standards adopted by reference

| Document                           | Canonical location                                                             | What it governs here                                 |
| ---------------------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------- |
| **Engineering Standards**          | `numengames/numinia-nwos` → `standards/engineering-standards.md`               | CI, repo hygiene, security practices, agent protocol |
| **Sistema de Diseño v5.0.0**       | `numengames/numinia-nwos` → `standards/2026_08_18-Sistema_de_Diseno-v5.0.0.md` | Every visible pixel of numen.games                   |
| **Analogous Terminology (Numina)** | same folder                                                                    | Naming of world concepts in copy                     |

This repo is **downstream**: it executes those documents, it does not edit them. A change to a standard goes upstream via ADR + PR (engineering-standards §7.1).

Agents MUST follow the §7 application protocol: classify every task as **cosmetic** or **irreversible**; when in doubt it is irreversible and needs Oracle sign-off. Reference practice IDs in commits that touch them (e.g. `fix: pin actions by SHA (SEC-07)`).

**AI stance (AGT-06).** Autonomous: content and copy edits, styling within the design tokens, tests, docs, dependency patch bumps, mechanical fixes to `[AUTO]` practices. **Never without Oracle sign-off:** changing `LICENSE` / SPDX headers / REUSE structure (Canon C-005 territory), repo visibility, secrets or Cloudflare credentials, DNS or custom domains, weakening any CI check, force-pushing or rewriting history on `main`.

**Scorecard checks in scope:** all except those requiring org-level settings (2FA, base permissions), tracked upstream in MIS-070.

## Commands

- `pnpm dev` — dev server at http://localhost:4321
- `pnpm build` — static build to `dist/`
- `pnpm test` — vitest (unit tests for the worker and i18n helpers)
- `pnpm lint` — prettier check + eslint (`no-console` is an error: SRE-03)
- `pnpm type-check` — `astro check` (zero errors; it is a blocking gate)
- `pnpm cf:preview` — build + `wrangler dev` (Workers runtime)
- `pnpm cf:deploy` — build + `wrangler deploy` (**production**; Oracle-gated)

CI runs `type-check → lint → test → build` on every push and PR (ARC-01). A rule that does not fail the build is prose.

## Stack & architecture

Astro 7, static output, deployed to **Cloudflare Workers** (`wrangler.jsonc`, worker `numengames-web`, custom domains `numen.games` + `www.numen.games`). `worker/index.js` runs first on every request: it 301s `www` → apex and otherwise serves `dist/` through the `ASSETS` binding.

- **Islands:** Svelte 5 (`@astrojs/svelte`); a few React/`.tsx` and `.jsx` files remain from the template.
- **Routing:** `src/pages/[locale]/…` with `locale` ∈ `en | es` (`src/i18n/index.ts` is the single source for locale helpers and `getStaticPaths`). Long-form page copy lives in `src/pages/content/**.md`.
- **Styling:** Tailwind 3 (`tailwind.config.cjs`) whose palette **is** the canonical token layer of §19.3 — see below. Global CSS and `@font-face` in `src/styles/global.css`.
- **Icons:** `astro-icon` reading local SVGs from `public/icons`.
- **Path aliases:** `@components`, `@layouts`, `@utils`, `@types`, … declared in `astro.config.mjs`.

## Design system — the short version

Full contract in the master document §19; the reusable instruction fragment is reproduced verbatim in `docs/design-system-fragment.md`. The rules that break this site if ignored:

- **Register: Umbral** (§2.8). This is a corporate web surface — not the Velo, not píxel, not low-poly.
- **Colour only from §19.3.** Never invent a hex. In practice: use the Tailwind tokens (`bg-fondo`, `text-texto-2`, `border-linea`, `bg-interactivo`, …), never a raw hex.
- Max 3 colours per composition; **Coral and Grana never coexist**; text-on-light uses the dedicated variants.
- **Typography: only Geist and Geist Mono, self-hosted.** No Inter, no IBM Plex, no CDN fonts.
- Spacing on the 4 scale; two radii (`control` 6px, `marco` 8px); easing `ciclo`.
- Motion only from the §10.1 catalogue; no parallax, no glitch, no ambient loops; `prefers-reduced-motion` collapses everything to instant.
- One primary button per view; labels are verbs; no all-caps labels.
- WCAG 2.2 AA is the floor. Nothing communicated by colour alone.

## Environment variables

Public build-time keys only, all listed in `.env.example` (DEV-01): Web3Forms key, GA id, AI assistant endpoint and id. **No secrets in this repo.** Production values live in the Cloudflare environment, never in git.

## Licensing — status

`LICENSE` is GPL-3.0. Canon C-005 has not been applied to this repo yet (no `REUSE.toml`, no `LICENSES/`, no SPDX headers). That work is **Oracle-gated** and tracked in `TODO.md`; do not start it autonomously.
