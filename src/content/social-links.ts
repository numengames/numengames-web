// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: AGPL-3.0-only
//
// Redes de la casa, la misma lista en los cuatro sitios (una copia por
// repositorio, sin paquete compartido aún). GitHub es el de la organización;
// X y Discord se añaden cuando el Oráculo entregue las URLs de empresa.
// Nunca cuentas personales.
export interface SocialLink {
	label: string;
	href: string;
}

export const socialLinks: readonly SocialLink[] = [
	{ label: "GitHub", href: "https://github.com/numengames" },
];
