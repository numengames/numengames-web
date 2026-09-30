// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: AGPL-3.0-only
//
// La página de alojamiento es una página de venta completa: qué se aloja,
// datos de cada plan, cómo se contrata y una solicitud que se puede enviar.
// No se ata a un motor concreto ni publica precios mientras no estén decididos.
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { HOSTING } from "../src/content/hosting";
import { getDictionary } from "../src/content/dictionary";

const LOCALES = ["es", "en"] as const;
const PAGE = "src/pages/[locale]/hosting/index.astro";

describe("hosting", () => {
	it("existe en los dos idiomas con la misma forma", () => {
		const es = HOSTING.es;
		const en = HOSTING.en;
		expect(en.facts.length).toBe(es.facts.length);
		expect(en.fits.length).toBe(es.fits.length);
		expect(en.included.length).toBe(es.included.length);
		expect(en.specs.length).toBe(es.specs.length);
		expect(en.flow.length).toBe(es.flow.length);
		expect(en.faq.length).toBe(es.faq.length);
		expect(en.form.fields.map((f) => f.name)).toEqual(es.form.fields.map((f) => f.name));
	});

	it("da datos: una tabla de planes con valor en cada casilla", () => {
		for (const l of LOCALES) {
			const h = HOSTING[l];
			expect(h.plans.length).toBe(2);
			expect(h.specs.length).toBeGreaterThanOrEqual(8);
			for (const row of h.specs) {
				expect(row.values.length).toBe(h.plans.length);
				for (const v of row.values) expect(v.trim()).not.toBe("");
			}
		}
	});

	it("explica cómo se contrata, paso a paso, con quién y cuánto tarda", () => {
		for (const l of LOCALES) {
			const flow = HOSTING[l].flow;
			expect(flow.length).toBeGreaterThanOrEqual(4);
			for (const s of flow) {
				expect(s.title.trim()).not.toBe("");
				expect(s.who.trim()).not.toBe("");
				expect(s.when.trim()).not.toBe("");
			}
		}
	});

	it("la solicitud pide lo que hace falta para proponer, con claves ASCII", () => {
		const names = HOSTING.es.form.fields.map((f) => f.name);
		for (const n of ["name", "email", "organization", "world_url", "visitors", "event_size"]) {
			expect(names).toContain(n);
		}
		for (const n of names) expect(n).toMatch(/^[a-z][a-z0-9_]*$/);
		expect(readFileSync(PAGE, "utf8")).toMatch(/id="solicitud"/);
	});

	it("no se ata a un motor concreto", () => {
		for (const l of LOCALES) {
			expect(JSON.stringify(HOSTING[l])).not.toMatch(/hyperfy/i);
		}
		expect(readFileSync(PAGE, "utf8")).not.toMatch(/hyperfy/i);
	});

	it("no publica una cifra de precio mientras no esté decidida", () => {
		for (const l of LOCALES) {
			expect(JSON.stringify(HOSTING[l])).not.toMatch(/\d+\s?(€|EUR)/);
		}
	});

	it("se llega desde la barra en los dos idiomas", () => {
		for (const l of LOCALES) {
			const paths = getDictionary(l).nav.links.map((x) => x.path);
			expect(paths).toContain("/hosting");
		}
	});
});
