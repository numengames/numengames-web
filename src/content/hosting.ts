// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: AGPL-3.0-only
//
// numen.games/hosting — alojamiento de mundos 3D. Página de venta completa:
// datos de cada plan, cómo se contrata paso a paso y una solicitud.
//
// Cada dato sale de lo que hace la infraestructura (numinia-k8s/ovh): un
// contenedor por mundo con su potencia reservada, HTTPS, copia nocturna y
// exportación completa. No nombra el motor: el servicio aloja mundos web
// 3D, sea cual sea su motor. No hay cifra de precio hasta que el Oráculo la
// fije; el test lo vigila.
import type { SupportedLocale } from "@lib/locale";
import type { RequestFormData } from "@components/site/RequestForm.astro";

export interface HostingPage {
	eyebrow: string;
	title: string;
	lead: string;
	ctaPrimary: string;
	ctaSecondary: string;
	facts: { value: string; label: string }[];
	fitsTitle: string;
	fitsLead: string;
	fits: { title: string; body: string }[];
	notFit: string;
	includedTitle: string;
	included: { title: string; body: string }[];
	plansTitle: string;
	plansLead: string;
	plans: { name: string; forWhom: string }[];
	specsFeature: string;
	specs: { label: string; values: string[] }[];
	priceNote: string;
	eventsTitle: string;
	eventsBody: string;
	eventsSteps: string[];
	flowTitle: string;
	flowLead: string;
	flow: { title: string; body: string; who: string; when: string }[];
	faqTitle: string;
	faq: { q: string; a: string }[];
	form: RequestFormData;
}

