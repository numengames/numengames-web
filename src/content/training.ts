// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: AGPL-3.0-only
//
// numen.games/formacion — la puerta de Formación. Página de venta con la
// misma forma que /hosting. Todo lo que dice sale de la ficha de la oferta
// en el archivo (numinia-archive operations/OPS-012, Training — the offer):
// qué se entrega, cómo se mide el aprendizaje, los dos casos y el precio
// «según propuesta». Los clientes no se nombran sin su permiso por escrito.
import type { SupportedLocale } from "@lib/locale";
import type { RequestFormData } from "@components/site/RequestForm.astro";

export interface TrainingPage {
	eyebrow: string;
	title: string;
	lead: string;
	ctaPrimary: string;
	ctaSecondary: string;
	facts: { value: string; label: string }[];
	whatTitle: string;
	whatBody: string;
	forTitle: string;
	forItems: string[];
	deliveredTitle: string;
	delivered: { title: string; body: string }[];
	levelsTitle: string;
	levelsLead: string;
	levelsHead: [string, string, string];
	levels: { level: string; question: string; example: string }[];
	casesTitle: string;
	cases: { title: string; rehearsed: string; learners: string; judged: string }[];
	casesLabels: { rehearsed: string; learners: string; judged: string };
	casesNote: string;
	flowTitle: string;
	flowLead: string;
	flow: { title: string; body: string; who: string; when: string }[];
	priceNote: string;
	faqTitle: string;
	faq: { q: string; a: string }[];
	form: RequestFormData;
}

