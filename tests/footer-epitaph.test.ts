// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: AGPL-3.0-only
//
// El pie del 2026-10-03 (orden del Oráculo, los cuatro sitios): la calavera
// con el epitafio de CAN-002, el botón Back Numinia hacia numinia.com/back,
// Discord en Social y el correo que sí tiene servidor.
import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { getDictionary } from "../src/content/dictionary";
import { socialLinks } from "../src/content/social-links";
import { PENDING } from "../src/content/updates";

const footer = readFileSync("src/components/site/SiteFooter.astro", "utf8");
const EPITAPH = "They dreamed and experimented life, they imagined and took action. They were part of the fight to change the model, they did not let us alone, they built a game with which to create a better world.";

const walk = (dir: string): string[] => readdirSync(dir).flatMap((n) => (statSync(join(dir, n)).isDirectory() ? walk(join(dir, n)) : [join(dir, n)]));

describe("la calavera y el epitafio", () => {
	it("el epitafio va literal, en inglés, y cita CAN-002", () => {
		expect(footer).toContain(EPITAPH);
		expect(footer).toContain("CAN-002");
	});
	it("es un botón accesible que despliega un globo, sin navegar", () => {
		expect(footer).toMatch(/<button type="button" class="site-footer__calavera" aria-label="Epitaph" aria-expanded="false"/);
		expect(footer).toContain('role="tooltip"');
		expect(footer).toContain('"Escape"');
		expect(footer).toMatch(/min-width: 44px;\s*min-height: 44px;/);
	});
	it("la calavera es el skull de Phosphor, después de la línea de build", () => {
		const svg = readFileSync("src/assets/icons/skull.svg", "utf8");
		expect(svg).toContain('viewBox="0 0 256 256"');
		expect(svg).toContain("M92,104a28,28,0,1,0,28,28");
		expect(footer.indexOf('site-footer__calavera"')).toBeGreaterThan(footer.indexOf('class="site-footer__build"'));
	});
});

describe("el botón del mecenazgo", () => {
	it("se llama Back Numinia en inglés y Apoya Numinia en español", () => {
		expect(getDictionary("en").footer.support).toBe("Back Numinia");
		expect(getDictionary("es").footer.support).toBe("Apoya Numinia");
	});
	it("lleva a numinia.com/back, no a /support", () => {
		expect(footer).toContain("https://numinia.com/back/");
		expect(footer).toContain("https://numinia.com/es/back/");
		expect(footer).not.toMatch(/numinia\.com\/(es\/)?support/);
	});
});

describe("Social", () => {
	it("Discord va justo después de GitHub", () => {
		const labels = socialLinks.map((l) => l.label);
		expect(labels.indexOf("Discord")).toBe(labels.indexOf("GitHub") + 1);
		expect(socialLinks.find((l) => l.label === "Discord")?.href).toBe("https://discord.gg/ASwwdd24pp");
	});
	it("lo pendiente ya no espera a Discord; X sí", () => {
		const text = PENDING.map((p) => p.text.en).join(" ");
		expect(text).not.toMatch(/Discord/);
		expect(text).toMatch(/\bX\b/);
	});
});

describe("el correo de contacto", () => {
	it("es hola@numengames.com en los dos idiomas", () => {
		for (const l of ["es", "en"] as const) expect(getDictionary(l).footer.contactEmail).toBe("hola@numengames.com");
	});
	it("hola@numen.games (sin MX) no aparece en ningún fichero de src/ salvo el historial", () => {
		const hits = walk("src").filter((f) => f !== join("src", "content", "updates.ts") && readFileSync(f, "utf8").includes("hola@numen.games"));
		expect(hits).toEqual([]);
	});
});
