// Diccionario de contenidos del sitio (borrador de reconstrucción).
// Fuente: plan "Numen Games | Plan profesional de web revisado" (2026-09-09).
// El español es el idioma de referencia (contenido completo, ver plan §8);
// el inglés replica las mismas afirmaciones y profundidad y está pendiente
// de revisión nativa antes de publicar — ver docs/BACKLOG.md.
import type { SupportedLocale } from "@lib/locale";

export interface NavLink {
	label: string;
	path: string;
}

export interface SiteDictionary {
	nav: {
		links: NavLink[];
		ctaPersistent: string;
	};
	home: {
		eyebrow: string;
		title: string;
		lead: string;
		ctaPrimary: string;
		ctaSecondary: string;
		supportLine: string;
		bloque2: {
			title: string;
			body: string;
			sequence: string[];
			sequenceNote: string;
		};
		momentos: {
			title: string;
			rows: { momento: string; contenido: string; base: string }[];
			closingNote: string;
		};
		entregables: {
			title: string;
			items: { name: string; description: string }[];
			scopeNote: string;
		};
		valor: {
			title: string;
			audiencias: { label: string; body: string }[];
			note: string;
		};
		evidencia: {
			title: string;
			lead: string;
			proyectos: {
				slug: string;
				nombre: string;
				contexto: string;
				queHicimos: string;
				formato: string;
				duracion: string;
				enlace: string;
				enlaceLabel: string;
			}[];
			note: string;
		};
		filosofia: {
			quote: string;
			canonQuote: string;
			note: string;
		};
		closing: {
			title: string;
			body: string;
			cta: string;
		};
	};
	footer: {
		tagline: string;
		contactEmail: string;
		navigation: string;
		legal: string;
		social: string;
		legalTerms: string;
		legalPrivacy: string;
		licence: string;
		licenceTitle: string;
		telemetry: string;
		telemetryTitle: string;
		versionTitle: string;
		commitTitle: string;
	};
	legal: {
		scopeNote: string;
		onlyInEnglish: string;
		versionLabel: string;
		updatedLabel: string;
		back: string;
	};
	experiencias: {
		title: string;
		lead: string;
		objetivos: { title: string; body: string }[];
		alcanceTitle: string;
		alcanceBody: string;
		soportesTitle: string;
		soportes: string[];
		equipoTitle: string;
		equipoBody: string;
		condicionesTitle: string;
		condicionesBody: string;
		ctaTitle: string;
		cta: string;
	};
	comoTrabajamos: {
		title: string;
		lead: string;
		fases: { title: string; body: string; responsabilidad: string }[];
		validacionTitle: string;
		validacionBody: string;
		cta: string;
	};
	numen: {
		title: string;
		lead: string;
		filosofiaTitle: string;
		filosofiaBody: string;
		colaboracionTitle: string;
		colaboracionBody: string;
		cta: string;
	};
	contact: {
		title: string;
		lead: string;
		fields: {
			name: string;
			email: string;
			org: string;
			goal: string;
			dateOptional: string;
			cityOptional: string;
			sizeOptional: string;
			phoneOptional: string;
		};
		submit: string;
		sending: string;
		success: string;
		error: string;
		emailAlt: string;
	};
}

