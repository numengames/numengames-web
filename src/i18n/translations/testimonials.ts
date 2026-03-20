import type { SupportedLocale } from "../index";

export interface TestimonialsTexts {
  label: string;
  heading: string;
  description: string;
  ecosystemLabel: string;
}

const translations: Record<SupportedLocale, TestimonialsTexts> = {
  en: {
    label: "TESTIMONIALS",
    heading: "Why People Love Us",
    description: "Our partners & clients' stories showcase our passion for delivering great results. Take a look at how we've helped clients, partners, and community to succeed.",
    ecosystemLabel: "Working with ecosystem leaders",
  },
  es: {
    label: "TESTIMONIOS",
    heading: "Por Qué la Gente Nos Elige",
    description: "Las historias de nuestros socios y clientes muestran nuestra pasión por ofrecer grandes resultados. Mira cómo hemos ayudado a clientes, socios y comunidad a tener éxito.",
    ecosystemLabel: "Trabajando con líderes del ecosistema",
  },
};

export function getTestimonialsTranslations(locale: SupportedLocale): TestimonialsTexts {
  return translations[locale] ?? translations.en;
}
