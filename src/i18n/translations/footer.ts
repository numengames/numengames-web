import type { SupportedLocale } from "../index";

export interface FooterTexts {
  cta: {
    heading1: string;
    highlight: string;
    heading2: string;
    description: string;
    contact: string;
  };
  nav: {
    services: string;
    company: string;
    resources: string;
    links: {
      engage: string;
      training: string;
      experience: string;
      aboutUs: string;
      contact: string;
      manifesto: string;
      portfolio: string;
      helpCenter: string;
      numinia: string;
      documentation: string;
    };
  };
  bottom: {
    madeBy: string;
    privacy: string;
    terms: string;
    cookies: string;
  };
}

const translations: Record<SupportedLocale, FooterTexts> = {
  en: {
    cta: {
      heading1: "Start creating your own",
      highlight: "3D immersive experience",
      heading2: "with us now",
      description: "We design interactive digital products focused on learning, engagement and branded experiences.",
      contact: "Contact",
    },
    nav: {
      services: "Services",
      company: "Company",
      resources: "Resources",
      links: {
        engage: "Engage",
        training: "Training",
        experience: "Experience",
        aboutUs: "About us",
        contact: "Contact",
        manifesto: "Manifesto",
        portfolio: "Portfolio",
        helpCenter: "Help center",
        numinia: "Numinia",
        documentation: "Documentation",
      },
    },
    bottom: {
      madeBy: "Made by the Numen Games team",
      privacy: "Privacy policy",
      terms: "Terms & Conditions",
      cookies: "Cookies",
    },
  },
  es: {
    cta: {
      heading1: "Empieza a crear tu propia",
      highlight: "experiencia 3D inmersiva",
      heading2: "con nosotros ahora",
      description: "Diseñamos productos digitales interactivos centrados en el aprendizaje, el compromiso y las experiencias de marca.",
      contact: "Contacto",
    },
    nav: {
      services: "Servicios",
      company: "Empresa",
      resources: "Recursos",
      links: {
        engage: "Engage",
        training: "Training",
        experience: "Experience",
        aboutUs: "Sobre nosotros",
        contact: "Contacto",
        manifesto: "Manifiesto",
        portfolio: "Portfolio",
        helpCenter: "Centro de ayuda",
        numinia: "Numinia",
        documentation: "Documentación",
      },
    },
    bottom: {
      madeBy: "Hecho por el equipo de Numen Games",
      privacy: "Política de privacidad",
      terms: "Términos y Condiciones",
      cookies: "Cookies",
    },
  },
};

export function getFooterTranslations(locale: SupportedLocale): FooterTexts {
  return translations[locale] ?? translations.en;
}