const es: HostingPage = {
	eyebrow: "Alojamiento de mundos 3D",
	title: "Tu mundo, siempre abierto. Y listo para el día del evento.",
	lead: "Alojamos mundos 3D que se visitan desde el navegador. Van en tu dirección, con copia cada noche y más potencia el día que se llenan. Tú te ocupas de tu comunidad; nosotros, de que el mundo esté ahí.",
	ctaPrimary: "Solicitar alojamiento",
	ctaSecondary: "Ver los planes",
	facts: [
		{
			value: "0 instalaciones",
			label: "Se entra con un enlace desde el móvil, el ordenador o unas gafas de realidad virtual",
		},
		{ value: "Tu dominio", label: "O un subdominio nuestro. HTTPS incluido" },
		{ value: "Cada noche", label: "Copia completa del mundo, sin pararlo" },
		{ value: "UE", label: "Servidores en Francia; tus datos no salen de la Unión Europea" },
	],
	fitsTitle: "Qué alojamos",
	fitsLead: "Mundos 3D que corren en un servidor propio y se abren en el navegador. Casi siempre tranquilos, y de vez en cuando llenos con un evento: el servicio está pensado para esa forma de uso.",
	fits: [
		{
			title: "El mundo que ya tienes",
			body: "Lo tienes en otro proveedor o en tu propia máquina. Lo traemos, lo ponemos en marcha y lo dejamos en tu dirección.",
		},
		{
			title: "El mundo que te construimos",
			body: "Si Numen Games te ha diseñado el mundo, el alojamiento es la forma de mantenerlo abierto después del encargo.",
		},
		{
			title: "El espacio de tu comunidad",
			body: "Un lugar fijo donde tu comunidad se reúne, con eventos puntuales: presentaciones, clases, encuentros, exposiciones.",
		},
	],
	notFit: "No alojamos webs corrientes, tiendas online ni correo. Si tu mundo necesita algo fuera de lo normal, lo vemos en la llamada.",
	includedTitle: "Qué incluye siempre",
	included: [
		{
			title: "Potencia reservada",
			body: "Tu mundo tiene su propia parte del servidor. Lo que hagan los demás mundos no le afecta.",
		},
		{
			title: "Tu dirección con HTTPS",
			body: "En tu dominio o en un subdominio de numen.games. El certificado se renueva solo.",
		},
		{
			title: "Copia cada noche",
			body: "Del mundo entero: escena, objetos y archivos. Podemos devolverlo al estado de cualquier noche guardada.",
		},
		{
			title: "Refuerzo para eventos",
			body: "Nos das la fecha y ese día tu mundo tiene más potencia. Al acabar vuelve a su tamaño normal.",
		},
		{
			title: "Tu mundo es tuyo",
			body: "Cuando lo pidas te entregamos el mundo completo, con las instrucciones para ponerlo en marcha en cualquier otro sitio. Sin permanencia.",
		},
		{
			title: "Actualizaciones de seguridad",
			body: "Mantenemos al día el servidor y lo que corre debajo de tu mundo. No tienes que tocar nada.",
		},
	],
	plansTitle: "Dos planes",
	plansLead: "La diferencia es si tu mundo comparte servidor con otros o tiene uno solo para él.",
	plans: [
		{ name: "Mundo", forWhom: "Un espacio propio con visitas y algún evento al mes." },
		{
			name: "Mundo dedicado",
			forWhom: "Eventos grandes o frecuentes, varios mundos, o un servidor solo para tu organización.",
		},
	],
	specsFeature: "Qué incluye",
	specs: [
		{ label: "Servidor", values: ["Compartido con otros mundos", "Solo para tu organización"] },
		{
			label: "Potencia reservada",
			values: ["1,5 núcleos y 2 GB de memoria", "Servidor completo, desde 6 núcleos y 12 GB"],
		},
		{ label: "Espacio para archivos", values: ["20 GB", "Desde 100 GB"] },
		{ label: "Mundos incluidos", values: ["1", "Los que quepan en el servidor"] },
		{ label: "Mundo de pruebas", values: ["No", "Sí, una copia para ensayar cambios"] },
		{ label: "Refuerzo para eventos", values: ["Con 5 días laborables de aviso", "Siempre disponible"] },
		{ label: "Copias", values: ["Cada noche, 14 días", "Cada noche, 30 días"] },
		{
			label: "Dirección",
			values: ["Tu dominio o un subdominio, con HTTPS", "Tu dominio o un subdominio, con HTTPS"],
		},
		{ label: "Exportación completa", values: ["Sí, en 5 días laborables", "Sí, en 5 días laborables"] },
		{ label: "Atención", values: ["Por correo, en horario laboral", "Canal directo con el equipo"] },
		{ label: "Ubicación", values: ["Francia (UE)", "Francia (UE)"] },
		{ label: "Contrato", values: ["Mensual, sin permanencia", "Mensual, sin permanencia"] },
	],
	priceNote: "Cuota mensual por plan, con los impuestos aparte. Te la damos por escrito en la propuesta, después de ver tu mundo.",
	eventsTitle: "El día del evento",
	eventsBody: "La mayor parte del tiempo un mundo está tranquilo, y de pronto un día entra toda tu comunidad a la vez. Lo preparamos así:",
	eventsSteps: ["Nos dices la fecha, la hora y cuánta gente esperas.", "Antes del evento le damos más potencia a tu mundo y comprobamos que responde.", "Durante el evento lo vigilamos.", "Al acabar vuelve a su tamaño normal, y te decimos cuánta gente entró y en qué momento hubo más."],
	flowTitle: "Cómo se contrata",
	flowLead: "De la solicitud al mundo en marcha, en unas dos semanas. En cada paso sabes quién mueve ficha.",
	flow: [
		{
			title: "Solicitud",
			body: "Rellenas el formulario de abajo: qué mundo es, cuánta gente lo visita y cuántas personas tiene tu evento más grande.",
			who: "Tú",
			when: "5 minutos",
		},
		{
			title: "Llamada",
			body: "Media hora para ver tu mundo, entender cómo se usa y decidir el plan.",
			who: "Tú y Numen Games",
			when: "En 2 días laborables",
		},
		{
			title: "Propuesta",
			body: "Por escrito: plan, cuota mensual, fecha de puesta en marcha y qué hace cada parte.",
			who: "Numen Games",
			when: "En 3 días laborables",
		},
		{
			title: "Firma y primer pago",
			body: "Aceptas la propuesta y pagas el primer mes. Te enviamos la factura.",
			who: "Tú",
			when: "Cuando decidas",
		},
		{
			title: "Puesta en marcha",
			body: "Traemos o montamos tu mundo y lo dejamos funcionando en una dirección de prueba para que lo revises.",
			who: "Numen Games",
			when: "5 días laborables",
		},
		{
			title: "Tu dirección",
			body: "Apuntas tu dominio a nuestro servidor, con las instrucciones exactas que te damos. Si usas nuestro subdominio, te saltas este paso.",
			who: "Tú (o quien lleve tu dominio)",
			when: "10 minutos",
		},
		{
			title: "En marcha",
			body: "Tu mundo está abierto. Cada mes te mandamos un resumen: visitas, copias hechas y cambios.",
			who: "Numen Games",
			when: "Cada mes",
		},
	],
	faqTitle: "Preguntas",
	faq: [
		{
			q: "¿Mi mundo encaja?",
			a: "Encaja si es un mundo 3D web que corre en su propio servidor y se abre en el navegador. En la llamada lo comprobamos con el tuyo delante; si no encaja, te lo decimos antes de hacer ninguna propuesta.",
		},
		{
			q: "¿Cuánta gente cabe a la vez?",
			a: "Depende de lo pesado que sea tu mundo, no del alojamiento. Por eso te preguntamos por tu evento más grande: dimensionamos el refuerzo para esa cifra y te decimos por escrito para cuánta gente está preparado.",
		},
		{
			q: "¿Y si un día entra mucha más gente de la esperada?",
			a: "Tu mundo tiene su potencia reservada y no pasa de ahí, así que no puede tumbar a los demás ni ellos a él. Si se queda corto, se nota más lento. Con aviso previo lo evitamos.",
		},
		{
			q: "¿Incluye chat de voz?",
			a: "Hoy no. El mundo funciona con chat de texto. Si necesitas voz, lo vemos en la propuesta como un servicio aparte.",
		},
		{
			q: "¿Puedo irme cuando quiera?",
			a: "Sí. No hay permanencia. Te entregamos el mundo completo, con las instrucciones para ponerlo en marcha en otro sitio.",
		},
		{
			q: "¿Dónde están mis datos?",
			a: "En servidores de OVHcloud en Francia, dentro de la Unión Europea. Solo el equipo de Numen Games tiene acceso a la máquina.",
		},
	],
	form: {
		title: "Solicitar alojamiento",
		lead: "Con esto preparamos la llamada. Al enviarlo se abre tu correo con todo ya escrito, dirigido a hola@numengames.com.",
		fields: [
			{ name: "name", label: "Nombre", type: "text", required: true },
			{ name: "email", label: "Email profesional", type: "email", required: true },
			{ name: "organization", label: "Organización", type: "text", required: true },
			{
				name: "world_url",
				label: "Dirección de tu mundo (si ya existe)",
				type: "url",
				hint: "Si todavía no existe, déjalo vacío.",
			},
			{
				name: "visitors",
				label: "Visitas al mes, aproximadas",
				type: "select",
				required: true,
				options: ["Menos de 100", "100 – 1.000", "Más de 1.000", "No lo sé"],
			},
			{
				name: "event_size",
				label: "Personas a la vez en tu evento más grande",
				type: "select",
				required: true,
				options: ["Hasta 20", "20 – 50", "50 – 100", "Más de 100", "No lo sé"],
			},
			{
				name: "plan",
				label: "Plan que te interesa",
				type: "select",
				options: ["Mundo", "Mundo dedicado", "No lo sé"],
			},
			{ name: "domain", label: "Tu dominio (si quieres usarlo)", type: "text" },
			{ name: "message", label: "Algo más que debamos saber", type: "textarea" },
		],
		submit: "Preparar el correo",
		subject: "Solicitud de alojamiento de mundo",
		success: "Se ha abierto tu correo con la solicitud. Envíalo y te contestamos en 2 días laborables.",
		privacy: "Usamos estos datos solo para responder a tu solicitud.",
	},
};

