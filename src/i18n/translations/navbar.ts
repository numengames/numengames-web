import type { SupportedLocale } from "../index";

interface ServiceNavItem {
	subtitle: string;
	desc: string;
}

export interface NavbarTexts {
	services: string;
	company: string;
	helpCenter: string;
	pricing: string;
	portfolio: string;
	numinia: string;
	contact: string;
	readMore: string;
	engage: ServiceNavItem;
	training: ServiceNavItem;
	experience: ServiceNavItem;
}

const translations: Record<SupportedLocale, NavbarTexts> = {
	en: {
		services: "Services",
		company: "Company",
		helpCenter: "Help Center",
		pricing: "Pricing",
		portfolio: "Portfolio",
		numinia: "Numinia",
		contact: "Contact",
		readMore: "Read More",
		engage: {
			subtitle: "Engagement service",
			desc: "We develop immersive 3D environments that transform how your organization retains talent.",
		},
		training: {
			subtitle: "Immersive 3D environments",
			desc: "Create immersive 3D environments that strengthen your organization's talent retention, values, and culture.",
		},
		experience: {
			subtitle: "Tailored Gamified Experiences",
			desc: "We design fully customized gamified experiences to meet specific business objectives.",
		},
	},
	es: {
		services: "Servicios",
		company: "Empresa",
		helpCenter: "Centro de ayuda",
		pricing: "Precios",
		portfolio: "Portfolio",
		numinia: "Numinia",
		contact: "Contacto",
		readMore: "Saber más",
		engage: {
			subtitle: "Servicio de engagement",
			desc: "Desarrollamos entornos 3D inmersivos que transforman la forma en que tu organización retiene el talento.",
		},
		training: {
			subtitle: "Entornos 3D inmersivos",
			desc: "Crea entornos 3D inmersivos que refuercen la retención del talento, los valores y la cultura de tu organización.",
		},
		experience: {
			subtitle: "Experiencias gamificadas a medida",
			desc: "Diseñamos experiencias gamificadas totalmente personalizadas para alcanzar objetivos de negocio específicos.",
		},
	},
};

export function getNavbarTranslations(locale: SupportedLocale): NavbarTexts {
	return translations[locale] ?? translations.en;
}
