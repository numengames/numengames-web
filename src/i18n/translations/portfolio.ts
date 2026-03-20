import type { SupportedLocale } from "../index";

export interface PortfolioCardData {
  title: string;
  description: string;
  time: string;
  difficulty: string;
  type: string;
  loot: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  officialHref: string;
  officialLabel: string;
  pricingValue: string;
  scopeValue: string;
}

export interface PortfolioTexts {
  label: string;
  heading1: string;
  highlight: string;
  heading2: string;
  ui: {
    time: string;
    type: string;
    loot: string;
    official: string;
    difficulty: string;
    more: string;
    less: string;
    pricing: string;
    contact: string;
    startingAt: string;
    estimatedScope: string;
  };
  cards: PortfolioCardData[];
}

const translations: Record<SupportedLocale, PortfolioTexts> = {
  en: {
    label: "PORTFOLIO",
    heading1: "Dare to explore our",
    highlight: "experiences",
    heading2: "Just choose and click.",
    ui: {
      time: "Time",
      type: "Type",
      loot: "Loot",
      official: "Official",
      difficulty: "DIFFICULTY",
      more: "More",
      less: "Less",
      pricing: "Pricing",
      contact: "Contact",
      startingAt: "Starting at",
      estimatedScope: "Estimated scope",
    },
    cards: [
      {
        title: "AII SYMPOSIUM 2025",
        description:
          "The Active Inference Institute (AII) is an international organization dedicated to researching and advancing the framework of Active Inference, a scientific model that explains how intelligent systems — biological or artificial — perceive, act, and learn. Its annual Symposium brings together researchers and practitioners from around the world to share theoretical developments and practical applications. For the 2025 edition, Numen Games designed a gamified 3D environment that served as an immersive, fantastical setting for the event. Within this space, participants could access all Symposium information while engaging in an escape-room-style adventure that experientially introduced the core foundations of the Active Inference map: the four states of mind and their dynamic interrelations. An example of how complex knowledge can become a meaningful and immersive game experience.",
        time: "25'",
        difficulty: "+++++",
        type: "Conceptual Matching",
        loot: "Collectible and commemorative POAP",
        href: "https://pre.experience.numen.games/",
        imageSrc: "/assets/active_2.png",
        imageAlt: "AII Symposium 2025",
        officialHref: "https://www.activeinference.institute/symposium",
        officialLabel: "activeinference.institute/symposium",
        pricingValue: "18.000€",
        scopeValue: "6–8 weeks production",
      },
      {
        title: "NERDEARLA 2025",
        description:
          "Nerdearla is the largest free technology and digital culture event in the Spanish-speaking world. Founded in Argentina in 2014 as a gathering \"by nerds, for nerds,\" it has become a leading international reference point for talks, workshops, and community-driven activities around software development, infrastructure, AI, data science, design, and open-source culture — both onsite and via global streaming. For the Nerdearla 2025 edition, held in Madrid and streamed globally, Numen Games — in collaboration with Arcasiles, the event organizers — designed a 3D space conceived as a fantastical digital twin of the event. This environment allowed visitors to explore what Nerdearla is and discover its content, areas, and dynamics through an interactive format. Rather than functioning as a simple virtual and immersive replica, the space transformed the visit into a playable experience, integrating information, exploration, and game mechanics into a single immersive journey.",
        time: "12'",
        difficulty: "++",
        type: "Treasure Hunt",
        loot: "Collectible and commemorative POAP",
        href: "https://pre.multiplex.numinia.xyz/",
        imageSrc: "/assets/Nerdearla_1.png",
        imageAlt: "Nerdearla 2025",
        officialHref: "https://nerdearla.es/",
        officialLabel: "nerdearla.es",
        pricingValue: "9.000€",
        scopeValue: "3–5 weeks production",
      },
      {
        title: "MERGE 2025",
        description:
          "Merge is an international conference focused on Web3, blockchain, and digital assets that acts as a strategic bridge between the technological and financial ecosystems of Europe and Latin America. The event brings together startups, corporations, regulators, and investors to foster collaboration and drive development within the decentralized digital economy. For Merge 2025, Numen Games creates a digital twin of the event venue, enhanced with fantastical elements that symbolize this transatlantic encounter. The environment functions as an immersive virtual version of the event, offering structured access to information about sponsors and partners. It also incorporates an interactive enigma that allows visitors to understand what Merge represents and how it connects innovation, regulation, and technological development. The result is a digital experience that combines representation, symbolism, and gameplay, expanding the event into an immersive territory aligned with its international vocation.",
        time: "15'",
        difficulty: "+++",
        type: "Conceptual Matching",
        loot: "Collectible and commemorative POAP",
        href: "https://mmerge.numen.games/",
        imageSrc: "/assets/merge1.png",
        imageAlt: "Merge 2025",
        officialHref: "https://www.mmerge.io/es",
        officialLabel: "mmerge.io/es",
        pricingValue: "12.000€",
        scopeValue: "4–6 weeks production",
      },
      {
        title: "MYSTERY AT THE PRINTING HOUSE",
        description:
          "Public Domain is one of the core cultural principles that shape Numen Games' vision. Each January 1st, new works enter the public domain, marking an important milestone that we celebrate as an affirmation of open and shared knowledge — in coherence with our commitment to open-source code and public domain production. In 2026, Numen Games develops a 3D space that embodies this celebration through a playable adventure set in a fictional printing press that merges antiquity and futurism. Within this symbolic environment, players explore the history of Copyright and Public Domain through an interactive experience that transforms learning into exploration. The result is an immersive proposal that turns a cultural principle into a living experience, articulating historical memory, contemporary reflection, and gameplay mechanics within a single space.",
        time: "18'",
        difficulty: "***",
        type: "Cipher Decryption",
        loot: "Collectible and commemorative POAP",
        href: "https://pre.house-of-riddles.numinia.xyz/",
        imageSrc: "/assets/publicdo.png",
        imageAlt: "Mystery at the Printing House",
        officialHref: "https://www.pdinfo.com/",
        officialLabel: "pdinfo.com",
        pricingValue: "11.000€",
        scopeValue: "4–6 weeks production",
      },
      {
        title: "THE ADVENTURE OF CURIOSITY",
        description:
          "The Active Inference Institute (AII) is an international organization dedicated to researching and advancing the scientific framework of Active Inference, a model that explains how intelligent systems — biological or artificial — perceive, act, and learn by minimizing uncertainty through interaction with their environment. This approach integrates perception, action, and world into a single dynamic process of continuous inference. To represent Numen Games' collaboration with the AII, a 3D space is developed as a playable adventure designed to communicate this principle through direct experience. The proposal uses the perception of music as a guiding thread, creating an immersive journey that moves through the four states of the model — from internal brain states to the external world. The result is an environment that translates a complex scientific framework into an interactive experience, articulating conceptual rigor and gameplay mechanics within a coherent digital space.",
        time: "20'",
        difficulty: "++++",
        type: "Logic Problem",
        loot: "Collectible and commemorative POAP",
        href: "https://pre.lemuria-academy.numinia.xyz/",
        imageSrc: "/assets/active_1.png",
        imageAlt: "The Adventure of Curiosity",
        officialHref: "https://www.activeinference.institute/",
        officialLabel: "activeinference.institute",
        pricingValue: "15.000€",
        scopeValue: "5–7 weeks production",
      },
    ],
  },
  es: {
    label: "PORTFOLIO",
    heading1: "Atrévete a explorar nuestras",
    highlight: "experiencias",
    heading2: "Elige y haz clic.",
    ui: {
      time: "Tiempo",
      type: "Tipo",
      loot: "Recompensa",
      official: "Oficial",
      difficulty: "DIFICULTAD",
      more: "Más",
      less: "Menos",
      pricing: "Precio",
      contact: "Contactar",
      startingAt: "Desde",
      estimatedScope: "Alcance estimado",
    },
    cards: [
      {
        title: "AII SYMPOSIUM 2025",
        description:
          "El Active Inference Institute (AII) es una organización internacional dedicada a la investigación y el avance del marco de la Inferencia Activa, un modelo científico que explica cómo los sistemas inteligentes —biológicos o artificiales— perciben, actúan y aprenden. Su Simposio anual reúne a investigadores y profesionales de todo el mundo para compartir desarrollos teóricos y aplicaciones prácticas. Para la edición de 2025, Numen Games diseñó un entorno 3D gamificado que funcionó como escenario inmersivo y fantástico del evento. En este espacio, los participantes podían acceder a toda la información del Simposio mientras vivían una aventura tipo escape room que introducía experiencialmente los fundamentos del mapa de Inferencia Activa: los cuatro estados mentales y sus interrelaciones dinámicas. Un ejemplo de cómo el conocimiento complejo puede convertirse en una experiencia de juego significativa e inmersiva.",
        time: "25'",
        difficulty: "+++++",
        type: "Emparejamiento Conceptual",
        loot: "POAP coleccionable y conmemorativo",
        href: "https://pre.experience.numen.games/",
        imageSrc: "/assets/active_2.png",
        imageAlt: "AII Symposium 2025",
        officialHref: "https://www.activeinference.institute/symposium",
        officialLabel: "activeinference.institute/symposium",
        pricingValue: "18.000€",
        scopeValue: "6–8 semanas de producción",
      },
      {
        title: "NERDEARLA 2025",
        description:
          "Nerdearla es el evento de tecnología y cultura digital gratuito más grande del mundo hispanohablante. Fundado en Argentina en 2014 como un encuentro «de nerds, para nerds», se ha convertido en un referente internacional de charlas, talleres y actividades comunitarias sobre desarrollo de software, infraestructura, IA, ciencia de datos, diseño y cultura open source, tanto presencial como en streaming global. Para la edición de Nerdearla 2025, celebrada en Madrid y transmitida globalmente, Numen Games —en colaboración con Arcasiles, los organizadores del evento— diseñó un espacio 3D concebido como un gemelo digital fantástico del evento. Este entorno permitía a los visitantes explorar qué es Nerdearla y descubrir su contenido, áreas y dinámicas a través de un formato interactivo. Lejos de ser una simple réplica virtual e inmersiva, el espacio transformó la visita en una experiencia jugable, integrando información, exploración y mecánicas de juego en un único viaje inmersivo.",
        time: "12'",
        difficulty: "++",
        type: "Búsqueda del Tesoro",
        loot: "POAP coleccionable y conmemorativo",
        href: "https://pre.multiplex.numinia.xyz/",
        imageSrc: "/assets/Nerdearla_1.png",
        imageAlt: "Nerdearla 2025",
        officialHref: "https://nerdearla.es/",
        officialLabel: "nerdearla.es",
        pricingValue: "9.000€",
        scopeValue: "3–5 semanas de producción",
      },
      {
        title: "MERGE 2025",
        description:
          "Merge es una conferencia internacional centrada en Web3, blockchain y activos digitales que actúa como puente estratégico entre los ecosistemas tecnológicos y financieros de Europa y América Latina. El evento reúne a startups, corporaciones, reguladores e inversores para fomentar la colaboración y el desarrollo dentro de la economía digital descentralizada. Para Merge 2025, Numen Games crea un gemelo digital del recinto del evento, enriquecido con elementos fantásticos que simbolizan este encuentro transatlántico. El entorno funciona como una versión virtual e inmersiva del evento, ofreciendo acceso estructurado a la información de patrocinadores y socios. También incorpora un enigma interactivo que permite a los visitantes comprender qué representa Merge y cómo conecta innovación, regulación y desarrollo tecnológico. El resultado es una experiencia digital que combina representación, simbolismo y gameplay, expandiendo el evento hacia un territorio inmersivo alineado con su vocación internacional.",
        time: "15'",
        difficulty: "+++",
        type: "Emparejamiento Conceptual",
        loot: "POAP coleccionable y conmemorativo",
        href: "https://mmerge.numen.games/",
        imageSrc: "/assets/merge1.png",
        imageAlt: "Merge 2025",
        officialHref: "https://www.mmerge.io/es",
        officialLabel: "mmerge.io/es",
        pricingValue: "12.000€",
        scopeValue: "4–6 semanas de producción",
      },
      {
        title: "MISTERIO EN LA IMPRENTA",
        description:
          "El Dominio Público es uno de los principios culturales centrales que dan forma a la visión de Numen Games. Cada 1 de enero, nuevas obras pasan al dominio público, marcando un hito importante que celebramos como afirmación del conocimiento abierto y compartido, en coherencia con nuestro compromiso con el código open source y la producción en dominio público. En 2026, Numen Games desarrolla un espacio 3D que encarna esta celebración a través de una aventura jugable ambientada en una imprenta ficticia que fusiona antigüedad y futurismo. En este entorno simbólico, los jugadores exploran la historia del Copyright y el Dominio Público a través de una experiencia interactiva que transforma el aprendizaje en exploración. El resultado es una propuesta inmersiva que convierte un principio cultural en una experiencia viva, articulando memoria histórica, reflexión contemporánea y mecánicas de juego en un único espacio.",
        time: "18'",
        difficulty: "***",
        type: "Descifrado de Códigos",
        loot: "POAP coleccionable y conmemorativo",
        href: "https://pre.house-of-riddles.numinia.xyz/",
        imageSrc: "/assets/publicdo.png",
        imageAlt: "Misterio en la Imprenta",
        officialHref: "https://www.pdinfo.com/",
        officialLabel: "pdinfo.com",
        pricingValue: "11.000€",
        scopeValue: "4–6 semanas de producción",
      },
      {
        title: "LA AVENTURA DE LA CURIOSIDAD",
        description:
          "El Active Inference Institute (AII) es una organización internacional dedicada a la investigación y el avance del marco científico de la Inferencia Activa, un modelo que explica cómo los sistemas inteligentes —biológicos o artificiales— perciben, actúan y aprenden minimizando la incertidumbre a través de la interacción con su entorno. Este enfoque integra percepción, acción y mundo en un único proceso dinámico de inferencia continua. Para representar la colaboración de Numen Games con el AII, se desarrolla un espacio 3D como una aventura jugable diseñada para comunicar este principio mediante la experiencia directa. La propuesta utiliza la percepción de la música como hilo conductor, creando un viaje inmersivo que recorre los cuatro estados del modelo, desde los estados cerebrales internos hasta el mundo exterior. El resultado es un entorno que traduce un marco científico complejo en una experiencia interactiva, articulando rigor conceptual y mecánicas de juego en un espacio digital coherente.",
        time: "20'",
        difficulty: "++++",
        type: "Problema Lógico",
        loot: "POAP coleccionable y conmemorativo",
        href: "https://pre.lemuria-academy.numinia.xyz/",
        imageSrc: "/assets/active_1.png",
        imageAlt: "La Aventura de la Curiosidad",
        officialHref: "https://www.activeinference.institute/",
        officialLabel: "activeinference.institute",
        pricingValue: "15.000€",
        scopeValue: "5–7 semanas de producción",
      },
    ],
  },
};

export function getPortfolioTranslations(locale: SupportedLocale): PortfolioTexts {
  return translations[locale] ?? translations.en;
}
