// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: AGPL-3.0-only
//
// numen.games wears the Numen design system as numinia.org draws it
// (the Oracle, 2026-09-29: numinia.org leads; STD-023, BLU-009 §7 and §12).
// These checks read the source, so a drift fails before it is built.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const walk = (dir: string): string[] =>
	readdirSync(dir).flatMap((name) => {
		const path = join(dir, name);
		return statSync(path).isDirectory() ? walk(path) : [path];
	});

const styled = walk("src").filter((f) => /\.(astro|css)$/.test(f));
const read = (f: string) => readFileSync(f, "utf8");
const header = read("src/components/site/SiteHeader.astro");
const tokens = read("src/styles/tokens.css");

// STD-023 §2: the palette, night and day, plus the action fills of BLU-009 §7.
const PALETTE = new Set(
	[
		"#14110f", "#1e1a17", "#292420", "#241f1b", "#3a332d",
		"#f9ebdc", "#c4b5a6", "#8a7d72",
		"#fdf6ee", "#e2d3c2", "#4a423b", "#6e6259",
		"#a6dad5", "#018ea1", "#016e7d", "#017c8d", "#015866",
		"#efa517", "#7a5100", "#f35059", "#d33440", "#b02330", "#ffffff",
	],
);

describe("the bar, as numinia.org draws it", () => {
	it("opens with the Numen Games wordmark, inline and named", () => {
		expect(header).toContain("Numen_Games_Horizontal_Word.svg?raw");
		expect(header).toMatch(/aria-label="Numen Games"/);
		expect(header).not.toContain("Letras_Numen_Games_blanco.png");
	});

	it("gives every entry a Phosphor icon", () => {
		for (const icon of ["house", "confetti", "clipboard-text", "users", "list", "x"]) {
			expect(header).toContain(`@assets/icons/${icon}.svg?raw`);
		}
	});

	it("is 56 px high behind a 24 px blur", () => {
		expect(header).toMatch(/height:\s*56px/);
		expect(header).toMatch(/blur\(24px\)/);
	});
});

describe("type", () => {
	it("self-hosts Geist and Geist Mono", () => {
		const layout = read("src/layouts/SiteLayout.astro");
		expect(layout).toContain("@fontsource-variable/geist");
		expect(layout).toContain("@fontsource-variable/geist-mono");
		expect(tokens).toMatch(/--font-titular:\s*"Geist Variable"/);
		expect(tokens).toMatch(/--font-cuerpo:\s*"Geist Variable"/);
		expect(tokens).toMatch(/--font-mono:\s*"Geist Mono Variable"/);
	});

	it.each(styled)("%s names no Georgia and no system stack as primary", (f) => {
		const text = read(f);
		expect(text).not.toMatch(/Georgia/);
		expect(text).not.toMatch(/-apple-system/);
	});
});

describe("palette", () => {
	it("tokens.css holds only colours of the house palette", () => {
		const hexes = [...tokens.matchAll(/#[0-9a-fA-F]{6}\b/g)].map((m) => m[0].toLowerCase());
		expect(hexes.length).toBeGreaterThan(10);
		expect(hexes.filter((h) => !PALETTE.has(h))).toEqual([]);
	});

	it.each(styled.filter((f) => !f.endsWith("tokens.css")))("%s writes no colour outside the tokens", (f) => {
		const hexes = [...read(f).matchAll(/#[0-9a-fA-F]{6}\b/g)].map((m) => m[0].toLowerCase());
		expect(hexes.filter((h) => !PALETTE.has(h))).toEqual([]);
	});

	it("the primary button is the action fill with white text, never Ámbar", () => {
		const site = read("src/styles/site.css");
		expect(tokens).toMatch(/--action:\s*#017c8d/i);
		expect(site).toMatch(/\.btn--accent\s*\{[^}]*background:\s*var\(--action\)/);
		expect(site).not.toMatch(/\.btn--accent\s*\{[^}]*var\(--accent\)/);
	});
});

describe("radii: 6 px controls, 8 px frames", () => {
	it("tokens.css declares the two radii and no 4 px", () => {
		expect(tokens).toMatch(/--radius-control:\s*6px/);
		expect(tokens).toMatch(/--radius-frame:\s*8px/);
		expect(tokens).not.toMatch(/4px/);
	});

	it.each(styled)("%s uses only the two radii (or a circle)", (f) => {
		const values = [...read(f).matchAll(/(?:border-radius|-radius):\s*([^;]+);/g)].map((m) => m[1].trim());
		const allowed = /^(var\(--radius-(control|frame)\)|6px|8px|50%|0)$/;
		expect(values.filter((v) => !allowed.test(v))).toEqual([]);
	});
});

describe("motion: only the catalogue", () => {
	it("the hero opens with the entrance (600 ms, 24 px, 100 ms stagger)", () => {
		const site = read("src/styles/site.css");
		expect(site).toMatch(/@keyframes entrada/);
		expect(site).toMatch(/translateY\(24px\)/);
		expect(site).toMatch(/600ms/);
		expect(read("src/pages/[locale]/index.astro")).toMatch(/class="[^"]*entrada/);
	});

	it.each(styled)("%s defines no keyframes but the entrance, and no sky", (f) => {
		const text = read(f);
		const frames = [...text.matchAll(/@keyframes\s+([\w-]+)/g)].map((m) => m[1]);
		expect(frames.filter((n) => n !== "entrada")).toEqual([]);
		// numen.games carries no star sky (the Oracle, 2026-09-29).
		expect(text).not.toMatch(/<canvas|velo\.cielo|twinkle/);
	});
});
