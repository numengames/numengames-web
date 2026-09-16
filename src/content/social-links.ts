// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: AGPL-3.0-only
//
// Redes de la casa, las mismas en los tres sitios (numinia.org,
// numinia.com, numen.games). Vacío hasta que el Oráculo entregue las URLs
// de empresa (X, Discord, GitHub): con la lista vacía el pie no pinta la
// columna Social. Nunca cuentas personales.
export interface SocialLink {
	label: string;
	href: string;
}

export const socialLinks: readonly SocialLink[] = [];
