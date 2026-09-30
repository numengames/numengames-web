// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: AGPL-3.0-only
//
// El sello de ENISA en el pie: Numen Games tiene un préstamo participativo
// de ENISA, firmado el 22-10-2024 (numinia-archive OPS-017). El sello va en
// todas las páginas, visible, con el texto que el propio sello dice, y
// enlaza al registro público del préstamo. El fichero es de ENISA: REUSE.toml
// nombra a su titular, nunca lo licenciamos nosotros.
import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { getDictionary } from "../src/content/dictionary";

const SEAL = "public/partners/enisa-financiada-por.png";
const footer = () => readFileSync("src/components/site/SiteFooter.astro", "utf8");

describe("sello de ENISA en el pie", () => {
	it("el fichero está en el árbol", () => {
		expect(existsSync(SEAL)).toBe(true);
	});
	it("el pie lo pinta y enlaza al registro público del préstamo", () => {
		const f = footer();
		expect(f).toContain('src="/partners/enisa-financiada-por.png"');
		expect(f).toContain("https://numinia.org/operations/ops-017-the-enisa-loan");
	});
	it("el texto alternativo dice lo que dice el sello, en los dos idiomas", () => {
		for (const l of ["es", "en"] as const) {
			expect(getDictionary(l).footer.enisaAlt).toMatch(/ENISA/);
			expect(getDictionary(l).footer.enisaAlt).toMatch(/Ministerio de Industria y Turismo/);
		}
	});
	it("REUSE.toml nombra a ENISA como titular y no lo licencia como nuestro", () => {
		const toml = readFileSync("REUSE.toml", "utf8");
		const i = toml.indexOf(`"${SEAL}"`);
		expect(i).toBeGreaterThan(0);
		const block = toml.slice(i, toml.indexOf("[[annotations]]", i) === -1 ? undefined : toml.indexOf("[[annotations]]", i));
		expect(block).toMatch(/Empresa Nacional de Innovación/);
		expect(block).toMatch(/LicenseRef-Third-Party-Mark/);
	});
});
