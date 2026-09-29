// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: AGPL-3.0-only
//
// Lo que un visitante lee en /legal/* no puede filtrar notas internas del
// archivo: las review_flags viven en el frontmatter del maestro y la página
// pinta solo el cuerpo. Dos capas:
//
//   1. el cuerpo de cada copia (lo que la página pinta) no contiene ninguna
//      cadena interna y su único correo es legal@numengames.com;
//   2. el HTML construido (dist/) de las cuatro rutas × dos idiomas existe,
//      no contiene esas cadenas en ninguna parte y el pie enlaza las cuatro.
//
// La capa 2 necesita `pnpm build`. En CI corre en su propio paso después del
// build con REQUIRE_DIST=1, que la vuelve obligatoria; en `pnpm test` (antes
// del build) se salta si dist/ no existe.
import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

export const DOCS = ["notice", "privacy", "cookies", "terms"] as const;
const LOCALES = ["es", "en"] as const;

/** Cadenas que delatan una nota interna publicada por error. */
export const FORBIDDEN: readonly RegExp[] = [/FLAG-/, /frontmatter/i, /Audience:\W*Oracle/, /DRAFT/, /\[PENDING/, /scope is under review/i, /cuota de socio/i, /startupvalencia/i, /gm@numengames\.com/i, /review_flags/];

const EMAIL = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;

function body(file: string): string {
	return readFileSync(file, "utf8").replace(/^---\n[\s\S]*?\n---\n/, "");
}

function offences(text: string): string[] {
	return FORBIDDEN.filter((re) => re.test(text)).map(String);
}

describe("higiene legal — el cuerpo de las copias", () => {
	for (const doc of DOCS) {
		const text = body(`src/content/legal/${doc}.md`);
		it(`${doc}: ninguna cadena interna`, () => {
			expect(offences(text)).toEqual([]);
		});
		it(`${doc}: el único correo es legal@numengames.com`, () => {
			const emails = new Set(text.match(EMAIL) ?? []);
			expect([...emails]).toEqual(["legal@numengames.com"]);
		});
	}

	it("el detector no es ciego: una bandera en el cuerpo se ve", () => {
		expect(offences("FLAG-2: cuota de socio — write to gm@numengames.com")).toHaveLength(3);
	});
});

const needDist = process.env.REQUIRE_DIST === "1";
describe.skipIf(!needDist && !existsSync("dist"))("higiene legal — el HTML construido (dist/)", () => {
	for (const locale of LOCALES) {
		for (const doc of DOCS) {
			const file = `dist/${locale}/legal/${doc}/index.html`;
			it(`/${locale}/legal/${doc} existe y no filtra notas internas`, () => {
				expect(existsSync(file), file).toBe(true);
				const html = readFileSync(file, "utf8");
				expect(offences(html)).toEqual([]);
				const article = html.match(/<article[^>]*data-legal-doc[^>]*>([\s\S]*?)<\/article>/)?.[1] ?? "";
				expect(article.length).toBeGreaterThan(1000);
				expect([...new Set(article.match(EMAIL) ?? [])]).toEqual(["legal@numengames.com"]);
			});
		}
		it(`el pie de /${locale}/ enlaza las cuatro páginas legales en orden y el botón de cookies`, () => {
			const html = readFileSync(`dist/${locale}/index.html`, "utf8");
			const at = DOCS.map((doc) => html.indexOf(`href="/${locale}/legal/${doc}"`));
			for (const i of at) expect(i).toBeGreaterThan(-1);
			expect([...at].sort((a, b) => a - b)).toEqual(at);
			expect(html.indexOf("data-cookie-choice")).toBeGreaterThan(at[3]!);
		});
	}
});
