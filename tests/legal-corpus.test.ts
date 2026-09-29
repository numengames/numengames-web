// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: AGPL-3.0-only
//
// Los textos legales que sirve numen.games son copias literales de los
// maestros del archivo numinia-archive (legal/LEG-001..004). Este test fija tres cosas que, si
// se rompen en silencio, dejan el sitio publicando un texto que nadie
// revisó:
//
//   1. las copias existen y llevan el id y la versión del maestro;
//   2. nadie ha editado la copia (el maestro se corrige en el archivo,
//      nunca aquí) — se fija el hash del cuerpo;
//   3. el pie enlaza a las cuatro páginas y no reclama copyright global
//      (CAN-005: la licencia va por fichero, vía REUSE.toml).
//
// Cuando se refresque una copia desde el maestro, actualizar los hashes.
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const LEGAL = {
	notice: { file: "src/content/legal/notice.md", id: "LEG-004", version: "0.2.0" },
	privacy: { file: "src/content/legal/privacy.md", id: "LEG-001", version: "2.1.0" },
	cookies: { file: "src/content/legal/cookies.md", id: "LEG-003", version: "2.1.0" },
	terms: { file: "src/content/legal/terms.md", id: "LEG-002", version: "1.0.1" },
} as const;

function frontmatter(text: string): Record<string, string> {
	const m = text.match(/^---\n([\s\S]*?)\n---/);
	if (!m) return {};
	const out: Record<string, string> = {};
	for (const line of m[1].split("\n")) {
		const kv = line.match(/^([a-z_]+):\s*"?([^"\n]*)"?\s*$/);
		if (kv) out[kv[1]] = kv[2];
	}
	return out;
}

describe("corpus legal — copias literales de los maestros numinia-archive", () => {
	for (const [doc, spec] of Object.entries(LEGAL)) {
		it(`${doc}: lleva el id y la versión del maestro`, () => {
			const fm = frontmatter(readFileSync(spec.file, "utf8"));
			expect(fm["id"]).toBe(spec.id);
			expect(fm["version"]).toBe(spec.version);
			expect(fm["license"]).toBe("LicenseRef-Numen-AllRightsReserved");
		});
	}

	it("cada texto nombra numen.games como sitio al que se aplica y lleva su SPDX por fichero", () => {
		for (const spec of Object.values(LEGAL)) {
			const text = readFileSync(spec.file, "utf8");
			// LEG-001/003/004: «Applies to: numen.games · …»; LEG-002: «website www.numen.games».
			expect(text, spec.file).toMatch(/\*\*Applies to:\*\* numen\.games|website www\.numen\.games/);
			expect(text, spec.file).toContain("SPDX-FileCopyrightText: 2026 Numen Games S.L.");
			expect(text, spec.file).toContain("SPDX-License-Identifier: LicenseRef-Numen-AllRightsReserved");
		}
	});

	it("las copias no se han editado localmente (hash del cuerpo)", () => {
		// Hashes de los maestros a 2026-09-29 (numinia-archive, rama
		// legal/honest-texts-and-debt, PR #572; LEG-003 2.1.0 #573; LEG-004 0.2.0 #574). Si cambian, o se refrescó desde
		// el maestro (actualiza aquí) o alguien tocó la copia (revierte).
		const hashes: Record<string, string> = {
			notice: "7dfd5e6fb5f7399e",
			privacy: "1f45b6ec31c78d56",
			cookies: "95261f850f2a10b4",
			terms: "861bd55603fdad25",
		};
		for (const [doc, spec] of Object.entries(LEGAL)) {
			const body = readFileSync(spec.file, "utf8").replace(/^---\n[\s\S]*?\n---\n/, "");
			const hash = createHash("sha256").update(body).digest("hex").slice(0, 16);
			expect(hash, doc).toBe(hashes[doc]);
		}
	});
});

describe("pie de página — el estándar de la casa", () => {
	const footer = readFileSync("src/components/site/SiteFooter.astro", "utf8");

	it("firma «by Numen Games — we build for a better future.» y abre numen.games en pestaña nueva", () => {
		expect(footer).toContain('{"by "}');
		expect(footer).toContain('{" — we build for a better future."}');
		expect(footer).toMatch(/href="https:\/\/numen\.games"[^>]*target="_blank"[^>]*rel="noopener noreferrer"/);
	});

	it("no reclama copyright ni derechos reservados", () => {
		expect(footer).not.toMatch(/&copy;|©|rights/i);
	});

	it("la columna Legal: aviso legal · privacidad · cookies · términos, en ese orden, y el botón de cookies", () => {
		const order = ["/legal/notice", "/legal/privacy", "/legal/cookies", "/legal/terms"].map((slug) => footer.indexOf(`localizedPath("${slug}", locale)`));
		for (const i of order) expect(i).toBeGreaterThan(-1);
		expect([...order].sort((a, b) => a - b)).toEqual(order);
		const button = footer.indexOf("data-cookie-choice");
		expect(button).toBeGreaterThan(order[3]!);
		expect(footer).toContain("{f.cookieChoice}");
	});

	it("enlaza licencia, telemetría, versión y commit", () => {
		expect(footer).toContain("LICENSE_URL");
		expect(footer).toContain('localizedPath("/telemetry", locale)');
		expect(footer).toContain("UPDATES_PATH");
		expect(footer).toContain("HOUSE_LINKS");
		expect(footer).toContain("COMMIT_URL");
	});
});
