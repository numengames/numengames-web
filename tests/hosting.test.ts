// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: AGPL-3.0-only
//
// La página de alojamiento dice qué se aloja, qué incluye y cómo se pide,
// en los dos idiomas con la misma forma, y no promete precios que no existen.
import { describe, expect, it } from "vitest";
import { HOSTING } from "../src/content/hosting";
import { getDictionary } from "../src/content/dictionary";

describe("hosting", () => {
	it("existe en los dos idiomas con la misma forma", () => {
		const es = HOSTING.es;
		const en = HOSTING.en;
		expect(es.included.length).toBeGreaterThan(2);
		expect(en.included.length).toBe(es.included.length);
		expect(en.plans.length).toBe(es.plans.length);
		expect(en.steps.length).toBe(es.steps.length);
	});

	it("cada plan dice para quién es y qué incluye", () => {
		for (const locale of ["es", "en"] as const) {
			for (const p of HOSTING[locale].plans) {
				expect(p.name.trim()).not.toBe("");
				expect(p.forWhom.trim()).not.toBe("");
				expect(p.includes.length).toBeGreaterThan(0);
			}
		}
	});

	it("no publica una cifra de precio mientras no esté decidida", () => {
		for (const locale of ["es", "en"] as const) {
			const text = JSON.stringify(HOSTING[locale]);
			expect(text).not.toMatch(/\d+\s?(€|EUR)/);
		}
	});

	it("se llega desde el pie en los dos idiomas", () => {
		for (const locale of ["es", "en"] as const) {
			const paths = getDictionary(locale).footer.extraLinks.map((l) => l.path);
			expect(paths).toContain("/hosting");
		}
	});
});
