// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: AGPL-3.0-only
//
// La línea temporal y la columna de la casa son datos que el pie imprime
// en cada página: forma fija, sin sorpresas.
import { describe, expect, it } from "vitest";
import { CURRENT_VERSION, PENDING, UPDATES } from "../src/content/updates";
import { HOUSE_LINKS, THIS_SITE } from "../src/content/house-links";

describe("updates", () => {
	it("la más nueva va primero y es la que imprime el pie", () => {
		expect(CURRENT_VERSION).toBe(UPDATES[0]!.version);
		expect(CURRENT_VERSION).toMatch(/^v\d+\.\d+\.\d+$/);
	});
	it("cada versión lleva fecha ISO y al menos una entrada en los dos idiomas", () => {
		for (const u of UPDATES) {
			expect(u.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
			expect(u.entries.length).toBeGreaterThan(0);
			for (const e of u.entries) {
				expect(e.text.es.trim()).not.toBe("");
				expect(e.text.en.trim()).not.toBe("");
			}
		}
		for (const p of PENDING) {
			expect(["planned", "blocked"]).toContain(p.status);
		}
	});
});

describe("house-links", () => {
	it("nombra los cuatro sitios una vez cada uno, este incluido", () => {
		expect(HOUSE_LINKS.map((l) => l.id).sort()).toEqual(["archive", "company", "game", "service"]);
		expect(THIS_SITE).toBe("company");
	});
	it("cada entrada es un enlace https a un dominio de la casa", () => {
		for (const l of HOUSE_LINKS) {
			expect(l.href).toMatch(/^https:\/\/(numen\.games|numinia\.com|numinia\.org|nwos\.numen\.games)$/);
		}
	});
});
