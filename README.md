# numen.games

[![CI](https://github.com/numengames/numengames-web/actions/workflows/ci.yml/badge.svg)](https://github.com/numengames/numengames-web/actions/workflows/ci.yml)
[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/numengames/numengames-web/badge)](https://scorecard.dev/viewer/?uri=github.com/numengames/numengames-web)

The website of **Numen Games** — <https://numen.games>. Astro, static, served from Cloudflare Workers. English and Spanish.

_Build games to make work better._

## Clone to green tests

Node ≥ 22 and [pnpm](https://pnpm.io). Nothing else — no secrets are needed to build or test.

```bash
git clone https://github.com/numengames/numengames-web.git
cd numengames-web
pnpm install
pnpm test          # unit tests
pnpm dev           # http://localhost:4321
```

## Commands

| Command           | What it does                                                 |
| ----------------- | ------------------------------------------------------------ |
| `pnpm dev`        | Dev server at http://localhost:4321                          |
| `pnpm build`      | Static build into `dist/`                                    |
| `pnpm test`       | Unit tests (vitest)                                          |
| `pnpm lint`       | Prettier check + ESLint                                      |
| `pnpm type-check` | `astro check` — zero errors, and it is a blocking gate       |
| `pnpm format`     | Rewrite files with Prettier                                  |
| `pnpm cf:preview` | Build and serve through the Workers runtime (`wrangler dev`) |
| `pnpm cf:deploy`  | Build and deploy to production                               |

CI runs `type-check → lint → test → build` on every push and pull request.

## How it is put together

- **Astro 7**, `output: static`. Islands are **Svelte 5**.
- **Cloudflare Workers**: `wrangler.jsonc` binds the built `dist/` as assets and runs `worker/index.js` first — it 301s `www.numen.games` to the apex and serves everything else from the asset binding. Custom domains: `numen.games`, `www.numen.games`.
- **Routing**: `src/pages/[locale]/…` with `locale ∈ en | es`. `src/i18n/index.ts` owns the locale helpers and `getStaticPaths`. Long-form copy lives as markdown in `src/pages/content/**`.
- **Styling**: Tailwind 3. The palette in `tailwind.config.cjs` _is_ the canonical token set of the Numen Games Design System v5.1.0 — see below.
- **Icons**: `astro-icon`, reading SVGs from `public/icons`.

## Standards

This repository executes three documents that live in [`numengames/numinia-nwos`](https://github.com/numengames/numinia-nwos/tree/main/standards):

- **Engineering Standards** — CI, repo hygiene, security practices, the agent protocol.
- **Sistema de Diseño v5.1.0** — every visible pixel. The reusable instruction fragment is kept verbatim in [`docs/design-system-fragment.md`](docs/design-system-fragment.md).
- **Analogous Terminology (Numina)** — how the world's concepts are named in copy.

In short, for anyone touching the design: colours come only from the canonical tokens (never a raw hex), the only typefaces are **Geist** and **Geist Mono** — self-hosted —, spacing is on the 4 scale, there are two radii, motion comes from a closed catalogue and collapses to instant under `prefers-reduced-motion`, and WCAG 2.2 AA is the floor.

`CLAUDE.md` is the entry point for coding agents and states what may be done autonomously and what needs sign-off.

## Environment

Only public, build-time values, all listed in `.env.example`: the Web3Forms key, the Google Analytics id, and the AI assistant endpoint and id. Production values live in the Cloudflare environment. **No secrets in this repository.**

## Contributing

Read [`CONTRIBUTING.md`](CONTRIBUTING.md). Security issues never go in a public issue — see [`SECURITY.md`](SECURITY.md).

## Licence

GPL-3.0 — see [`LICENSE`](LICENSE). The Numen Games name, logos and brand assets are not covered by it.
