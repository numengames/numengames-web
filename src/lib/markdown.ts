// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: AGPL-3.0-only
//
// A small, dependency-free renderer for the subset of markdown the Summa's
// own documents use (headings, tables, blockquotes, lists, bold, links,
// paragraphs). Not a general markdown engine — it exists to show a proposal
// file as the page it is, not to typeset arbitrary prose.

function escapeHtml(text: string): string {
	return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function renderInline(text: string): string {
	let html = escapeHtml(text);
	html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
	html = html.replace(/`(.+?)`/g, "<code>$1</code>");
	html = html.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2">$1</a>');
	return html;
}

function renderTable(lines: string[]): string {
	const rows = lines.map((line) =>
		line
			.trim()
			.replace(/^\|/, "")
			.replace(/\|$/, "")
			.split("|")
			.map((cell) => cell.trim()),
	);
	const [header, , ...body] = rows; // row 1 = header, row 2 = --- separator
	const headCells = header.map((c) => `<th>${renderInline(c)}</th>`).join("");
	const bodyRows = body.map((cells) => `<tr>${cells.map((c) => `<td>${renderInline(c)}</td>`).join("")}</tr>`).join("\n");
	return `<table>\n<thead><tr>${headCells}</tr></thead>\n<tbody>\n${bodyRows}\n</tbody>\n</table>`;
}

/** Renders a markdown document (an STD-040 proposal's body) to HTML. */
export function renderMarkdown(markdown: string): string {
	const lines = markdown.split("\n");
	const out: string[] = [];
	let i = 0;
	let inList = false;
	let inQuote = false;

	const closeList = () => {
		if (inList) {
			out.push("</ul>");
			inList = false;
		}
	};
	const closeQuote = () => {
		if (inQuote) {
			out.push("</blockquote>");
			inQuote = false;
		}
	};

	while (i < lines.length) {
		const line = lines[i];

		if (/^\s*$/.test(line)) {
			closeList();
			closeQuote();
			i++;
			continue;
		}

		const heading = /^(#{1,4})\s+(.*)$/.exec(line);
		if (heading) {
			closeList();
			closeQuote();
			const level = heading[1].length;
			out.push(`<h${level}>${renderInline(heading[2])}</h${level}>`);
			i++;
			continue;
		}

		if (/^\|.*\|$/.test(line.trim())) {
			closeList();
			closeQuote();
			const tableLines: string[] = [];
			while (i < lines.length && /^\|.*\|$/.test(lines[i].trim())) {
				tableLines.push(lines[i]);
				i++;
			}
			out.push(renderTable(tableLines));
			continue;
		}

		if (/^>\s?/.test(line)) {
			if (!inQuote) {
				out.push("<blockquote>");
				inQuote = true;
			}
			out.push(`<p>${renderInline(line.replace(/^>\s?/, ""))}</p>`);
			i++;
			continue;
		}
		closeQuote();

		const listItem = /^[-*]\s+(.*)$/.exec(line);
		if (listItem) {
			if (!inList) {
				out.push("<ul>");
				inList = true;
			}
			out.push(`<li>${renderInline(listItem[1])}</li>`);
			i++;
			continue;
		}
		closeList();

		if (/^-{3,}$/.test(line.trim())) {
			out.push("<hr />");
			i++;
			continue;
		}

		out.push(`<p>${renderInline(line)}</p>`);
		i++;
	}
	closeList();
	closeQuote();
	return out.join("\n");
}