const es: SiteDictionary = {
	nav: {
		links: [
			{ label: "Inicio", path: "/" },
			{ label: "Experiencias para eventos", path: "/experiencias" },
			{ label: "Cómo trabajamos", path: "/como-trabajamos" },
			{ label: "Numen", path: "/numen" },
		],
		ctaPersistent: "Cuéntanos tu evento",
	},
	home: {
		eyebrow: "Diseño de experiencias participativas",
		title: "Que tu evento deje algo más que buenos recuerdos.",
		lead: "Convertimos a los asistentes en participantes mediante narrativa, dinámicas de juego y acompañamiento en vivo. Diseñamos la experiencia a medida y transformamos lo que genera en conexiones, mapas y conocimiento que tu organización puede seguir utilizando.",
		ctaPrimary: "Cuéntanos tu evento",
		ctaSecondary: "Así funciona",
		supportLine: "Diseño a medida. Ejecución en vivo. Entregables después del evento.",
		bloque2: {
			title: "No añadimos un juego al programa. Diseñamos cómo participa la gente.",
			body: "Cada experiencia conecta un objetivo del organizador con una forma concreta de participar: aportar una perspectiva, encontrar a alguien con quien construir, contrastar una idea o resolver un reto. La narrativa da sentido al recorrido; nuestro equipo ayuda a que suceda.",
			sequence: ["Reto compartido", "Participación guiada", "Aportaciones", "Conocimiento conservado"],
			sequenceNote: "Es una simplificación explicativa para la web, no una sustitución del flujo completo de la propuesta.",
		},
		momentos: {
			title: "Antes, durante y después",
			rows: [
				{
					momento: "Antes",
					contenido: "Objetivo, diseño narrativo y de dinámicas, preparación de soportes y entorno previo cuando forme parte del alcance.",
					base: "Documento maestro, kit de producción y espacio digital.",
				},
				{
					momento: "Durante",
					contenido: "Personas participando, puntos de interacción y equipo que facilita, orienta y coordina.",
					base: "Roles y territorios, equipo y materialización.",
				},
				{
					momento: "Después",
					contenido: "Mapa del evento, informe, piezas editoriales y obras visuales, según el alcance contratado.",
					base: "Cuatro familias de entregables.",
				},
			],
			closingNote: "Numen no solo plantea una idea ni entrega un informe: diseña un sistema de participación, lo acompaña en vivo y da forma a lo que produce.",
		},
		entregables: {
			title: "La experiencia pasa. El conocimiento no tiene por qué perderse.",
			items: [
				{ name: "Mapa del Evento", description: "Un mapa de relaciones e intereses construido a partir de las aportaciones de los participantes." },
				{ name: "Informe de inteligencia", description: "Una lectura de lo que la comunidad del evento sabe, necesita y produce." },
				{ name: "Opúsculos", description: "Piezas editoriales breves que desarrollan el conocimiento generado." },
				{ name: "Obras visuales", description: "Materiales visuales derivados de la experiencia, listos para compartir o exponer." },
			],
			scopeNote: "No todos los entregables aparecen automáticamente en todos los proyectos: el alcance se acuerda con cada organización.",
		},
		valor: {
			title: "Valor para tres participantes de la compra",
			audiencias: [
				{ label: "Para quienes asisten", body: "Oportunidades de participar y conectar alrededor de intereses y retos compartidos." },
				{ label: "Para el organizador", body: "Una lectura de lo que su comunidad sabe, necesita y produce." },
				{ label: "Para patrocinadores y colaboradores", body: "Participación con sentido y evidencias de la experiencia, según lo acordado." },
			],
			note: "Esto no es una garantía de ventas ni una autorización para entregar datos personales de asistentes a terceros.",
		},
		evidencia: {
			title: "Dónde lo hemos hecho",
			lead: "Cinco experiencias diseñadas para eventos reales, con sus organizadores y su público.",
			proyectos: [
				{
					slug: "nerdearla",
					nombre: "Nerdearla 2025",
					contexto: "El mayor evento gratuito de tecnología y cultura digital del mundo hispanohablante, celebrado en Madrid y retransmitido globalmente.",
					queHicimos: "Con Arcasiles, los organizadores, diseñamos un espacio jugable que permitía recorrer el evento —sus áreas, sus contenidos y sus dinámicas— en un único trayecto que integraba información, exploración y juego.",
					formato: "Búsqueda del tesoro",
					duracion: "12 min",
					enlace: "https://nerdearla.es",
					enlaceLabel: "nerdearla.es",
				},
				{
					slug: "aii-symposium",
					nombre: "AII Symposium 2025",
					contexto: "El simposio anual del Active Inference Institute, que reúne a investigadores de todo el mundo en torno a un marco científico sobre cómo los sistemas inteligentes perciben, actúan y aprenden.",
					queHicimos: "Diseñamos un entorno donde los asistentes accedían a toda la información del simposio mientras recorrían una aventura de tipo escape room que introducía por experiencia los fundamentos del mapa de Active Inference: los cuatro estados y sus relaciones.",
					formato: "Emparejamiento conceptual",
					duracion: "25 min",
					enlace: "https://activeinference.institute/symposium",
					enlaceLabel: "activeinference.institute",
				},
				{
					slug: "merge",
					nombre: "Merge 2025",
					contexto: "Conferencia internacional sobre Web3 y activos digitales que actúa como puente entre los ecosistemas tecnológicos y financieros de Europa y Latinoamérica.",
					queHicimos: "Construimos un gemelo digital de la sede con elementos que simbolizan ese encuentro transatlántico, con acceso ordenado a la información de patrocinadores y socios y un enigma interactivo sobre qué representa Merge.",
					formato: "Emparejamiento conceptual",
					duracion: "15 min",
					enlace: "https://mmerge.io/es",
					enlaceLabel: "mmerge.io",
				},
				{
					slug: "dominio-publico",
					nombre: "Misterio en la imprenta",
					contexto: "Cada 1 de enero nuevas obras entran en dominio público. Lo celebramos porque es coherente con nuestro compromiso con el código abierto y la producción en dominio público.",
					queHicimos: "Una aventura jugable ambientada en una imprenta ficticia que mezcla lo antiguo y lo futurista, donde se recorre la historia del copyright y el dominio público explorando en lugar de leyendo.",
					formato: "Descifrado de claves",
					duracion: "18 min",
					enlace: "https://pdinfo.com",
					enlaceLabel: "pdinfo.com",
				},
				{
					slug: "curiosidad",
					nombre: "La aventura de la curiosidad",
					contexto: "Colaboración con el Active Inference Institute para comunicar por experiencia directa cómo los sistemas inteligentes reducen incertidumbre al interactuar con su entorno.",
					queHicimos: "Un recorrido que usa la percepción de la música como hilo conductor para atravesar los cuatro estados del modelo, desde los estados internos del cerebro hasta el mundo exterior.",
					formato: "Problema de lógica",
					duracion: "20 min",
					enlace: "https://activeinference.institute",
					enlaceLabel: "activeinference.institute",
				},
			],
			note: "Cada experiencia entrega a quien participa un objeto digital coleccionable y conmemorativo del evento.",
		},
		filosofia: {
			quote: "El juego nos interesa por lo que permite hacer juntos. La narrativa da sentido a la participación. Y la tecnología debe ayudar a conservar lo que una comunidad descubre, sin quitarle el protagonismo.",
			canonQuote: "Diseñamos sistemas, no decoramos eventos.",
			note: "Texto editorial pendiente de validación del equipo.",
		},
		closing: {
			title: "¿Qué te gustaría que ocurriera entre las personas de tu evento?",
			body: "Cuéntanos a quién reúnes, qué buscas y cuándo sucede. Empezamos por entender el encaje.",
			cta: "Cuéntanos tu evento",
		},
	},
	experiencias: {
		title: "Experiencias para eventos",
		lead: "Diseñamos y ejecutamos experiencias participativas para encuentros profesionales: narrativa, mecánicas de juego, facilitación humana y entregables posteriores.",
		objetivos: [
			{
				title: "Qué puedo encargar",
				body: "Un sistema de participación diseñado para tu evento: un reto compartido que conecta a tu comunidad, una forma guiada de aportar, y un conjunto de materiales que quedan después.",
			},
			{
				title: "Alcance adaptable",
				body: "El diseño se ajusta al tamaño, formato y objetivo de cada encuentro. No hay un paquete único: cada propuesta parte de entender a quién reúnes y qué buscas conseguir.",
			},
		],
		alcanceTitle: "Papel del equipo",
		alcanceBody: "Diseñamos la narrativa y las dinámicas, preparamos los soportes necesarios, y facilitamos la experiencia en vivo durante el evento: guiamos, orientamos y coordinamos la participación.",
		soportesTitle: "Soportes",
		soportes: [
			"Documento maestro de la experiencia",
			"Kit de producción",
			"Espacio digital de apoyo cuando forme parte del alcance",
		],
		equipoTitle: "Entregables",
		equipoBody: "Según el alcance contratado: un mapa del evento, un informe de inteligencia, opúsculos (piezas editoriales breves) y obras visuales derivadas de la experiencia.",
		condicionesTitle: "Condiciones por definir",
		condicionesBody: "Precio, plazos y alcance exacto se acuerdan encargo por encargo, en conversación directa con tu equipo. Esta página no sustituye esa conversación.",
		ctaTitle: "¿Hablamos de tu encargo?",
		cta: "Hablar del encargo",
	},
	comoTrabajamos: {
		title: "Cómo trabajamos",
		lead: "Antes, durante y después: así llevamos una experiencia desde el primer encaje hasta los materiales que tu organización conserva.",
		fases: [
			{
				title: "Antes",
				body: "Definimos el objetivo, diseñamos la narrativa y las dinámicas, y preparamos los soportes y el entorno previo cuando forman parte del alcance acordado.",
				responsabilidad: "Numen diseña; tu equipo valida el encaje con el objetivo real del evento.",
			},
			{
				title: "Durante",
				body: "Facilitamos la experiencia en vivo: guiamos la participación, coordinamos los puntos de interacción y acompañamos a tu equipo durante el evento.",
				responsabilidad: "Numen coordina en el terreno; tu equipo mantiene la relación con sus asistentes.",
			},
			{
				title: "Después",
				body: "Entregamos los materiales acordados — mapa del evento, informe, opúsculos u obras visuales — y revisamos contigo qué aprendizajes quedan disponibles para seguir usando.",
				responsabilidad: "Numen entrega y explica; tu equipo decide cómo y con quién comparte los resultados.",
			},
		],
		validacionTitle: "Puntos de validación",
		validacionBody: "En cada fase hay un punto explícito de acuerdo contigo antes de avanzar: el diseño, la logística del día, y el alcance final de los entregables. Nada se da por asumido sin confirmación.",
		cta: "Valorar el encaje",
	},
	numen: {
		title: "Numen",
		lead: "Diseñamos sistemas de participación, no decoramos eventos con un juego añadido.",
		filosofiaTitle: "Cómo pensamos",
		filosofiaBody: "El juego nos interesa por lo que permite hacer juntos. La narrativa da sentido a la participación. Y la tecnología debe ayudar a conservar lo que una comunidad descubre, sin quitarle el protagonismo.",
		colaboracionTitle: "Cómo colaboramos",
		colaboracionBody: "Trabajamos en conversación directa con quien decide la experiencia, el programa o la producción de tu encuentro. Empezamos por entender el objetivo antes de proponer una forma de conseguirlo.",
		cta: "Conocer al equipo y conversar",
	},
	footer: {
		tagline: "Diseño de experiencias participativas para eventos.",
		contactEmail: "hola@numen.games",
		navigation: "Navegación",
		legal: "Legal",
		social: "Social",
		legalTerms: "Términos y condiciones",
		legalPrivacy: "Política de privacidad",
		licence: "Abierto por licencia, por fichero",
		licenceTitle: "Código AGPL-3.0 · assets CC0 · documentación CC-BY-4.0 · marca reservada. El mapa por ruta está en REUSE.toml",
		telemetry: "Telemetría",
		telemetryTitle: "Medidas de este sitio — pendiente de publicar",
		versionTitle: "Ver el registro de cambios",
		commitTitle: "Ver este commit en GitHub",
	},
	legal: {
		scopeNote:
			"Texto maestro mantenido en el archivo numinia-nwos (operations/). Se publica tal cual, con sus notas de revisión abiertas; cualquier corrección se hace en el maestro, nunca aquí.",
		onlyInEnglish: "Este documento solo existe en inglés: la versión en inglés es la vinculante.",
		versionLabel: "Versión",
		updatedLabel: "Actualizado",
		back: "Volver al inicio",
	},
	contact: {
		title: "Cuéntanos tu evento",
		lead: "Cuéntanos a quién reúnes, qué buscas y cuándo sucede. Empezamos por entender el encaje.",
		fields: {
			name: "Nombre",
			email: "Email profesional",
			org: "Organización o evento",
			goal: "¿Qué buscas conseguir?",
			dateOptional: "Fecha (opcional)",
			cityOptional: "Ciudad (opcional)",
			sizeOptional: "Tamaño aproximado (opcional)",
			phoneOptional: "Teléfono (opcional)",
		},
		submit: "Enviar consulta",
		sending: "Enviando…",
		success: "Gracias. Hemos recibido tu consulta y te responderemos en cuanto podamos.",
		error: "No hemos podido enviar el formulario. Escríbenos directamente por correo.",
		emailAlt: "También puedes escribirnos directamente a",
	},
};

