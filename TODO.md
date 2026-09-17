# TODO — numengames-web

`TRC-005` of `STD-015`: the roadmap is a file in the repository, in plain
text (`STD-006`), not a card in a tool that needs an account to read.

Ordered by what blocks value reaching a visitor.

## Blocked on the Oracle — nothing ships until these exist

- [x] **Deploy path.** Resolved 2026-09-16: no Actions secrets. Workers
      Builds is connected to the repo and publishes on push to `main`;
      `deploy.yml` retired. (Web3Forms retired the same day.)
- [ ] **Licence ruling** (`AUT-006`). `LICENSE` says GPL-3.0, `package.json`
      declares nothing, files declare `AGPL-3.0-only`, and `LIC-002` of
      `STD-010` prescribes AGPL for a deployable app. Three sources, three
      answers. `REUSE.toml` declares what the standard prescribes; the root
      `LICENSE` still contradicts it.
- [ ] **Ruleset: require status checks** with
      `strict_required_status_checks_policy` (`ARC-002`). Today nothing stops
      a branch behind `main` from merging, and nothing requires CI to be
      green.
- [ ] **Repository topics** (`TRC-001`): About is missing topics.

## Security debt

- [ ] 15 Dependabot alerts on `main` unreviewed — 1 critical, 9 high,
      5 moderate (`SEC-003`).
- [ ] 3 Dependabot pull requests waiting for approval: #7 astro, #8 vitest,
      #9 sharp.
- [ ] Confirm secret scanning and push protection are enabled (`SEC-002`);
      the API returns null for both without admin rights.
- [ ] Migrate the deploy to OIDC instead of a long-lived Cloudflare token
      (`SEC-005`). The token is the pragmatic first step, not the target.

## Engineering debt

- [ ] **Tailwind is load-bearing by accident.** It looks unused but generates
      the `.grid` and `.hidden` classes the live code depends on. Removing it
      would break production layout and no test would catch it. Replace those
      two classes with own CSS, then remove the dependency.
- [ ] **No visual regression test.** Nothing in CI would have caught the
      placeholder sections that shipped internal notes to visitors, or an
      image that fails to load. A screenshot diff on the six live routes
      would.
- [ ] **`favicon.png` is 364 KB** for a favicon.
- [ ] **`opengraph.jpg` contradicts the positioning**: metaverse aesthetic,
      illegible wordmark. It is what every shared link shows.
- [ ] No `lint` step (`DEV-002`): `dev`, `build`, `test`, `lint` should mean
      the same in every repository. There is no linter configured here.
- [ ] Rollback is undocumented and unrehearsed (`SRE-001`).
- [ ] No runbook (`SRE-004`).

## Open pull requests to resolve

- [ ] #6 `feat: implement i18n and theming system` — `DIRTY`, irreconcilable
      after the legacy cleanup. Recommend closing.
- [ ] #4 `Feat/v2 numengames` — same situation.

## Content decisions pending

- [ ] **Team section.** Six profiles exist (`src/content/team/` at
      `ecb60a9~1`, avatars live on `statics.numinia.xyz`) and five people are
      already published on the live site. Publishing names and photographs
      needs explicit confirmation of roles and permissions.
- [ ] **The collectible.** The legacy portfolio advertises a "collectible and
      commemorative POAP" per experience. It is a real, differentiating
      deliverable that the new brief does not mention. Decide whether it
      appears under its technical name, in plain language, or not at all.
- [ ] Confirm the Arcasiles relationship can be stated publicly, and that the
      Nerdearla image is ours to publish under CC0 (`LIC-001`).