const es: TrainingPage = {
	eyebrow: "Formación",
	title: "Que tu equipo ensaye antes del día que cuenta.",
	lead: "Construimos, con el procedimiento de tu organización, un espacio 3D donde tu gente lo recorre antes de hacerlo de verdad. Se entra con un enlace y no hay nada que instalar. Equivocarse cuesta un minuto, y de cada persona queda registro de lo que hizo.",
	ctaPrimary: "Solicitar una propuesta",
	ctaSecondary: "Cómo se contrata",
	facts: [
		{ value: "Con un enlace", label: "Desde el móvil, el ordenador o unas gafas de realidad virtual" },
		{ value: "10–15 min", label: "Lo que dura cada sala, cada paso del procedimiento" },
		{ value: "Un registro", label: "Por persona: la secuencia, las decisiones y si terminó" },
		{ value: "Tu voz", label: "Tus salas, tus formularios, tus nombres para las cosas" },
	],
	whatTitle: "Qué es",
	whatBody: "Cada organización tiene una carpeta que entrega el primer día, y deja que el propio día enseñe el resto. Aquí el recorrido va antes: el pasillo, la taquilla, el formulario y la norma ya están ahí, y quien lo recorre deja constancia de lo que hizo.",
	forTitle: "Para qué sirve",
	forItems: ["Un primer día: que la persona nueva llegue sabiendo dónde está cada cosa.", "Una secuencia que tiene que hacerse en orden.", "Una norma que sale cara aprender en el puesto."],
	deliveredTitle: "Qué te entregamos",
	delivered: [
		{
			title: "El espacio",
			body: "Una o varias salas, cada una un paso del procedimiento, con un guía que acompaña a quien aprende.",
		},
		{
			title: "Los accesos",
			body: "Un enlace por grupo o por persona, válido durante el periodo que acordemos.",
		},
		{
			title: "El registro",
			body: "De cada persona: la secuencia, las decisiones y si terminó. Lo puede leer el responsable de formación.",
		},
		{
			title: "Los archivos",
			body: "La escena y sus recursos, con la licencia que ponga la propuesta.",
		},
		{
			title: "La medida",
			body: "El indicador que acordemos, medido antes y después.",
		},
	],
	levelsTitle: "Cómo se mide si funciona",
	levelsLead: "Antes de construir nada eliges a qué nivel se juzga el resultado, y la propuesta nombra el indicador.",
	levelsHead: ["Nivel", "La pregunta", "Un indicador de ejemplo"],
	levels: [
		{ level: "Reacción", question: "¿Les pareció útil y relevante?", example: "Un cuestionario corto a la salida" },
		{
			level: "Aprendizaje",
			question: "¿Lo aprendieron?",
			example: "Errores de secuencia en el ensayo, primer recorrido frente al último",
		},
		{
			level: "Comportamiento",
			question: "¿Lo hacen en el trabajo?",
			example: "Incidencias de la primera semana, según su responsable",
		},
		{
			level: "Resultados",
			question: "¿Se movió una cifra de la organización?",
			example: "Tiempo hasta que una persona nueva rinde del todo",
		},
	],
	casesTitle: "Dos casos",
	casesLabels: { rehearsed: "Qué se ensaya", learners: "Quién aprende", judged: "Cómo se juzga" },
	cases: [
		{
			title: "Una gran cadena de tiendas, el primer día",
			rehearsed: "Taquillas, contrato, normas de la planta y la caja: el día antes del primer día",
			learners: "Dependientes nuevos, desde su móvil",
			judged: "Comportamiento: incidencias de la primera semana",
		},
		{
			title: "Un cuerpo de policía, la escena del crimen",
			rehearsed: "Asegurar una escena y recoger las pruebas en el orden establecido",
			learners: "Alumnos de la academia, desde ordenadores y gafas",
			judged: "Aprendizaje: errores de secuencia antes y después",
		},
	],
	casesNote: "Solo nombramos a un cliente con su permiso por escrito; hasta entonces, contamos el caso así.",
	flowTitle: "Cómo se contrata",
	flowLead: "En cada paso sabes quién mueve ficha y cuánto tarda.",
	flow: [
		{
			title: "Solicitud",
			body: "Nos cuentas qué procedimiento quieres que se ensaye, quién lo aprende y cuántas personas son.",
			who: "Tú",
			when: "5 minutos",
		},
		{
			title: "Llamada",
			body: "Una hora para entender el procedimiento y elegir a qué nivel se mide el resultado.",
			who: "Tú y Numen Games",
			when: "En 2 días laborables",
		},
		{
			title: "Propuesta",
			body: "Por escrito: número de salas, de personas, periodo de acceso, el indicador y el precio.",
			who: "Numen Games",
			when: "En 5 días laborables",
		},
		{
			title: "Firma",
			body: "Aceptas la propuesta. La facturación va como diga el acuerdo.",
			who: "Tú",
			when: "Cuando decidas",
		},
		{
			title: "Construcción",
			body: "Construimos las salas con tus materiales y las revisas antes de abrirlas.",
			who: "Numen Games, con tu revisión",
			when: "Lo que diga la propuesta",
		},
		{
			title: "Ensayo",
			body: "Tu gente recibe su enlace y recorre el procedimiento.",
			who: "Tu equipo",
			when: "El periodo acordado",
		},
		{
			title: "Medida",
			body: "Te entregamos el registro y el indicador, antes y después.",
			who: "Numen Games",
			when: "Al cerrar el periodo",
		},
	],
	priceNote: "Según propuesta, por lo que contiene: número de salas, de personas, periodo de acceso y la medida. Los impuestos van aparte.",
	faqTitle: "Preguntas",
	faq: [
		{
			q: "¿Hace falta instalar algo?",
			a: "No. Se entra con un enlace desde el navegador del móvil, del ordenador o de unas gafas de realidad virtual.",
		},
		{
			q: "¿Tenemos que darle a Numen Games nuestro procedimiento?",
			a: "Sí: los documentos, las fotos o los planos que tengas y una conversación con quien lo conoce. Con eso construimos las salas.",
		},
		{
			q: "¿Aparece la marca Numen Games?",
			a: "No. El espacio habla con la voz de tu organización: tus salas, tus formularios y tus nombres para las cosas.",
		},
		{
			q: "¿Qué pasa con el espacio cuando acaba el periodo?",
			a: "Los archivos te los quedas con la licencia que diga la propuesta. Si quieres que siga abierto, lo alojamos: es la puerta de Mundos 3D.",
		},
	],
	form: {
		title: "Solicitar una propuesta",
		lead: "Con esto preparamos la llamada. Al enviarlo se abre tu correo con todo ya escrito, dirigido a hola@numen.games.",
		fields: [
			{ name: "name", label: "Nombre", type: "text", required: true },
			{ name: "email", label: "Email profesional", type: "email", required: true },
			{ name: "organization", label: "Organización", type: "text", required: true },
			{
				name: "procedure",
				label: "Qué procedimiento quieres que ensayen",
				type: "textarea",
				required: true,
			},
			{
				name: "learners",
				label: "Cuántas personas lo aprenden",
				type: "select",
				required: true,
				options: ["Hasta 50", "50 – 500", "Más de 500", "No lo sé"],
			},
			{
				name: "devices",
				label: "Desde dónde entrarían",
				type: "select",
				options: ["Móvil", "Ordenador", "Gafas de realidad virtual", "Varios"],
			},
			{ name: "start", label: "Cuándo te gustaría empezar", type: "text" },
			{ name: "message", label: "Algo más que debamos saber", type: "textarea" },
		],
		submit: "Preparar el correo",
		subject: "Solicitud de propuesta de formación",
		success: "Se ha abierto tu correo con la solicitud. Envíalo y te contestamos en 2 días laborables.",
		privacy: "Usamos estos datos solo para responder a tu solicitud.",
	},
};

