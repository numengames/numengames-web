---
id: "SECURITY"
title: "Security Policy"
type: documentation
status: active
version: "1.0.0"
created: "2026-09-11T00:00:00Z"
updated: "2026-09-11T00:00:00Z"
author: "ursa"
owner: "oracle"
tags: [security, disclosure, policy]
license: "CC-BY-4.0"
registration: exempt
registration_reason: "singular document, not a numbered series"
---

# Security Policy

Satisfies `SEC-009` of `STD-015`: a public repository declares how a
vulnerability is reported and what the reporter can expect.

## Reporting a vulnerability

Report privately. Do not open a public issue, and do not describe the problem
in a pull request.

- **Preferred:** [GitHub Private Vulnerability Reporting](https://github.com/numengames/numengames-web/security/advisories/new)
- **Email:** security@numen.games

Include what you can: affected URL or route, steps to reproduce, and the
impact you believe it has. A report that only says "there is an XSS" cannot be
triaged.

## What to expect

| Stage | Target |
| --- | --- |
| Acknowledgement of receipt | 3 working days |
| First assessment (severity, whether it is reproducible) | 10 working days |
| Fix or documented mitigation for a confirmed critical issue | 30 days |

These are targets, not guarantees. This is a small team; if a deadline slips
you will be told it slipped rather than left without an answer.

## Scope

In scope: the published site `numen.games` and the code in this repository —
the Astro site, the Cloudflare Worker in `worker/`, and the deployment
workflow.

Out of scope: third-party services the site merely uses (Cloudflare,
GitHub), findings that require physical access or a compromised
user device, and reports produced solely by an automated scanner with no
demonstrated impact.

## Safe harbour

Research conducted in good faith under this policy will not be met with legal
action. Do not access, alter, or exfiltrate data belonging to third parties;
do not degrade the service; do not run automated load or brute-force tests
against production.

## Credit

With your permission you will be credited in the release notes for the fix.
