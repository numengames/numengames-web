// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: AGPL-3.0-only
//
// El interruptor de día y noche muestra el modo en el que estás (decisión
// del Oráculo, 2026-10-04): de noche la luna con estrellas, de día el sol.
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const header = readFileSync(new URL("../src/components/site/SiteHeader.astro", import.meta.url), "utf8");

describe("mode switch icon", () => {
	it("la luna con estrellas solo se ve de noche", () => {
		expect(header).toMatch(/<span class="solo-nocturno" set:html=\{moonStars\} \/>/);
	});
	it("el sol solo se ve de día", () => {
		expect(header).toMatch(/<span class="solo-diurno" set:html=\{sun\} \/>/);
	});
});
