import type { SupportedLocale } from "../index";

export interface BlogTexts {
  label: string;
  heading: string;
  description: string;
}

const translations: Record<SupportedLocale, BlogTexts> = {
  en: {
    label: "Insights & Ideas",
    heading: "Blog",
    description: "Gamification, immersive experiences and the future of how organisations engage and develop their people.",
  },
  es: {
    label: "Ideas y Perspectivas",
    heading: "Blog",
    description: "Gamificación, experiencias inmersivas y el futuro de cómo las organizaciones conectan y desarrollan a sus personas.",
  },
};

export function getBlogTranslations(locale: SupportedLocale): BlogTexts {
  return translations[locale] ?? translations.en;
}
