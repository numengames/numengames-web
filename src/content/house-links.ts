// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: AGPL-3.0-only
//
// Los cuatro sitios de la casa, en el orden en que los leería un visitante:
// la empresa, el juego, el archivo, el servicio. La misma lista está en el
// pie de los cuatro (una copia por repositorio, decisión del 2026-09-16: no
// hay paquete compartido aún), con el sitio actual como texto, no enlace.
// Desde cualquiera de los cuatro ves los otros tres y para qué sirven.
export interface HouseLink {
	readonly id: "company" | "game" | "archive" | "service";
	readonly label: string;
	readonly what: { es: string; en: string };
	readonly href: string;
}

export const HOUSE_LINKS: readonly HouseLink[] = [
	{ id: "company", label: "Numen Games", what: { es: "la empresa", en: "the company" }, href: "https://numen.games" },
	{ id: "game", label: "Numinia", what: { es: "el juego", en: "the game" }, href: "https://numinia.com" },
	{ id: "archive", label: "NWOS", what: { es: "el archivo, construido en público", en: "the archive, built in public" }, href: "https://numinia.org" },
	{ id: "service", label: "NWOS para tu organización", what: { es: "el servicio", en: "the service" }, href: "https://nwos.numen.games" },
];

/** Cuál de los cuatro es este sitio. */
export const THIS_SITE: HouseLink["id"] = "company";
