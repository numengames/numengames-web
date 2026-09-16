// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: AGPL-3.0-only
//
// Los textos legales que sirve numen.games son copias literales de los
// maestros del archivo numinia-nwos. Este test fija tres cosas que, si
// se rompen en silencio, dejan el sitio publicando un texto que nadie
// revisó:
//
//   1. las copias existen y llevan el id y la versión del maestro;
//   2. nadie ha editado la copia (el maestro se corrige en el archivo,
//      nunca aquí) — se fija el hash del cuerpo;
//   3. el pie enlaza a ambas páginas y no reclama copyright global
//      (CAN-005: la licencia va por fichero, vía REUSE.toml).
//
// Cuando se refresque una copia desde el maestro, actualizar los hashes.
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const LEGAL = {
	terms: { file: "src/content/legal/terms.md", id: "OPS-004", version: "1.0.0" },
	privacy: { file: "src/content/legal/privacy.md", id: "OPS-003", version: "2.0.0" },
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

describe("corpus legal — copias literales de los maestros numinia-nwos", () => {
	for (const [doc, spec] of Object.entries(LEGAL)) {
		it(`${doc}: lleva el id y la versión del maestro`, () => {
			const fm = frontmatter(readFileSync(spec.file, "utf8"));
			expect(fm["id"]).toBe(spec.id);
			expect(fm["version"]).toBe(spec.version);
			expect(fm["license"]).toBe("LicenseRef-Numen-AllRightsReserved");
		});
	}

	it("los dos textos nombran www.numen.games como su ámbito", () => {
		for (const spec of Object.values(LEGAL)) {
			expect(readFileSync(spec.file, "utf8")).toMatch(/www\.numen\.games/);
		}
	});

	it("las copias no se han editado localmente (hash del cuerpo)", () => {
		// Hashes de los maestros a 2026-09-16 (numinia-nwos main 2f5e5a7, HEAD del
		// clon). Si cambian, o se refrescó desde el maestro (actualiza aquí) o
		// alguien tocó la copia (revierte).
		const hashes: Record<string, string> = {
			terms: "a8161bc39ba8806d",
			privacy: "ac996fa09bd6825d",
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

	it("enlaza términos y privacidad, licencia, telemetría, versión y commit", () => {
		expect(footer).toContain('localizedPath("/legal/terms", locale)');
		expect(footer).toContain('localizedPath("/legal/privacy", locale)');
		expect(footer).toContain("LICENSE_URL");
		expect(footer).toContain('localizedPath("/telemetry", locale)');
		expect(footer).toContain("UPDATES_PATH");
		expect(footer).toContain("HOUSE_LINKS");
		expect(footer).toContain("COMMIT_URL");
	});
});
