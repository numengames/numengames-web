# TODO

The roadmap is a file in the repository (PM-05). Everything here is observed
debt, not work in progress: each item says what it is and what would close it.

## Oracle-gated — do not start autonomously

- [ ] **Canon C-005 licensing.** The repo ships a GPL-3.0 `LICENSE` with no
      `REUSE.toml`, no `LICENSES/`, no SPDX headers, and no `TRADEMARKS.md`.
      C-005 would put a deployable app that decides on `AGPL-3.0-only`.
      Changing a licence is irreversible (engineering-standards §7.3) and needs
      the Oracle. **Closes when:** the Oracle signs the regime and REUSE lint
      runs green in CI (ARC-03).
- [ ] **Contribution regime.** Once the licence question is settled, decide DCO
      vs CLA (C-005: DCO for MIT-only, CLA where AGPL ships) and add the gate.
- [ ] **Repository "About" (PM-01).** The homepage field still points at
      `numengames.com`; the site is `numen.games`. Description and ≥3 topics
      need review. **Closes when:** the API presence check covers it.
- [ ] **Branch protection on `main` (ARC-02, DEV-07).** Required PR, required
      status checks (`pipeline`, `presence`), no force push, verified commits
      (SEC-12). Org-level settings: 2FA (SEC-01), base permission read
      (SEC-11), secret scanning + push protection (SEC-02).
- [ ] **Social preview image (OSS-05).**

## Type debt — the ratchet holds it at 31

`pnpm type-check` fails if the count moves in either direction without
updating the baseline in `scripts/type-check.mjs`.

- [ ] **27 of them are one bug.** Pages pass `class="…"` to Svelte components
      (`Container.svelte` and friends) that only read `className`, so those
      classes are **silently dropped** — the layout you see is the layout
      without them. Two honest exits: apply the prop (and review every affected
      page visually) or delete the dead attributes. Both are product decisions.
      **Closes when:** one of the two is chosen and the baseline drops.
- [ ] The remaining errors are prop typings in `.astro` components reported by
      `pnpm type-check:report`.

## Design system

- [ ] **Legacy token names.** `primary.coralRed`, `primary.panther`,
      `basics.white`… now hold canonical §19.3 values, but the names still
      describe the old palette. Rename to the canonical names
      (`ambar`, `nocturno.base`, `arena`) across ~200 call sites.
- [ ] **Icons (§7).** `public/icons` is a mixed set; the system asks for
      Phosphor with a declared 26-icon subset and weights by size. Audit which
      local SVGs are Phosphor already and replace the rest.
- [ ] **Glow inflation (§6).** Several components still carry wide `shadow-[…]`
      halos. The system allows one halo — the legendary amber
      `0 0 12px rgba(239,165,23,.25)` — and asks for flat elevated surfaces.
- [ ] **Motion audit (§10.1).** The animation catalogue is closed; the repo has
      custom keyframes (`portalEntrance`, `carousel`, `flowCarousel`) that
      predate it. Decide keep/retire per piece.
- [ ] **Third-party CSS.** The cookie banner is themed through its own
      variables, so the vendor bundle still ships its default palette. Harmless
      but it means "zero non-canonical hexes" is true of our source, not of the
      built vendor chunk.

## Engineering

- [ ] **Health check (SRE-02) and runbook (SRE-04).** The Worker has neither.
- [ ] **Rollback rehearsal (SRE-01).** Documented, and tested at least once.
- [ ] **ADRs (ARC-05).** `docs/decisions/` does not exist yet.
- [ ] **Shared base config (ARC-08).** `tsconfig`/`eslint`/`prettier` are
      copies; they should be imported from one package across repos.
- [ ] **Pre-commit hooks (DEV-04).** husky + lint-staged, under 5s.
- [ ] **Conventional commits enforced (ARC-06).** commitlint in CI and a
      release workflow that generates `CHANGELOG.md`.
- [ ] **`prettier-plugin-astro` cannot parse the layouts.** `src/layouts/*.astro`
      are in `.prettierignore` because the plugin chokes on the partytown
      `define:vars` block. Revisit on the next plugin release.