const en: TrainingPage = {
	eyebrow: "Training",
	title: "Let your team rehearse before the day it counts.",
	lead: "From your organisation's own procedure we build a 3D space where your people walk it before doing it for real. You enter with a link, with nothing to install. Getting it wrong costs a minute, and each person leaves a record of what they did.",
	ctaPrimary: "Request a proposal",
	ctaSecondary: "How to get it",
	facts: [
		{ value: "With a link", label: "From a phone, a computer or a VR headset" },
		{ value: "10–15 min", label: "The length of each room, each step of the procedure" },
		{ value: "A record", label: "Per person: the sequence, the choices and whether they finished" },
		{ value: "Your voice", label: "Your rooms, your forms, your names for things" },
	],
	whatTitle: "What it is",
	whatBody: "Every organisation has a folder it hands out on the first day, and lets the day itself teach the rest. Here the walk comes first: the corridor, the locker, the form and the rule are already there, and whoever walks it leaves a trace of what they did.",
	forTitle: "What it is for",
	forItems: ["A first day: the new person arrives knowing where everything is.", "A sequence that must be done in order.", "A rule that is expensive to learn on the job."],
	deliveredTitle: "What we deliver",
	delivered: [
		{
			title: "The space",
			body: "One or more rooms, each a step of the procedure, with a guide who accompanies the learner.",
		},
		{
			title: "The accesses",
			body: "A link per group or per person, valid for the period we agree.",
		},
		{
			title: "The record",
			body: "For each person: the sequence, the choices and whether they finished. Readable by whoever runs training.",
		},
		{
			title: "The files",
			body: "The scene and its assets, under the licence written in the proposal.",
		},
		{
			title: "The measure",
			body: "The indicator we agree, measured before and after.",
		},
	],
	levelsTitle: "How we tell it works",
	levelsLead: "Before anything is built you choose the level the result is judged at, and the proposal names the indicator.",
	levelsHead: ["Level", "The question", "An example indicator"],
	levels: [
		{ level: "Reaction", question: "Did they find it useful and relevant?", example: "A short questionnaire at the exit" },
		{
			level: "Learning",
			question: "Did they learn it?",
			example: "Sequence errors in the rehearsal, first walk against last",
		},
		{
			level: "Behaviour",
			question: "Do they do it at work?",
			example: "First-week incidents reported by their supervisor",
		},
		{
			level: "Results",
			question: "Did a figure of the organisation move?",
			example: "Time until a new hire is fully productive",
		},
	],
	casesTitle: "Two cases",
	casesLabels: { rehearsed: "Rehearsed", learners: "Learners", judged: "Judged at" },
	cases: [
		{
			title: "A large retailer, the first day",
			rehearsed: "Lockers, contract, floor rules, the till: the day before the day",
			learners: "New shop assistants, from their phones",
			judged: "Behaviour: first-week incidents",
		},
		{
			title: "A police force, the crime scene",
			rehearsed: "Securing a scene and collecting evidence in the prescribed order",
			learners: "Trainees at the academy, from computers and headsets",
			judged: "Learning: sequence errors before and after",
		},
	],
	casesNote: "We name a client only with their written consent; until then, the case is told like this.",
	flowTitle: "How to get it",
	flowLead: "At every step you know whose move it is and how long it takes.",
	flow: [
		{
			title: "Request",
			body: "Tell us which procedure you want rehearsed, who learns it and how many people there are.",
			who: "You",
			when: "5 minutes",
		},
		{
			title: "Call",
			body: "An hour to understand the procedure and choose the level the result is measured at.",
			who: "You and Numen Games",
			when: "Within 2 working days",
		},
		{
			title: "Proposal",
			body: "In writing: number of rooms, of people, access period, the indicator and the price.",
			who: "Numen Games",
			when: "Within 5 working days",
		},
		{
			title: "Signature",
			body: "You accept the proposal. Invoicing follows the agreement.",
			who: "You",
			when: "When you decide",
		},
		{
			title: "Build",
			body: "We build the rooms from your materials and you review them before they open.",
			who: "Numen Games, with your review",
			when: "As the proposal says",
		},
		{
			title: "Rehearsal",
			body: "Your people get their link and walk the procedure.",
			who: "Your team",
			when: "The agreed period",
		},
		{
			title: "Measure",
			body: "We hand you the record and the indicator, before and after.",
			who: "Numen Games",
			when: "At the end of the period",
		},
	],
	priceNote: "On proposal, for what it contains: number of rooms, of people, access period and the measure. Taxes shown separately.",
	faqTitle: "Questions",
	faq: [
		{
			q: "Is there anything to install?",
			a: "No. You enter with a link from the browser of a phone, a computer or a VR headset.",
		},
		{
			q: "Do we have to give Numen Games our procedure?",
			a: "Yes: the documents, photos or plans you have and a conversation with whoever knows it. That is what we build the rooms from.",
		},
		{
			q: "Does the Numen Games brand appear?",
			a: "No. The space speaks in your organisation's voice: your rooms, your forms and your names for things.",
		},
		{
			q: "What happens to the space when the period ends?",
			a: "You keep the files under the licence in the proposal. If you want it to stay open, we host it: that is the 3D worlds door.",
		},
	],
	form: {
		title: "Request a proposal",
		lead: "This is what we need to prepare the call. Sending it opens your email with everything written, addressed to hola@numen.games.",
		fields: [
			{ name: "name", label: "Name", type: "text", required: true },
			{ name: "email", label: "Work email", type: "email", required: true },
			{ name: "organization", label: "Organisation", type: "text", required: true },
			{
				name: "procedure",
				label: "Which procedure you want rehearsed",
				type: "textarea",
				required: true,
			},
			{
				name: "learners",
				label: "How many people learn it",
				type: "select",
				required: true,
				options: ["Up to 50", "50 – 500", "Over 500", "I don't know"],
			},
			{
				name: "devices",
				label: "Where they would enter from",
				type: "select",
				options: ["Phone", "Computer", "VR headset", "Several"],
			},
			{ name: "start", label: "When you would like to start", type: "text" },
			{ name: "message", label: "Anything else we should know", type: "textarea" },
		],
		submit: "Prepare the email",
		subject: "Training proposal request",
		success: "Your email has opened with the request. Send it and we reply within 2 working days.",
		privacy: "We use this data only to answer your request.",
	},
};

export const TRAINING: Record<SupportedLocale, TrainingPage> = { es, en };
