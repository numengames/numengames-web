// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: AGPL-3.0-only
//
// check-contrast — verifies WCAG 2.1 AA contrast over the colour tokens.
//
// WHY IT EXISTS. The header of src/styles/tokens.css claimed "AA contrast
// already verified" and nobody had measured it. Measured, three pairs in
// use failed — including the colour of the contact form's error message:
// the least legible text on the site was the one a visitor sees when a
// query fails to send. An accessibility claim with no automatic check
// drifts again on the next palette change.
//
// It reads the values from tokens.css itself — not from a copy — so that
// changing a colour without updating the test is impossible.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const tokensPath = join(here, "..", "src", "styles", "tokens.css");

/** Relative luminance, WCAG 2.1 §dfn-relative-luminance. */
export function relativeLuminance(hex) {
	const h = hex.replace("#", "");
	const channels = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
	const [r, g, b] = channels.map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
	return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Contrast ratio, WCAG 2.1 §dfn-contrast-ratio. */
export function contrastRatio(a, b) {
	const la = relativeLuminance(a);
	const lb = relativeLuminance(b);
	return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

/** Extracts `--name: #rrggbb;` declarations from tokens.css. */
export function readTokens(css = readFileSync(tokensPath, "utf8")) {
	const tokens = {};
	for (const match of css.matchAll(/--([a-z0-9-]+):\s*(#[0-9a-fA-F]{6})\s*;/g)) {
		tokens[match[1]] = match[2].toLowerCase();
	}
	return tokens;
}

// Text/surface pairs that actually occur on the site. Each names where it
// is used: when a pair stops being used, remove it here; when a new one
// appears, add it. Not an exhaustive matrix — the inventory of what a
// visitor can actually see.
export const PAIRS = [
	// Dark theme (default).
	["color-marfil", "color-carbon", "body text on the background"],
	["color-marfil", "color-carbon-raised", "body text on a raised section"],
	["color-marfil", "color-carbon-elevated", "body text on a card"],
	["color-marfil-velada", "color-carbon", "secondary text on the background"],
	["color-marfil-velada", "color-carbon-raised", "secondary text on a raised section"],
	["color-marfil-velada", "color-carbon-elevated", "secondary text on a card"],
	["color-ceniza", "color-carbon", "muted text on the background (footer, notes)"],
	["color-ceniza", "color-carbon-raised", "muted text on a raised section"],
	["color-ceniza", "color-carbon-elevated", "muted text on a card"],
	["color-turquesa-texto-oscuro", "color-carbon", "links on the background"],
	["color-turquesa-texto-oscuro", "color-carbon-raised", "links on a raised section"],
	["color-dorado", "color-carbon", "accent on the background"],
	["color-alerta", "color-carbon", "form error on the background"],
	["color-alerta", "color-carbon-raised", "form error on a raised section"],
	["color-alerta", "color-carbon-elevated", "form error on a card"],
	// Light theme.
	["color-carbon", "color-marfil", "body text, light theme"],
	["color-dorado-texto-claro", "color-marfil", "accent, light theme"],
	["color-turquesa-texto-claro", "color-marfil", "links, light theme"],
	["color-alerta-claro", "color-marfil", "form error, light theme"],
];

export const AA_NORMAL_TEXT = 4.5;

export function checkAll(tokens = readTokens()) {
	return PAIRS.map(([fgName, bgName, usage]) => {
		const fg = tokens[fgName];
		const bg = tokens[bgName];
		if (!fg || !bg) {
			return { fgName, bgName, usage, error: `token not found: ${!fg ? fgName : bgName}` };
		}
		const ratio = contrastRatio(fg, bg);
		return { fgName, bgName, usage, fg, bg, ratio, passes: ratio >= AA_NORMAL_TEXT };
	});
}

// Runnable directly: `node scripts/check-contrast.mjs`
if (process.argv[1] === fileURLToPath(import.meta.url)) {
	const results = checkAll();
	let failed = 0;
	for (const r of results) {
		if (r.error) {
			console.error(`ERROR  ${r.error}`);
			failed++;
			continue;
		}
		const mark = r.passes ? "OK   " : "FAIL ";
		console.log(`${mark}  ${r.ratio.toFixed(2).padStart(5)}:1  ${r.fgName} on ${r.bgName}  — ${r.usage}`);
		if (!r.passes) failed++;
	}
	console.log(failed === 0 ? `\n${results.length} pairs, all meet AA (>= ${AA_NORMAL_TEXT}:1).` : `\n${failed} of ${results.length} pairs do NOT meet AA.`);
	process.exit(failed === 0 ? 0 : 1);
}
