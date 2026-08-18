## What

<!-- One or two sentences. What does this change do? -->

## Why

<!-- The reason, not the mechanism. Link the issue or mission (MIS-XXX) if there is one. -->

## How to verify

<!-- The steps a reviewer follows to see it working. Screenshots for visual changes. -->

## Definition of Done

- [ ] `pnpm type-check && pnpm lint && pnpm test && pnpm build` pass locally
- [ ] Conventional commit messages; practice IDs referenced where they apply (e.g. `SEC-07`)
- [ ] Visual changes follow the Design System v5.1.0: colours from the canonical tokens only, Geist/Geist Mono only, spacing on the 4 scale, motion from the §10.1 catalogue
- [ ] Accessibility checked: contrast AA, focus visible, nothing communicated by colour alone, `prefers-reduced-motion` respected
- [ ] Both locales (`en`, `es`) reviewed if copy or layout changed
- [ ] No secrets, no `console.*`, no new dependency with an unresolved licence
- [ ] Docs updated (`README.md`, `CLAUDE.md`, `.env.example`) if behaviour or setup changed
- [ ] Nothing irreversible (licence, visibility, credentials, DNS) without Oracle sign-off