const en: SiteDictionary = {
	nav: {
		links: [
			{ label: "Home", path: "/" },
			{ label: "Event experiences", path: "/experiencias" },
			{ label: "How we work", path: "/como-trabajamos" },
			{ label: "Numen", path: "/numen" },
		],
		ctaPersistent: "Tell us about your event",
	},
	home: {
		eyebrow: "Participatory experience design",
		title: "Let your event leave more than good memories.",
		lead: "We turn attendees into participants through narrative, game mechanics, and live facilitation. We design the experience around your event and turn what it generates into connections, maps, and knowledge your organization can keep using.",
		ctaPrimary: "Tell us about your event",
		ctaSecondary: "How it works",
		supportLine: "Custom design. Live delivery. Deliverables after the event.",
		bloque2: {
			title: "We don't add a game to the agenda. We design how people take part.",
			body: "Every experience connects an organizer's goal with a concrete way to participate: contributing a perspective, finding someone to build with, testing an idea, or solving a challenge. The narrative gives the journey meaning; our team helps it happen.",
			sequence: ["Shared challenge", "Guided participation", "Contributions", "Knowledge kept"],
			sequenceNote: "This is a simplified explanation for the website, not a replacement for the full flow described in the proposal.",
		},
		momentos: {
			title: "Before, during, and after",
			rows: [
				{
					momento: "Before",
					contenido: "Goal, narrative and mechanics design, preparation of materials and prior environment when part of the scope.",
					base: "Master document, production kit, and digital space.",
				},
				{
					momento: "During",
					contenido: "People participating, interaction points, and a team that facilitates, guides, and coordinates.",
					base: "Roles and territories, team, and delivery.",
				},
				{
					momento: "After",
					contenido: "Event map, report, editorial pieces, and visual works, according to the contracted scope.",
					base: "Four families of deliverables.",
				},
			],
			closingNote: "Numen doesn't just propose an idea or hand over a report: we design a participation system, run it live, and shape what it produces.",
		},
		entregables: {
			title: "The experience ends. The knowledge doesn't have to.",
			items: [
				{ name: "Event Map", description: "A map of relationships and interests built from participants' contributions." },
				{ name: "Intelligence report", description: "A reading of what the event's community knows, needs, and produces." },
				{ name: "Opúsculos (booklets)", description: "Short editorial pieces that develop the knowledge generated." },
				{ name: "Visual works", description: "Visual materials derived from the experience, ready to share or display." },
			],
			scopeNote: "Not every deliverable is automatically included in every project: scope is agreed with each organization.",
		},
		valor: {
			title: "Value for three parties in the decision",
			audiencias: [
				{ label: "For attendees", body: "Opportunities to participate and connect around shared interests and challenges." },
				{ label: "For the organizer", body: "A reading of what their community knows, needs, and produces." },
				{ label: "For sponsors and partners", body: "Meaningful participation and evidence of the experience, as agreed." },
			],
			note: "This is not a sales guarantee nor authorization to hand attendees' personal data to third parties.",
		},
		evidencia: {
			title: "Where we have done it",
			lead: "Five experiences designed for real events, with their organizers and their audiences.",
			proyectos: [
				{
					slug: "nerdearla",
					nombre: "Nerdearla 2025",
					contexto: "The largest free technology and digital culture event in the Spanish-speaking world, held in Madrid and streamed globally.",
					queHicimos: "With Arcasiles, the organizers, we designed a playable space that let visitors move through the event —its areas, its content and its dynamics— in a single journey combining information, exploration and play.",
					formato: "Treasure hunt",
					duracion: "12 min",
					enlace: "https://nerdearla.es",
					enlaceLabel: "nerdearla.es",
				},
				{
					slug: "aii-symposium",
					nombre: "AII Symposium 2025",
					contexto: "The annual symposium of the Active Inference Institute, bringing together researchers worldwide around a scientific framework for how intelligent systems perceive, act and learn.",
					queHicimos: "We designed an environment where attendees reached all symposium information while moving through an escape-room adventure that introduced the foundations of the Active Inference map by experience: the four states and their relations.",
					formato: "Conceptual matching",
					duracion: "25 min",
					enlace: "https://activeinference.institute/symposium",
					enlaceLabel: "activeinference.institute",
				},
				{
					slug: "merge",
					nombre: "Merge 2025",
					contexto: "An international conference on Web3 and digital assets acting as a bridge between the technological and financial ecosystems of Europe and Latin America.",
					queHicimos: "We built a digital twin of the venue with elements symbolising that transatlantic encounter, offering structured access to sponsor and partner information and an interactive puzzle about what Merge represents.",
					formato: "Conceptual matching",
					duracion: "15 min",
					enlace: "https://mmerge.io/es",
					enlaceLabel: "mmerge.io",
				},
				{
					slug: "dominio-publico",
					nombre: "Mystery at the printing house",
					contexto: "Every January 1st new works enter the public domain. We celebrate it because it is coherent with our commitment to open-source code and public domain production.",
					queHicimos: "A playable adventure set in a fictional printing press mixing the antique and the futuristic, where the history of copyright and the public domain is covered by exploring rather than reading.",
					formato: "Cipher decryption",
					duracion: "18 min",
					enlace: "https://pdinfo.com",
					enlaceLabel: "pdinfo.com",
				},
				{
					slug: "curiosidad",
					nombre: "The adventure of curiosity",
					contexto: "A collaboration with the Active Inference Institute to communicate through direct experience how intelligent systems reduce uncertainty by interacting with their environment.",
					queHicimos: "A journey using the perception of music as its guiding thread to move through the four states of the model, from internal brain states to the external world.",
					formato: "Logic problem",
					duracion: "20 min",
					enlace: "https://activeinference.institute",
					enlaceLabel: "activeinference.institute",
				},
			],
			note: "Each experience gives participants a collectible digital object commemorating the event.",
		},
		filosofia: {
			quote: "We care about games for what they let us do together. Narrative gives participation meaning. And technology should help preserve what a community discovers, without taking the spotlight from it.",
			canonQuote: "We design systems, we don't decorate events.",
			note: "Editorial copy pending team validation.",
		},
		closing: {
			title: "What would you like to happen between the people at your event?",
			body: "Tell us who you're bringing together, what you're looking for, and when it happens. We start by understanding the fit.",
			cta: "Tell us about your event",
		},
	},
	experiencias: {
		title: "Event experiences",
		lead: "We design and run participatory experiences for professional gatherings: narrative, game mechanics, human facilitation, and deliverables after the event.",
		objetivos: [
			{
				title: "What you can commission",
				body: "A participation system designed for your event: a shared challenge that connects your community, a guided way to contribute, and a set of materials that remain afterward.",
			},
			{
				title: "Adaptable scope",
				body: "The design adapts to the size, format, and goal of each gathering. There's no single package: every proposal starts by understanding who you're bringing together and what you're trying to achieve.",
			},
		],
		alcanceTitle: "The team's role",
		alcanceBody: "We design the narrative and mechanics, prepare the necessary materials, and facilitate the experience live during the event: guiding, directing, and coordinating participation.",
		soportesTitle: "Materials",
		soportes: [
			"Master document for the experience",
			"Production kit",
			"Supporting digital space when part of the scope",
		],
		equipoTitle: "Deliverables",
		equipoBody: "Depending on the contracted scope: an event map, an intelligence report, opúsculos (short editorial pieces), and visual works derived from the experience.",
		condicionesTitle: "Conditions to be defined",
		condicionesBody: "Price, timelines, and exact scope are agreed on a project-by-project basis, in direct conversation with your team. This page doesn't replace that conversation.",
		ctaTitle: "Shall we talk about your project?",
		cta: "Talk about your project",
	},
	comoTrabajamos: {
		title: "How we work",
		lead: "Before, during, and after: this is how we take an experience from the first fit conversation to the materials your organization keeps.",
		fases: [
			{
				title: "Before",
				body: "We define the goal, design the narrative and mechanics, and prepare materials and the prior environment when part of the agreed scope.",
				responsabilidad: "Numen designs; your team validates the fit with the event's actual goal.",
			},
			{
				title: "During",
				body: "We facilitate the experience live: guiding participation, coordinating interaction points, and supporting your team throughout the event.",
				responsabilidad: "Numen coordinates on the ground; your team keeps the relationship with its attendees.",
			},
			{
				title: "After",
				body: "We deliver the agreed materials — event map, report, opúsculos, or visual works — and review with you what learnings remain available to keep using.",
				responsabilidad: "Numen delivers and explains; your team decides how and with whom to share the results.",
			},
		],
		validacionTitle: "Validation points",
		validacionBody: "At every phase there's an explicit point of agreement with you before moving forward: the design, the day's logistics, and the final scope of deliverables. Nothing is assumed without confirmation.",
		cta: "Assess the fit",
	},
	numen: {
		title: "Numen",
		lead: "We design participation systems, we don't decorate events with an added game.",
		filosofiaTitle: "How we think",
		filosofiaBody: "We care about games for what they let us do together. Narrative gives participation meaning. And technology should help preserve what a community discovers, without taking the spotlight from it.",
		colaboracionTitle: "How we collaborate",
		colaboracionBody: "We work in direct conversation with whoever decides the experience, program, or production of your gathering. We start by understanding the goal before proposing a way to achieve it.",
		cta: "Meet the team and talk",
	},
	footer: {
		tagline: "Participatory experience design for events.",
		contactEmail: "hola@numen.games",
		navigation: "Navigation",
		legal: "Legal",
		social: "Social",
		legalTerms: "Terms and conditions",
		legalPrivacy: "Privacy policy",
		licence: "Open by licence, per file",
		licenceTitle: "Code AGPL-3.0 · assets CC0 · documentation CC-BY-4.0 · brand reserved. The per-path map is REUSE.toml",
		telemetry: "Telemetry",
		telemetryTitle: "Measurements of this site — not yet published",
		versionTitle: "See the changelog",
		commitTitle: "See this commit on GitHub",
	},
	legal: {
		scopeNote:
			"Master text kept in the numinia-nwos archive (operations/). Published verbatim, review flags still open; corrections go to the master, never here.",
		onlyInEnglish: "This document exists only in English: the English text is the binding one.",
		versionLabel: "Version",
		updatedLabel: "Updated",
		back: "Back to home",
	},
	contact: {
		title: "Tell us about your event",
		lead: "Tell us who you're bringing together, what you're looking for, and when it happens. We start by understanding the fit.",
		fields: {
			name: "Name",
			email: "Work email",
			org: "Organization or event",
			goal: "What are you trying to achieve?",
			dateOptional: "Date (optional)",
			cityOptional: "City (optional)",
			sizeOptional: "Approximate size (optional)",
			phoneOptional: "Phone (optional)",
		},
		submit: "Send inquiry",
		sending: "Sending…",
		success: "Thanks. We've received your inquiry and will get back to you as soon as we can.",
		error: "We couldn't submit the form. Please email us directly instead.",
		emailAlt: "You can also email us directly at",
	},
};

export const dictionaries: Record<SupportedLocale, SiteDictionary> = { es, en };

export function getDictionary(locale: SupportedLocale): SiteDictionary {
	return dictionaries[locale];
}
