// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: AGPL-3.0-only
//
// The cookie notice (LEG-003 §4), shared shape across the four sites of
// Numen Games; only the SITE block differs. Library: vanilla-cookieconsent
// (MIT, orestbida/cookieconsent) — Accept all and Reject all side by side,
// equal weight, as the AEPD cookie guide asks; browsing accepts nothing.
//
// What this site stores is listed in LEG-003 §3.3 and mirrored in
// STORED_KEYS below; tests/storage-inventory.test.ts fails when the code
// stores a key the policy does not name. This site has nothing optional:
// every key is a preference the visitor sets or the record of the choice
// itself, so the notice informs and both buttons end in the same state. Say
// so, do not pretend a choice.
//
// The notice follows the page's language (<html lang>): Spanish on /es/,
// English on /en/. The legal texts themselves exist only in English.

import * as CookieConsent from "vanilla-cookieconsent";

/** LEG-003's major version. Raising it asks every visitor again. */
export const POLICY_REVISION = 2;

/** The cookie that records the choice (LEG-003 §3.3, first row). */
export const CONSENT_COOKIE = "numen_consent";

/** Every key this site writes, as LEG-003 §3.3 names it. */
export const STORED_KEYS = ["numen_consent", "numinia-modo"] as const;

type Lang = "es" | "en";

const SITE = {
	policyPath: "/legal/cookies",
	noticePath: "/legal/notice",
	privacyPath: "/legal/privacy",
	title: {
		en: "This site keeps two things in your browser",
		es: "Este sitio guarda dos cosas en tu navegador",
	},
	description: {
		en: "Only what you choose — day or night — and this answer. Nothing follows you, nothing is sent to anyone. Both buttons leave the site the same.",
		es: "Solo lo que eliges —día o noche— y esta respuesta. Nada te sigue, nada se envía a nadie. Los dos botones dejan el sitio igual.",
	},
};

const href = (lang: Lang, path: string) => `/${lang}${path}`;

function translation(lang: Lang) {
	const es = lang === "es";
	return {
		consentModal: {
			title: SITE.title[lang],
			description: `${SITE.description[lang]} <a href="${href(lang, SITE.policyPath)}">${es ? "Política de cookies" : "Cookie policy"}</a>`,
			acceptAllBtn: es ? "Aceptar todo" : "Accept all",
			acceptNecessaryBtn: es ? "Rechazar todo" : "Reject all",
			showPreferencesBtn: es ? "Preferencias" : "Preferences",
			footer: `<a href="${href(lang, SITE.noticePath)}">${es ? "Aviso legal" : "Legal notice"}</a><a href="${href(lang, SITE.privacyPath)}">${es ? "Privacidad" : "Privacy"}</a>`,
		},
		preferencesModal: {
			title: es ? "Qué guarda este sitio" : "What this site keeps",
			acceptAllBtn: es ? "Aceptar todo" : "Accept all",
			acceptNecessaryBtn: es ? "Rechazar todo" : "Reject all",
			savePreferencesBtn: es ? "Guardar mi elección" : "Save my choice",
			closeIconLabel: es ? "Cerrar" : "Close",
			sections: [
				{
					title: es ? "Necesario, y tuyo" : "Needed, and yours",
					description: es ? "Tu modo día o noche y el registro de esta respuesta. Los pones tú; no se pueden apagar aquí, solo borrar desde tu navegador." : "Your day or night mode and the record of this answer. You set them yourself; they cannot be switched off here, only deleted from your browser.",
					linkedCategory: "necessary",
				},
				{
					title: es ? "Nada más" : "Nothing else",
					description: es ? `Ni medición, ni publicidad, nada de otras empresas. La lista completa, clave por clave, está en la <a href="${href(lang, SITE.policyPath)}">política de cookies</a>.` : `No measurement, no advertising, nothing from other companies. The full list, key by key, is in the <a href="${href(lang, SITE.policyPath)}">cookie policy</a>.`,
				},
			],
		},
	};
}

export function startCookieNotice(): void {
	void CookieConsent.run({
		revision: POLICY_REVISION,
		cookie: { name: CONSENT_COOKIE, expiresAfterDays: 182, sameSite: "Lax" },
		guiOptions: {
			consentModal: { layout: "box", position: "bottom right", equalWeightButtons: true, flipButtons: false },
			preferencesModal: { layout: "box", equalWeightButtons: true, flipButtons: false },
		},
		categories: {
			necessary: { enabled: true, readOnly: true },
		},
		language: {
			default: "es",
			autoDetect: "document",
			translations: { es: translation("es"), en: translation("en") },
		},
	});
}

/** The footer's "Change my cookie choice" button. */
export function reopenCookieNotice(): void {
	CookieConsent.showPreferences();
}
