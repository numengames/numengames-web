# Contributing

Thanks for wanting to improve numen.games. This document is the whole process — if something here does not work for you, that is a bug in this document, so tell us.

## Getting to a green build

Requires Node ≥ 22 and pnpm (the repo pins its version in `package.json`).

```bash
git clone https://github.com/numengames/numengames-web.git
cd numengames-web
pnpm install
pnpm test          # unit tests
pnpm dev           # http://localhost:4321
```

Before you push, run what CI runs:

```bash
pnpm type-check && pnpm lint && pnpm test && pnpm build
```

## The rules that will fail your PR

- **CI is the authority** (`type-check → lint → test → build`). A red pipeline is not merged, ever.
- **Conventional commits.** `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`, `ci:`. If your change touches a practice from the engineering standards, name its ID: `ci: pin third-party actions by SHA (SEC-07)`.
- **The design system is not optional.** Colour, type, spacing, motion and copy follow the Numen Games Design System v5.1.0 — see `CLAUDE.md` and `docs/design-system-fragment.md`. Never introduce a hex that is not in the canonical token set; use the Tailwind tokens.
- **No secrets.** Not in code, not in tests, not in a commit you plan to amend later. Push protection is on.
- **No `console.*` in shipped code** (SRE-03) — lint enforces it.
- **Comments in English, explaining _why_.** TSDoc on exported public APIs.
- **Small PRs.** What, why, how to verify. One concern per pull request.

## Licensing of contributions

This repository is GPL-3.0. By contributing you agree your contribution is licensed under the same terms. Sign your commits off with `git commit -s` (DCO).

If you are adding a dependency, resolve its licence from the registry **before** adding it — never from memory. Forbidden outright: BUSL, SSPL, Elastic, Commons Clause, CC-NC, CC-ND, proprietary.

## Review

At least one approving review is required before `main` (DEV-07). Reviews look at correctness, then at whether the change makes the repository better than it found it.

## Reporting problems

- Bugs and requests: the issue templates in `.github/ISSUE_TEMPLATE`.
- Security: **do not open an issue** — see `SECURITY.md`.
