# numengames-web

**[numen.games](https://numen.games)** — the company site of Numen Games S.L.:
who we are, the experiences we build, how we work, contact. It also hosts
the published legal texts the other Numen sites link to.

The rules of the house, its vocabulary and its decisions live in
[`numengames/numinia-archive`](https://github.com/numengames/numinia-archive)
(numinia.org). This repository holds code only.

## Run

```bash
corepack enable && corepack pnpm install --frozen-lockfile
pnpm dev                 # http://localhost:4321 — Astro alone, no Worker
pnpm exec astro check && pnpm test && pnpm build     # what CI runs
npx wrangler dev --local # after a build: the site as production serves it
```

Node version is pinned in `.nvmrc`. Architecture, gates and deploy are in
[`CLAUDE.md`](CLAUDE.md).

## Licences

`AGPL-3.0-only` for the code, `CC0-1.0` for public assets, `CC-BY-4.0`
for documentation, declared per path in [`REUSE.toml`](REUSE.toml). The
legal texts under `src/content/legal/` are reserved.

Version and what changed: [numen.games/updates](https://numen.games/es/updates/).
