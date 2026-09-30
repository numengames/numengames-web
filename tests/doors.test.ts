// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: AGPL-3.0-only
//
// Tres puertas: la casa ordena lo que vende por lo que busca el cliente
// —Eventos, Formación, Mundos 3D— y no por lo que hace el equipo. La barra
// lleva las tres, la portada las abre justo bajo el titular y cada una
// lleva a una página de venta que existe.
import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { getDictionary } from "../src/content/dictionary";
import { DOORS } from "../src/content/doors";
import { TRAINING } from "../src/content/training";

const LOCALES = ["es", "en"] as const;
const DOOR_PATHS = ["/experiencias", "/formacion", "/hosting"];
const pageFor = (path: string) => `src/pages/[locale]${path}/index.astro`;

describe("tres puertas", () => {
	it("la barra lleva inicio, las tres puertas y Numen, en ese orden", () => {
		for (const l of LOCALES) {
			expect(getDictionary(l).nav.links.map((x) => x.path)).toEqual(["/", ...DOOR_PATHS, "/numen"]);
		}
	});

	it("Cómo trabajamos sigue a mano desde el pie", () => {
		for (const l of LOCALES) {
			expect(getDictionary(l).footer.extraLinks.map((x) => x.path)).toContain("/como-trabajamos");
		}
	});

	it("la portada abre las tres puertas, cada una con para quién es y qué se lleva", () => {
		for (const l of LOCALES) {
			const d = DOORS[l];
			expect(d.items.map((x) => x.path)).toEqual(DOOR_PATHS);
			for (const x of d.items) {
				expect(x.name.trim()).not.toBe("");
				expect(x.forWhom.trim()).not.toBe("");
				expect(x.youGet.length).toBeGreaterThanOrEqual(2);
				expect(x.cta.trim()).not.toBe("");
			}
		}
	});

	it("cada puerta lleva a una página que existe", () => {
		for (const p of DOOR_PATHS) expect(existsSync(pageFor(p))).toBe(true);
	});
});

describe("formación", () => {
	it("existe en los dos idiomas con la misma forma", () => {
		const es = TRAINING.es;
		const en = TRAINING.en;
		expect(en.delivered.length).toBe(es.delivered.length);
		expect(en.levels.length).toBe(es.levels.length);
		expect(en.cases.length).toBe(es.cases.length);
		expect(en.flow.length).toBe(es.flow.length);
		expect(en.faq.length).toBe(es.faq.length);
	});

	it("explica cómo se contrata, con quién y cuándo en cada paso", () => {
		for (const l of LOCALES) {
			expect(TRAINING[l].flow.length).toBeGreaterThanOrEqual(4);
			for (const s of TRAINING[l].flow) {
				expect(s.who.trim()).not.toBe("");
				expect(s.when.trim()).not.toBe("");
			}
		}
	});

	it("no nombra un motor ni publica precios", () => {
		for (const l of LOCALES) {
			const text = JSON.stringify(TRAINING[l]);
			expect(text).not.toMatch(/hyperfy/i);
			expect(text).not.toMatch(/\d+\s?(€|EUR)/);
		}
	});
});
