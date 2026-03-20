import type { SupportedLocale } from "../index";

export interface PricingPlan {
  title: string;
  priceLabel: string;
  features: string[];
  cta: string;
}

export interface PricingTexts {
  plans: PricingPlan[];
}

const translations: Record<SupportedLocale, PricingTexts> = {
  en: {
    plans: [
      {
        title: "Tiers 1",
        priceLabel: "Starting at",
        features: [
          "Navigable mini-universe",
          "Basic 2D → 3D conversion",
          "Adapted visual identity",
          "Fast delivery",
          "Ideal for testing the metaverse",
        ],
        cta: "Contact",
      },
      {
        title: "Tiers 2",
        priceLabel: "Starting at",
        features: [
          "100% custom design",
          "Narrative + art + interaction",
          "Multimedia integration",
          "Full immersive experience",
          "Ideal for brands seeking differentiation",
        ],
        cta: "Contact",
      },
      {
        title: "Tiers 3",
        priceLabel: "Starting at",
        features: [
          "Persistent and scalable world",
          "Gamification",
          "Events, rooms and missions",
          "Custom visual identity and architecture",
          "Ideal for brands wanting their own world",
        ],
        cta: "Contact",
      },
    ],
  },
  es: {
    plans: [
      {
        title: "Nivel 1",
        priceLabel: "Desde",
        features: [
          "Mini-universo navegable",
          "Conversión básica 2D → 3D",
          "Identidad visual adaptada",
          "Entrega rápida",
          "Ideal para probar el metaverso",
        ],
        cta: "Contactar",
      },
      {
        title: "Nivel 2",
        priceLabel: "Desde",
        features: [
          "Diseño 100% personalizado",
          "Narrativa + arte + interacción",
          "Integración multimedia",
          "Experiencia totalmente inmersiva",
          "Ideal para marcas que buscan diferenciación",
        ],
        cta: "Contactar",
      },
      {
        title: "Nivel 3",
        priceLabel: "Desde",
        features: [
          "Mundo persistente y escalable",
          "Gamificación",
          "Eventos, salas y misiones",
          "Identidad visual y arquitectura personalizadas",
          "Ideal para marcas que quieren su propio mundo",
        ],
        cta: "Contactar",
      },
    ],
  },
};

export function getPricingTranslations(locale: SupportedLocale): PricingTexts {
  return translations[locale] ?? translations.en;
}
