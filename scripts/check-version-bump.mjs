// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: AGPL-3.0-only
//
// check-version-bump — un cambio en el sitio tiene que decir qué cambió.
//
// LA REGLA (Oráculo, 2026-09-16): toda pull request que toque src/** añade
// una entrada en src/content/updates.ts y sube la versión. El pie imprime
// esa versión y enlaza a /updates; una versión que nunca se mueve no le
// dice nada al lector que vuelve, y una línea temporal que nadie está
// obligado a escribir se pudre en dos semanas.
//
// CÓMO: compara HEAD con su merge base. Si cambió algo bajo src/ (salvo el
// propio updates.ts) y la versión más nueva de updates.ts no se movió,
// falla con la instrucción exacta.
//
// Uso: node scripts/check-version-bump.mjs [--base <ref>]   (por defecto origin/main)
import { execSync } from "node:child_process";

const args = process.argv.slice(2);
const baseIdx = args.indexOf("--base");
const base = baseIdx >= 0 ? args[baseIdx + 1] : "origin/main";
const UPDATES = "src/content/updates.ts";
const SCOPE = "src/";

const sh = (cmd) => execSync(cmd, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();

let mergeBase;
try {
	mergeBase = sh(`git merge-base ${base} HEAD`);
} catch {
	console.log(`check-version-bump: no puedo resolver ${base}; se omite (no es una PR).`);
	process.exit(0);
}

const changed = sh(`git diff --name-only ${mergeBase} HEAD`).split("\n").filter(Boolean);
const siteChanged = changed.filter((f) => f.startsWith(SCOPE) && f !== UPDATES);
if (siteChanged.length === 0) {
	console.log("check-version-bump: nada cambió bajo src/ — nada que registrar.");
	process.exit(0);
}

// La primera `version: "vX.Y.Z"` del fichero es la más nueva.
const versionOf = (src) => /version:\s*"(v\d+\.\d+\.\d+)"/.exec(src)?.[1] ?? null;
const headVersion = versionOf(sh(`git show HEAD:${UPDATES}`));
let baseVersion = null;
try {
	baseVersion = versionOf(sh(`git show ${mergeBase}:${UPDATES}`));
} catch {
	/* updates.ts no existía en la base */
}

if (!headVersion) {
	console.error(`check-version-bump: ${UPDATES} no tiene ninguna versión.`);
	process.exit(1);
}
if (baseVersion === headVersion) {
	console.error(
		`check-version-bump: ${siteChanged.length} fichero(s) bajo ${SCOPE} cambiaron y la versión sigue en ${headVersion}.\n` +
			`  Añade una entrada al principio de UPDATES en ${UPDATES} con la versión siguiente y qué hace este cambio por un visitante.\n` +
			`  Cambiados: ${siteChanged.slice(0, 8).join(", ")}${siteChanged.length > 8 ? ", …" : ""}`,
	);
	process.exit(1);
}
console.log(`check-version-bump: ${baseVersion ?? "(ninguna)"} → ${headVersion}, ${siteChanged.length} fichero(s) del sitio cambiados.`);
