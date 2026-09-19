# Contributing

The rules live in [`numengames/numinia-archive`](https://github.com/numengames/numinia-archive)
(`AGENTS.md`, transition regime included). Here, only what is specific to
this code:

1. Branch from an up-to-date `main` (linear history is enforced); one
   pull request per cut. No force pushes, no self-merge.
2. Every change under `src/**` adds an entry to `src/content/updates.ts`
   and raises the version — CI refuses the merge otherwise.
3. Run what CI runs before pushing:
   `pnpm exec astro check && pnpm test && pnpm build`. To see the site as
   production serves it, build and then `npx wrangler dev --local`.
4. Conventional commits (`feat:`, `fix:`, `chore:`, `docs:`); the message
   says *why*.
5. New files carry an `SPDX-License-Identifier`; the map is
   [`REUSE.toml`](REUSE.toml).
6. The contact form stays a `mailto:` with no external service and no
   build secret — a test enforces it.
