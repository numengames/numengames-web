import type { SupportedLocale } from "../index";
import type { HeroTexts } from "../../types/i18n/hero";

// Define translations for Hero section
const translations: Record<SupportedLocale, HeroTexts> = {
  en: {
    title: {
      highlight1: "Boost",
      highlight2: "Engage",
      text1: "through gamified",
      highlight3: "training experiences",
      text2: "3D internet"
    },
    paragraph: {
      desktop: "Delivered directly through the browser to your PC, smartphone or VR headset no installation required. With integrated AI, text and voice chat and narrative-driven design, it turns into living simulators where people interact, make decisions and learn through story.",
      mobile: "Delivered directly through the browser to your PC, smartphone or VR headset no installation required. With integrated AI, text and voice chat and narrative-driven design, it turns into living simulators where people interact, make decisions and learn through story."
    },
    technologies: "THREE.JS, WEB3, DIGITAL AGENTS, 3D INTERNET, BLOCKCHAIN, VIRTUAL REALITY, AUGMENTED REALITY",
    cta: "Ready to Talk",
    mobileTagline: "Boost team skills with immersive 3D gamified experience"
  },
  es: {
    title: {
      highlight1: "Potencia",
      highlight2: "el Crecimiento",
      text1: "a través de",
      highlight3: "experiencias 3D",
      text2: "de aprendizaje gamificado"
    },
    paragraph: {
      desktop: "Creamos experiencias inmersivas y escalables de aprendizaje y capacitación que impulsan la eficiencia, mejoran los resultados y amplifican la participación de los interesados. Todo cobra vida en entornos 3D dinámicos.",
      mobile: "No solo creamos entornos 3D; construimos experiencias inmersivas y escalables de aprendizaje y capacitación que ayudan a las organizaciones a mejorar la eficiencia, los resultados y la participación de los interesados."
    },
    technologies: "THREE.JS, WEB3, AGENTES DIGITALES, INTERNET 3D, BLOCKCHAIN, REALIDAD VIRTUAL, REALIDAD AUMENTADA",
    cta: "Hablemos",
    mobileTagline: "Potencia las habilidades de tu equipo con experiencias 3D inmersivas"
  }
};

export function getHeroTranslations(locale: SupportedLocale): HeroTexts {
  return translations[locale];
}
