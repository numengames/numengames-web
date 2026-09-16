// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: AGPL-3.0-only
//
// Las claves del formulario de contacto son hoy las líneas del correo que
// compone el formulario y mañana claves JSON hacia donde se conecte (CRM,
// hoja de cálculo, automatización). Con `ñ` o acentos funcionan hoy, pero
// cualquier integración posterior obliga a una migración con datos dentro.
//
// Este test las fija en ASCII. Si alguien vuelve a poner
// name="organización_o_evento", falla aquí y no seis meses después
// conectando un CRM.
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const FORM = "src/pages/[locale]/contacto/index.astro";

/** Extrae los name="..." de los campos del formulario. */
function formFieldNames(): string[] {
	const html = readFileSync(FORM, "utf8");
	return [...html.matchAll(/<(?:input|textarea|select)[^>]*\sname="([^"]+)"/g)].map(
		(m) => m[1],
	);
}

describe("claves del formulario de contacto", () => {
	it("encuentra los campos (si no, el test se ha quedado ciego)", () => {
		expect(formFieldNames().length).toBeGreaterThanOrEqual(8);
	});

	it("son todas ASCII: sin ñ ni acentos", () => {
		const noAscii = formFieldNames().filter((n) => /[^\x20-\x7E]/.test(n));
		expect(noAscii).toEqual([]);
	});

	it("son minúsculas con guión bajo, sin espacios", () => {
		const malformed = formFieldNames().filter((n) => !/^[a-z][a-z0-9_]*$/.test(n));
		expect(malformed).toEqual([]);
	});

	it("incluye los campos que la consulta necesita", () => {
		const names = formFieldNames();
		for (const required of ["name", "email", "organization", "goal"]) {
			expect(names).toContain(required);
		}
	});
});

describe("el formulario no depende de ningún servicio de terceros", () => {
	it("no lleva clave de acceso ni envía a una API externa", () => {
		const html = readFileSync(FORM, "utf8");
		expect(html).not.toMatch(/access_key|api\.web3forms\.com|import\.meta\.env\.PUBLIC_/);
		expect(html).toMatch(/mailto:/);
	});
});
