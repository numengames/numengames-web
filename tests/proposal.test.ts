// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: AGPL-3.0-only
//
// STD-040: the proposal reader. No network in this test — the front
// matter/body split and the opportunity→proposal lookup are exercised
// against fixture text, the way the Archive's own files are shaped.
import { describe, expect, it, vi } from "vitest";
import { splitFrontMatter, parseProposalHeader, readProposal } from "../src/lib/proposal";

const OPPORTUNITY_FIXTURE = `---
id: "OPP-2026-001"
kind: "sale"
title: "A national police force's training academy"
status: active
proposal: "PRP-2026-001.md"
---

# OPP-2026-001
Body text.
`;

const PROPOSAL_FIXTURE = `---
id: "PRP-2026-001"
title: "The scene before the scene"
type: proposal
status: draft
opportunity: "OPP-2026-001"
valid_until: "2026-10-28T23:59:00+01:00"
price: 14500
tax_rate: 21
currency: "EUR"
---

# The scene before the scene

> **Summary:** a rehearsal.

## 1. Objectives

A trainee learns the protocol.
`;

describe("splitFrontMatter", () => {
	it("separates the YAML header from the markdown body", () => {
		const { header, body } = splitFrontMatter(PROPOSAL_FIXTURE);
		expect(header.id).toBe("PRP-2026-001");
		expect(header.price).toBe("14500");
		expect(body).toContain("## 1. Objectives");
		expect(body).not.toContain("tax_rate");
	});

	it("throws on a file with no front matter", () => {
		expect(() => splitFrontMatter("# just a heading\n")).toThrow();
	});
});

describe("parseProposalHeader", () => {
	it("parses price and tax as numbers", () => {
		const { header } = splitFrontMatter(PROPOSAL_FIXTURE);
		const parsed = parseProposalHeader(header);
		expect(parsed.price).toBe(14500);
		expect(parsed.taxRate).toBe(21);
		expect(parsed.currency).toBe("EUR");
		expect(parsed.opportunity).toBe("OPP-2026-001");
	});

	it("rejects a header missing a required field", () => {
		expect(() => parseProposalHeader({ id: "PRP-2026-001" })).toThrow(/valid_until|title|price/);
	});
});

describe("readProposal", () => {
	it("reads the opportunity record and follows its proposal: field", async () => {
		const fetchMock = vi.fn(async (url: string | URL) => {
			const href = url.toString();
			if (href.endsWith("/OPP-2026-001.md")) return new Response(OPPORTUNITY_FIXTURE, { status: 200 });
			if (href.endsWith("/PRP-2026-001.md")) return new Response(PROPOSAL_FIXTURE, { status: 200 });
			return new Response("not found", { status: 404 });
		});

		const proposal = await readProposal("OPP-2026-001", fetchMock as unknown as typeof fetch);
		expect(proposal.header.id).toBe("PRP-2026-001");
		expect(proposal.header.price).toBe(14500);
		expect(proposal.body).toContain("Objectives");
		expect(fetchMock).toHaveBeenCalledTimes(2);
	});

	it("fails clearly when the opportunity has no proposal yet", async () => {
		const noProposal = OPPORTUNITY_FIXTURE.replace('proposal: "PRP-2026-001.md"\n', "");
		const fetchMock = vi.fn(async () => new Response(noProposal, { status: 200 }));
		await expect(readProposal("OPP-2026-001", fetchMock as unknown as typeof fetch)).rejects.toThrow(/no proposal/);
	});

	it("fails clearly when the archive file is missing", async () => {
		const fetchMock = vi.fn(async () => new Response("not found", { status: 404 }));
		await expect(readProposal("OPP-9999-999", fetchMock as unknown as typeof fetch)).rejects.toThrow(/not found/);
	});
});
