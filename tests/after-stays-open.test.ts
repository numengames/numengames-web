// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: AGPL-3.0-only
//
// El alojamiento no es una puerta del frente: es el «después» de un encargo.
// La portada lo dice en una sola línea dentro de la tarjeta «Después», con
// enlace a /hosting, y la barra no cambia (una sola oferta al frente).
import { describe, expect, it } from "vitest";
import { getDictionary } from "../src/content/dictionary";

const LOCALES = ["es", "en"] as const;

describe("el alojamiento es el después", () => {
	it("la tarjeta «Después» de la portada enlaza a /hosting con una línea", () => {
		for (const l of LOCALES) {
			const rows = getDictionary(l).home.momentos.rows;
			const after = rows[rows.length - 1]!;
			expect(after.more?.path).toBe("/hosting");
			expect(after.more?.label.trim()).not.toBe("");
			expect(rows.filter((r) => r.more).length).toBe(1);
		}
	});

	it("la barra sigue con una sola oferta al frente", () => {
		for (const l of LOCALES) {
			const paths = getDictionary(l).nav.links.map((x) => x.path);
			expect(paths).not.toContain("/hosting");
			expect(paths).toContain("/experiencias");
		}
	});
});
