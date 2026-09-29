// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: AGPL-3.0-only
import { describe, expect, it } from "vitest";
import { AA_NORMAL_TEXT, checkAll, contrastRatio, readTokens } from "./check-contrast.mjs";

describe("contrast of the colour tokens", () => {
	// Reference values from the specification itself: if these drift, the
	// arithmetic is wrong, not the palette.
	it("reproduces the WCAG 2.1 reference ratios", () => {
		expect(contrastRatio("#ffffff", "#000000")).toBeCloseTo(21, 5);
		expect(contrastRatio("#ffffff", "#ffffff")).toBeCloseTo(1, 5);
		// Symmetric: the order of the arguments must not matter.
		expect(contrastRatio("#767676", "#ffffff")).toBeCloseTo(contrastRatio("#ffffff", "#767676"), 10);
	});

	it("reads the tokens from the real tokens.css", () => {
		const tokens = readTokens();
		expect(tokens["color-carbon"]).toBe("#14110f");
		expect(tokens["color-marfil"]).toBe("#f9ebdc");
	});

	const results = checkAll();

	it.each(results)("$fgName on $bgName meets AA — $usage", ({ error, ratio, passes }) => {
		expect(error).toBeUndefined();
		expect(ratio).toBeGreaterThanOrEqual(AA_NORMAL_TEXT);
		expect(passes).toBe(true);
	});

	// The concrete regression that produced this test: the contact form's
	// error once sat at 3.17:1 on a card. Coral is the night error; Grana
	// (#D33440) is a fill, never text on the dark (3.88:1 at best).
	it("keeps the form error legible on a raised section", () => {
		const tokens = readTokens();
		expect(contrastRatio(tokens["color-alerta"], tokens["color-carbon-raised"])).toBeGreaterThanOrEqual(AA_NORMAL_TEXT);
	});
});
