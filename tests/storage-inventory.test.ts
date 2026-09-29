// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: AGPL-3.0-only
//
// Lo que el sitio guarda en el navegador tiene que estar nombrado en la
// política de cookies (LEG-003 §3.3, la sección de numen.games en la copia
// src/content/legal/cookies.md). Este test lee el código del sitio y busca:
//
//   · localStorage.setItem("…") y sessionStorage.setItem("…")
//   · constantes cuyo nombre lleva KEY: const THEME_KEY = "…"
//   · el nombre de la cookie de consentimiento (CONSENT_COOKIE)
//
// Una clave nueva que la política no nombre hace fallar el test: primero se
// cambia el maestro en el archivo, se re-copia aquí, y entonces el código.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { CONSENT_COOKIE, STORED_KEYS } from "../src/lib/cookie-notice";

const ROOTS = ["src", "worker"];
const SKIP = [/^src\/content\/legal\//, /\.test\.[a-z]+$/, /\.d\.ts$/];
const EXT = /\.(ts|js|mjs|astro|svelte|tsx|jsx)$/;

function walk(dir: string): string[] {
	return readdirSync(dir).flatMap((name) => {
		const path = join(dir, name);
		return statSync(path).isDirectory() ? walk(path) : [path];
	});
}

/** Todas las claves de almacenamiento que un texto fuente escribe. */
export function keysIn(source: string): string[] {
	const found = new Set<string>();
	const patterns = [/\b(?:localStorage|sessionStorage)\.setItem\(\s*["'`]([^"'`]+)["'`]/g, /\bconst\s+[A-Z0-9_]*KEY[A-Z0-9_]*\s*(?::[^=]+)?=\s*["'`]([^"'`]+)["'`]/g];
	for (const re of patterns) for (const m of source.matchAll(re)) found.add(m[1]!);
	return [...found];
}

/** La sección 3.3 de la copia de LEG-003: lo que la política dice de numen.games. */
function policySection(): string {
	const text = readFileSync("src/content/legal/cookies.md", "utf8");
	const m = text.match(/### 3\.3 numen\.games\n([\s\S]*?)\n### /);
	if (!m) throw new Error("LEG-003 has no «### 3.3 numen.games» section");
	return m[1]!;
}

const named = (section: string, key: string) => section.includes(`\`${key}\``);

describe("inventario de almacenamiento — el código frente a LEG-003 §3.3", () => {
	const files = ROOTS.flatMap(walk).filter((f) => EXT.test(f) && !SKIP.some((re) => re.test(f)));
	const inCode = new Set<string>([CONSENT_COOKIE]);
	for (const f of files) for (const k of keysIn(readFileSync(f, "utf8"))) inCode.add(k);
	const section = policySection();

	it("encuentra las claves que hoy escribe el sitio", () => {
		expect([...inCode].sort()).toEqual(["numen_consent", "numinia-modo"]);
	});

	it("cada clave que el código escribe está nombrada en la política", () => {
		const missing = [...inCode].filter((k) => !named(section, k));
		expect(missing, "keys stored by the code but absent from LEG-003 §3.3").toEqual([]);
	});

	it("STORED_KEYS nombra exactamente lo que el código escribe, y la política lo nombra", () => {
		expect([...STORED_KEYS].sort()).toEqual([...inCode].sort());
		for (const k of STORED_KEYS) expect(named(section, k), k).toBe(true);
	});

	it("la cookie de consentimiento es numen_consent", () => {
		expect(CONSENT_COOKIE).toBe("numen_consent");
	});

	it("una clave nueva que la política no nombra se detecta", () => {
		const fake = `const THEME_KEY = "numen-theme"; localStorage.setItem('numen-font', x); sessionStorage.setItem("sp:rate", y);`;
		const keys = keysIn(fake);
		expect(keys.sort()).toEqual(["numen-font", "numen-theme", "sp:rate"]);
		expect(keys.filter((k) => !named(section, k))).toHaveLength(3);
	});
});
