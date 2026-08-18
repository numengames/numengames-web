# TODO

The roadmap is a file in the repository (PM-05). Everything here is observed
debt, not work in progress: each item says what it is and what would close it.

## Oracle-gated — do not start autonomously

- [ ] **Canon C-005 licensing.** The repo ships a GPL-3.0 `LICENSE` with no
      `REUSE.toml`, no `LICENSES/`, no SPDX headers and no `TRADEMARKS.md`.
      C-005 would put a deployable app that decides on `AGPL-3.0-only`.
      Changing a licence is irreversible (engineering-standards §7.3).
      **Closes when:** the Oracle signs the regime and REUSE lint runs green
      in CI (ARC-03).
- [ ] **Contribution regime.** Once the licence is settled, decide DCO vs CLA
      and add the gate.
- [ ] **Repository "About" (PM-01).** The homepage field still points at
      `numengames.com`; the site is `numen.games`. Description and ≥3 topics
      need review.
- [ ] **Branch protection on `main` (ARC-02, DEV-07)** and the organization
      settings: 2FA (SEC-01), base permission read (SEC-11), secret scanning
      and push protection (SEC-02).
- [ ] **Social preview image (OSS-05).**

## Product decisions waiting on a person

- [ ] **The Spanish site is not translated below the fold.** Nine components
      receive `locale` and ignore it — their copy is hardcoded English, so
      `/es/` renders English strings for the work process, the testimonials,
      the team sections and the partner list. Each one now declares the prop
      with a `TODO(MIS-091)` comment where the gap lives. **Closes when:**
      their copy moves into `src/i18n/translations`.
- [ ] **Sixteen layout class strings were removed** from `<Container>` call
      sites (MIS-091). They had never applied — the component only read
      `className`, so Svelte dropped them — and turning them all on at once
      would have been a redesign, not a fix. Notably several passed
      `text-nocturno-base` on dark sections, which would have made the copy
      invisible, and `manifesto.astro` passed `md:px-80`. The component now
      accepts `class` properly, so re-applying any of them is a one-line
      change, section by section, with a visual review. The exact strings are
      in the MIS-091 execution log and in git history.

## Design system

- [ ] **Icon subset (§7.3).** The icons are genuine Phosphor (256 viewBox),
      but the site uses ~21 and eight of them are outside the declared
      26-icon subset: `target`, `puzzle-piece`, `castle-turret`, `strategy`,
      `hand-waving`, `plus`, `minus`, `x`. That is an extension to validate
      upstream, not a local decision. `arrow-down.svg` is the exception that
      is simply wrong: a 24×24 icon from another set — replace it with the
      Phosphor one.
- [ ] **Dead icon assets.** `public/icons` holds 60 files; 21 are referenced.
- [ ] **Icon weights (§7.1).** The system asks for `regular` by default,
      `fill` when active, `bold` under 16px and `light` at 48px or more. The
      local SVGs are a single weight.
- [ ] **The two marquees are a declared deviation.** §10.1 has no ambient
      loop, but the logo strip and the bracketed ticker are content, not
      decoration: they keep moving, and under `prefers-reduced-motion` they
      stop where they are with a scrollable viewport instead of snapping to
      their last frame. Revisit if the Oracle wants them retired outright.
- [ ] **`HeroAnimation`'s tunnel** is being read as the §10.1 signal sweep
      (8s, one per piece). Confirm that reading, or retire it.
- [ ] **Third-party CSS.** The cookie banner is themed through its own
      variables, so the vendor bundle still ships its default palette in the
      built CSS. Our source has zero non-canonical values; the vendor chunk
      does not.

## Engineering

- [ ] **Health check (SRE-02) and runbook (SRE-04).** The Worker has neither.
- [ ] **Rollback rehearsal (SRE-01).** Documented, and tested at least once.
- [ ] **ADRs (ARC-05).** `docs/decisions/` does not exist yet.
- [ ] **Shared base config (ARC-08).** `tsconfig`/`eslint`/`prettier` are
      copies; they should be imported from one package across repos.
- [ ] **Pre-commit hooks (DEV-04).** husky + lint-staged, under 5s.
- [ ] **Conventional commits enforced (ARC-06).** commitlint in CI and a
      release workflow that generates `CHANGELOG.md`.
- [ ] **Test coverage thresholds (§3.2).** Vitest runs, but no threshold is
      enforced as a failure, and the coverage is thin: the worker redirect and
      the i18n helpers.
- [ ] **`prettier-plugin-astro` cannot parse the layouts.** `src/layouts/*.astro`
      are in `.prettierignore` because the plugin chokes on the partytown
      `define:vars` block — reproduced on the files as they were before this
      work. Revisit on the next plugin release.
