// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: AGPL-3.0-only
import { describe, expect, it } from "vitest";
import { renderMarkdown } from "../src/lib/markdown";

describe("renderMarkdown", () => {
	it("renders headings, paragraphs, bold and links", () => {
		const html = renderMarkdown("## Title\n\nA **bold** word and a [link](https://example.com).");
		expect(html).toContain("<h2>Title</h2>");
		expect(html).toContain("<strong>bold</strong>");
		expect(html).toContain('<a href="https://example.com">link</a>');
	});

	it("renders a blockquote", () => {
		const html = renderMarkdown("> a quoted line");
		expect(html).toContain("<blockquote>");
		expect(html).toContain("<p>a quoted line</p>");
	});

	it("renders an unordered list", () => {
		const html = renderMarkdown("- one\n- two\n");
		expect(html).toContain("<ul>");
		expect(html).toContain("<li>one</li>");
		expect(html).toContain("<li>two</li>");
	});

	it("renders a markdown table", () => {
		const html = renderMarkdown("| A | B |\n|---|---|\n| 1 | 2 |\n");
		expect(html).toContain("<table>");
		expect(html).toContain("<th>A</th>");
		expect(html).toContain("<td>1</td>");
	});

	it("escapes raw HTML in the source text", () => {
		const html = renderMarkdown("<script>alert(1)</script>");
		expect(html).not.toContain("<script>alert(1)</script>");
		expect(html).toContain("&lt;script&gt;");
	});
});
