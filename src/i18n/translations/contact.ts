import type { SupportedLocale } from "../index";

export interface ContactTexts {
	firstName: string;
	lastName: string;
	email: string;
	project: string;
	projectPlaceholder: string;
	terms: string;
	termsLink: string;
	send: string;
	sending: string;
	error: string;
}

const translations: Record<SupportedLocale, ContactTexts> = {
	en: {
		firstName: "First Name",
		lastName: "Last Name",
		email: "Work Email",
		project: "What do you want to build?",
		projectPlaceholder: "Tell us about your project...",
		terms: "I agree to Numen Games",
		termsLink: "Terms and Conditions",
		send: "Send Message",
		sending: "Sending...",
		error: "Something went wrong.",
	},
	es: {
		firstName: "Nombre",
		lastName: "Apellido",
		email: "Email de trabajo",
		project: "¿Qué quieres construir?",
		projectPlaceholder: "Cuéntanos sobre tu proyecto...",
		terms: "Acepto los",
		termsLink: "Términos y Condiciones",
		send: "Enviar mensaje",
		sending: "Enviando...",
		error: "Algo salió mal.",
	},
};

export function getContactTranslations(locale: SupportedLocale): ContactTexts {
	return translations[locale] ?? translations.en;
}
