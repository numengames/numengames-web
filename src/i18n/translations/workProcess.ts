import type { SupportedLocale } from "../index";

export interface WorkProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface WorkProcessTexts {
  label: string;
  heading: string;
  cta: string;
  badge: string;
  steps: WorkProcessStep[];
}

const translations: Record<SupportedLocale, WorkProcessTexts> = {
  en: {
    label: "WORK_PROCESS",
    heading: "How We Co-Create With You",
    cta: "Digital Team Readiness Assessment",
    badge: "FREE",
    steps: [
      {
        number: "01",
        title: "Act",
        description: "Share your requirements and employee profiles to enable us to craft a solution tailored to your team's unique needs.",
      },
      {
        number: "02",
        title: "Infer",
        description: "Our approach involves an in-depth assessment of your needs, ensuring the simulation solutions we create are perfectly aligned with your team's expertise.",
      },
      {
        number: "03",
        title: "Serv",
        description: "Get customized solutions designed to achieve your goals. Then, choose from our wide variety of gamified options to boost your employee training program.",
      },
    ],
  },
  es: {
    label: "PROCESO_DE_TRABAJO",
    heading: "Cómo Co-Creamos Contigo",
    cta: "Evaluación de Preparación del Equipo Digital",
    badge: "GRATIS",
    steps: [
      {
        number: "01",
        title: "Act",
        description: "Comparte tus requisitos y perfiles de empleados para que podamos diseñar una solución adaptada a las necesidades únicas de tu equipo.",
      },
      {
        number: "02",
        title: "Infer",
        description: "Nuestro enfoque implica una evaluación profunda de tus necesidades, asegurando que las soluciones de simulación que creamos estén perfectamente alineadas con la experiencia de tu equipo.",
      },
      {
        number: "03",
        title: "Serv",
        description: "Obtén soluciones personalizadas diseñadas para alcanzar tus objetivos. Luego, elige entre nuestra amplia variedad de opciones gamificadas para potenciar el programa de formación de tus empleados.",
      },
    ],
  },
};

export function getWorkProcessTranslations(locale: SupportedLocale): WorkProcessTexts {
  return translations[locale] ?? translations.en;
}