const en: HostingPage = {
	eyebrow: "3D world hosting",
	title: "Your world, always open. And ready for event day.",
	lead: "We host 3D worlds visited from the browser. At your address, with a copy every night and more power on the day they fill up. You look after your community; we make sure the world is there.",
	ctaPrimary: "Request hosting",
	ctaSecondary: "See the plans",
	facts: [
		{ value: "0 installs", label: "Entered with a link from a phone, a computer or a VR headset" },
		{ value: "Your domain", label: "Or one of our subdomains. HTTPS included" },
		{ value: "Every night", label: "A full copy of the world, without stopping it" },
		{ value: "EU", label: "Servers in France; your data stays in the European Union" },
	],
	fitsTitle: "What we host",
	fitsLead: "3D worlds that run on a server of their own and open in the browser. Quiet most of the time, full now and then for an event: the service is built for that pattern.",
	fits: [
		{
			title: "The world you already have",
			body: "It lives with another provider or on your own machine. We bring it over, start it and leave it at your address.",
		},
		{
			title: "The world we build for you",
			body: "If Numen Games designed your world, hosting is how it stays open after the commission.",
		},
		{
			title: "Your community's space",
			body: "A fixed place where your community meets, with occasional events: launches, classes, gatherings, exhibitions.",
		},
	],
	notFit: "We do not host ordinary websites, online shops or email. If your world needs something out of the ordinary, we look at it on the call.",
	includedTitle: "Always included",
	included: [
		{
			title: "Reserved power",
			body: "Your world has its own share of the server. What other worlds do does not affect it.",
		},
		{
			title: "Your address with HTTPS",
			body: "On your domain or a numen.games subdomain. The certificate renews itself.",
		},
		{
			title: "A copy every night",
			body: "Of the whole world: scene, objects and files. We can bring it back to any saved night.",
		},
		{
			title: "Event boost",
			body: "Give us the date and your world gets more power that day. Afterwards it goes back to its normal size.",
		},
		{
			title: "Your world is yours",
			body: "Whenever you ask, we hand you the complete world with the instructions to run it anywhere else. No lock-in.",
		},
		{
			title: "Security updates",
			body: "We keep the server and everything under your world up to date. You do not have to touch anything.",
		},
	],
	plansTitle: "Two plans",
	plansLead: "The difference is whether your world shares a server with others or has one to itself.",
	plans: [
		{ name: "World", forWhom: "A space of your own with visitors and an event now and then." },
		{
			name: "Dedicated world",
			forWhom: "Large or frequent events, several worlds, or a server for your organisation alone.",
		},
	],
	specsFeature: "What you get",
	specs: [
		{ label: "Server", values: ["Shared with other worlds", "For your organisation alone"] },
		{
			label: "Reserved power",
			values: ["1.5 cores and 2 GB of memory", "A whole server, from 6 cores and 12 GB"],
		},
		{ label: "File storage", values: ["20 GB", "From 100 GB"] },
		{ label: "Worlds included", values: ["1", "As many as the server holds"] },
		{ label: "Test world", values: ["No", "Yes, a copy to rehearse changes"] },
		{ label: "Event boost", values: ["With 5 working days' notice", "Always available"] },
		{ label: "Copies", values: ["Every night, 14 days", "Every night, 30 days"] },
		{
			label: "Address",
			values: ["Your domain or a subdomain, with HTTPS", "Your domain or a subdomain, with HTTPS"],
		},
		{ label: "Full export", values: ["Yes, within 5 working days", "Yes, within 5 working days"] },
		{ label: "Support", values: ["By email, in office hours", "A direct channel with the team"] },
		{ label: "Location", values: ["France (EU)", "France (EU)"] },
		{ label: "Contract", values: ["Monthly, no lock-in", "Monthly, no lock-in"] },
	],
	priceNote: "A monthly fee by plan, taxes shown separately. We give it to you in writing in the proposal, after seeing your world.",
	eventsTitle: "On event day",
	eventsBody: "Most of the time a world is quiet, and then one day your whole community walks in at once. This is how we prepare:",
	eventsSteps: ["You tell us the date, the time and how many people you expect.", "Before the event we give your world more power and check it responds.", "During the event we watch it.", "Afterwards it goes back to its normal size, and we tell you how many people came in and when the peak was."],
	flowTitle: "How to get it",
	flowLead: "From request to a running world in about two weeks. At every step you know whose move it is.",
	flow: [
		{
			title: "Request",
			body: "Fill in the form below: which world it is, how many people visit it and how big your largest event is.",
			who: "You",
			when: "5 minutes",
		},
		{
			title: "Call",
			body: "Half an hour to look at your world, understand how it is used and choose the plan.",
			who: "You and Numen Games",
			when: "Within 2 working days",
		},
		{
			title: "Proposal",
			body: "In writing: plan, monthly fee, start date and what each side does.",
			who: "Numen Games",
			when: "Within 3 working days",
		},
		{
			title: "Signature and first payment",
			body: "You accept the proposal and pay the first month. We send the invoice.",
			who: "You",
			when: "When you decide",
		},
		{
			title: "Set-up",
			body: "We bring over or build your world and leave it running at a test address for you to review.",
			who: "Numen Games",
			when: "5 working days",
		},
		{
			title: "Your address",
			body: "You point your domain at our server, with the exact instructions we give you. On our subdomain you skip this step.",
			who: "You (or whoever runs your domain)",
			when: "10 minutes",
		},
		{
			title: "Live",
			body: "Your world is open. Every month we send you a summary: visits, copies made and changes.",
			who: "Numen Games",
			when: "Every month",
		},
	],
	faqTitle: "Questions",
	faq: [
		{
			q: "Does my world fit?",
			a: "It fits if it is a web 3D world that runs on its own server and opens in the browser. On the call we check with yours in front of us; if it does not fit, we tell you before making any proposal.",
		},
		{
			q: "How many people fit at once?",
			a: "That depends on how heavy your world is, not on the hosting. That is why we ask about your largest event: we size the boost for that number and tell you in writing how many people it is ready for.",
		},
		{
			q: "What if far more people come than expected?",
			a: "Your world has its reserved power and goes no further, so it cannot bring the others down, nor they it. If it falls short, it feels slower. With notice we avoid that.",
		},
		{
			q: "Is voice chat included?",
			a: "Not today. The world works with text chat. If you need voice, we cover it in the proposal as a separate service.",
		},
		{
			q: "Can I leave whenever I want?",
			a: "Yes. There is no lock-in. We hand you the complete world, with the instructions to run it elsewhere.",
		},
		{
			q: "Where is my data?",
			a: "On OVHcloud servers in France, inside the European Union. Only the Numen Games team has access to the machine.",
		},
	],
	form: {
		title: "Request hosting",
		lead: "This is what we need to prepare the call. Sending it opens your email with everything written, addressed to hola@numengames.com.",
		fields: [
			{ name: "name", label: "Name", type: "text", required: true },
			{ name: "email", label: "Work email", type: "email", required: true },
			{ name: "organization", label: "Organisation", type: "text", required: true },
			{
				name: "world_url",
				label: "Your world's address (if it exists)",
				type: "url",
				hint: "If it does not exist yet, leave it empty.",
			},
			{
				name: "visitors",
				label: "Visits a month, roughly",
				type: "select",
				required: true,
				options: ["Under 100", "100 – 1,000", "Over 1,000", "I don't know"],
			},
			{
				name: "event_size",
				label: "People at once at your largest event",
				type: "select",
				required: true,
				options: ["Up to 20", "20 – 50", "50 – 100", "Over 100", "I don't know"],
			},
			{
				name: "plan",
				label: "Plan you are interested in",
				type: "select",
				options: ["World", "Dedicated world", "I don't know"],
			},
			{ name: "domain", label: "Your domain (if you want to use it)", type: "text" },
			{ name: "message", label: "Anything else we should know", type: "textarea" },
		],
		submit: "Prepare the email",
		subject: "World hosting request",
		success: "Your email has opened with the request. Send it and we reply within 2 working days.",
		privacy: "We use this data only to answer your request.",
	},
};

export const HOSTING: Record<SupportedLocale, HostingPage> = { es, en };
