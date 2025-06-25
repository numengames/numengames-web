import type { SupportedLocale } from "../index";
import type { HeroTexts } from "../../types/i18n/hero";

// Define translations for Hero section
const translations: Record<SupportedLocale, HeroTexts> = {
  en: {
    title: {
      highlight1: "Boost",
      highlight2: "Growth",
      text1: "through interactive",
      highlight3: "immersive 3D",
      text2: "gamified learning"
    },
    paragraph: {
      desktop: "We craft immersive, scalable learning and training experiences that drive efficiency, enhance outcomes and amplify stakeholder engagement. All brought to life in dynamic 3D environments.",
      mobile: "We don't just create 3D environments; we build immersive, scalable learning and training experiences that help organizations improve efficiency, outcomes, and stakeholder engagement."
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