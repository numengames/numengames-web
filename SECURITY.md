# Security Policy

## Supported versions

This repository deploys a single production surface — https://numen.games — from the `main` branch. Only the currently deployed `main` is supported; there are no maintained release branches.

## Reporting a vulnerability

**Do not open a public issue for a security problem.**

- Preferred: [GitHub private vulnerability reporting](https://github.com/numengames/numengames-web/security/advisories/new).
- Alternative: email **hello@numen.games** with `SECURITY` in the subject.

Please include what you found, how to reproduce it, the impact you believe it has, and any suggested fix.

## What to expect

| Stage                                              | Target                            |
| -------------------------------------------------- | --------------------------------- |
| Acknowledgement of your report                     | 3 working days                    |
| First assessment (valid / not, severity)           | 10 working days                   |
| Fix or documented mitigation for a confirmed issue | 30 days, sooner for high severity |

We will keep you informed while we work, and we will credit you in the advisory unless you prefer otherwise.

## Scope

In scope: this repository's source, its build output, its Cloudflare Worker (`worker/`), and the site served at `numen.games` / `www.numen.games`.

Out of scope: findings that require a compromised end-user device, denial-of-service through volumetric traffic, missing hardening headers with no demonstrated impact, reports produced solely by an automated scanner without a working proof of concept, and third-party services we merely link to.

## Safe harbour

We will not pursue action against research conducted in good faith under this policy: no privacy violations, no data destruction, no service degradation, and no access beyond what is needed to demonstrate the issue. Give us reasonable time to fix before public disclosure.
