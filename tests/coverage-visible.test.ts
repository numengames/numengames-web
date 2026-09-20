// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: AGPL-3.0-only
//
// La cobertura se mide y se publica; no muerde. Medido el 2026-09-19 antes
// de este test: la lógica del sitio (src/lib, worker, scripts) estaba al
// 27 % y nada lo decía — un PR podía retirar tests sin que el log de CI
// cambiara. Este test fija que `pnpm test` mide la cobertura de la lógica y
// que no hay umbral: mientras STD-015 sea draft, el guardián ve y no muerde
// (ENG-067). El umbral llega cuando el registro pase a active, fijado al
// valor medido entonces.
import { describe, expect, it } from "vitest";
import config from "../vitest.config";

const coverage = (config as { test?: { coverage?: Record<string, unknown> } }).test?.coverage;

describe("la cobertura se ve y no muerde", () => {
	it("pnpm test mide la cobertura de la lógica", () => {
		expect(coverage).toBeDefined();
		expect(coverage?.enabled).toBe(true);
		expect(coverage?.provider).toBe("v8");
		const include = coverage?.include as string[] | undefined;
		expect(include).toEqual(expect.arrayContaining(["src/lib/**", "worker/**", "scripts/**"]));
	});

	it("publica un resumen legible en el log y un lcov para las herramientas", () => {
		// text-summary lleva el total real; la tabla `text` de vitest 5.0.1 omite
		// las carpetas al 100 % (worker/ hoy), así que el número del resumen es
		// el que vale. lcov es lo que lee un badge o un comparador de PRs.
		const reporter = coverage?.reporter as string[] | undefined;
		expect(reporter).toEqual(expect.arrayContaining(["text", "text-summary", "lcov"]));
	});

	it("no tiene umbral: ve, no muerde (STD-015 draft, ENG-067)", () => {
		expect(coverage?.thresholds).toBeUndefined();
	});
});
