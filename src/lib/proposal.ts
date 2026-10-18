// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: AGPL-3.0-only
//
// STD-040: a proposal is one record kept in the Summa (numengames/numinia-archive,
// `opportunities/PRP-YYYY-NNN.md`); numen.games only renders it, never a local
// copy. We read it through its opportunity record (`OPP-YYYY-NNN.md`) because
// PRP-009 keeps the proposal beside its opportunity and the opportunity's
// `proposal:` field always names the CURRENT file — a revision replaces the
// file and the pointer, never the id in our URL.
//
// First story only: read + parse. No PDF, no translation (next stories).

const ARCHIVE_OPPORTUNITIES_BASE = "https://raw.githubusercontent.com/numengames/numinia-archive/main/opportunities";

export interface ProposalHeader {
	readonly id: string;
	readonly title: string;
	readonly opportunity: string;
	readonly status: string;
	readonly validUntil: string;
	readonly price: number;
	readonly taxRate: number;
	readonly currency: string;
}

export interface Proposal {
	readonly header: ProposalHeader;
	/** Markdown, front matter already stripped. */
	readonly body: string;
}

/** Splits a `---\n...\n---\n` YAML front matter block from its markdown body. */
export function splitFrontMatter(raw: string): { header: Record<string, string>; body: string } {
	const match = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/.exec(raw.trim() + "\n");
	if (!match) throw new Error("Archive file has no front matter");
	const [, yaml, body] = match;
	const header: Record<string, string> = {};
	for (const line of yaml.split("\n")) {
		const m = /^([A-Za-z_]+):\s*(.*)$/.exec(line);
		if (!m) continue;
		const [, key, rawValue] = m;
		header[key] = rawValue.trim().replace(/^"(.*)"$/, "$1");
	}
	return { header, body: body.trim() };
}

export function parseProposalHeader(header: Record<string, string>): ProposalHeader {
	for (const required of ["id", "title", "opportunity", "valid_until", "price", "tax_rate", "currency"]) {
		if (!header[required]) throw new Error(`Proposal front matter is missing "${required}"`);
	}
	return {
		id: header.id,
		title: header.title,
		opportunity: header.opportunity,
		status: header.status ?? "draft",
		validUntil: header.valid_until,
		price: Number(header.price),
		taxRate: Number(header.tax_rate),
		currency: header.currency,
	};
}

async function fetchArchiveFile(filename: string, fetchImpl: typeof fetch = fetch): Promise<string> {
	const res = await fetchImpl(`${ARCHIVE_OPPORTUNITIES_BASE}/${filename}`);
	if (!res.ok) throw new Error(`Archive file not found: opportunities/${filename} (HTTP ${res.status})`);
	return res.text();
}

/**
 * Reads an opportunity record (e.g. "OPP-2026-001") and follows its
 * `proposal:` field to the proposal file it currently points at.
 */
export async function readProposal(opportunityId: string, fetchImpl: typeof fetch = fetch): Promise<Proposal> {
	const opportunityRaw = await fetchArchiveFile(`${opportunityId}.md`, fetchImpl);
	const { header: opportunityHeader } = splitFrontMatter(opportunityRaw);
	const proposalFile = opportunityHeader.proposal;
	if (!proposalFile) throw new Error(`Opportunity ${opportunityId} has no proposal yet`);

	const proposalRaw = await fetchArchiveFile(proposalFile, fetchImpl);
	const { header, body } = splitFrontMatter(proposalRaw);
	return { header: parseProposalHeader(header), body };
}
