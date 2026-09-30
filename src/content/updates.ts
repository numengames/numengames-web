// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: AGPL-3.0-only
//
// La línea temporal del sitio, de la más nueva a la más antigua: qué cambió
// cada subida a producción y qué queda pendiente. El pie imprime la versión
// más nueva y enlaza aquí; la misma página existe en numinia.com,
// numinia.org y nwos.numen.games (decisión del 2026-09-16, a imagen de
// numinia.com/updates).
//
// LA REGLA: toda pull request que cambie src/** añade una entrada aquí y
// sube el minor. CI rechaza la fusión si no (scripts/check-version-bump.mjs).
// Un sitio que no sabe decir qué cambió entre dos visitas obliga a cada
// lector a compararlo a ojo.
export interface UpdateEntry {
	readonly type: "ADD" | "CHG" | "FIX" | "DEL";
	readonly text: { es: string; en: string };
}

export interface UpdateVersion {
	readonly version: string;
	readonly date: string;
	readonly entries: readonly UpdateEntry[];
}

export interface PendingItem {
	readonly status: "planned" | "blocked";
	readonly text: { es: string; en: string };
}

export const UPDATES: readonly UpdateVersion[] = [
	{
		version: "v0.10.0",
		date: "2026-09-30",
		entries: [
			{
				type: "CHG",
				text: {
					es: "Tres puertas. Lo que hacemos se ordena por lo que buscas: Eventos, Formación y Mundos 3D. La barra lleva las tres, y la portada las abre justo debajo del titular, cada una con para quién es y qué te llevas. Cómo trabajamos en eventos pasa al pie.",
					en: "Three doors. What we do is ordered by what you are after: Events, Training and 3D worlds. The bar carries all three, and the home page opens them right under the headline, each with whom it is for and what you get. How we run events moves to the footer.",
				},
			},
			{
				type: "ADD",
				text: {
					es: "Página nueva, Formación (/formacion): un espacio 3D hecho con el procedimiento de tu organización para que tu gente lo ensaye antes del día que cuenta. Qué entregamos, cómo se mide si funciona, dos casos, los siete pasos para contratarla y una solicitud.",
					en: "New page, Training (/formacion): a 3D space built from your organisation's procedure so your people rehearse it before the day it counts. What we deliver, how we tell it works, two cases, the seven steps to get it and a request form.",
				},
			},
			{
				type: "CHG",
				text: {
					es: "Mundos 3D (/hosting) pasa a ser una página de venta completa: datos rápidos, qué alojamos y qué no, una tabla con los dos planes, el día del evento, los siete pasos para contratarlo con quién mueve ficha y cuánto tarda, preguntas y una solicitud. Ya no nombra ningún motor.",
					en: "3D worlds (/hosting) becomes a full sales page: quick facts, what we host and what we do not, a table of both plans, event day, the seven steps to get it with whose move each is and how long it takes, questions and a request form. It no longer names any engine.",
				},
			},
		],
	},
	{
		version: "v0.9.0",
		date: "2026-09-30",
		entries: [
			{
				type: "ADD",
				text: {
					es: "El pie lleva un botón con una taza de café, Apoya Numinia, bajo la línea que dice qué es este sitio. Abre numinia.com/support, donde se invita a Numinia a un café. El mismo botón está en el pie de las cuatro webs.",
					en: "The footer carries a button with a coffee cup, Support Numinia, under the line that says what this site is. It opens numinia.com/support, where you can buy Numinia a coffee. The same button is in the footer of all four sites.",
				},
			},
		],
	},
	{
		version: "v0.8.0",
		date: "2026-09-30",
		entries: [
			{
				type: "ADD",
				text: {
					es: "Página nueva, Alojamiento de mundos (/hosting): alojamos mundos 3D hechos con Hyperfy 2, cada uno en tu dirección con HTTPS, con copia cada noche, refuerzo el día de tus eventos y el mundo entregable completo cuando lo pidas. Dos planes, Mundo y Mundo dedicado; el precio va en la propuesta. Se llega desde el pie.",
					en: "New page, World hosting (/hosting): we host 3D worlds made with Hyperfy 2, each at your address with HTTPS, with a copy every night, a boost on your event days and the complete world handed over whenever you ask. Two plans, World and Dedicated world; the price comes in the proposal. Reached from the footer.",
				},
			},
		],
	},
	{
		version: "v0.7.0",
		date: "2026-09-29",
		entries: [
			{
				type: "CHG",
				text: {
					es: "El sitio se viste como numinia.org, que marca el diseño de los cuatro sitios de la casa: la barra lleva el logotipo de Numen Games y las entradas en letra monoespaciada con su icono, los textos pasan a Geist, los colores son solo los de la paleta de la casa, las esquinas se redondean a 6 y 8 píxeles y el botón principal es turquesa con texto blanco. El contenido no cambia.",
					en: "The site now dresses like numinia.org, which leads the design of the house's four sites: the bar carries the Numen Games wordmark and its entries in monospaced type with an icon each, the text is set in Geist, the colours are only the house palette's, corners are rounded to 6 and 8 pixels and the main button is teal with white text. The content does not change.",
				},
			},
			{
				type: "ADD",
				text: {
					es: "Al abrir la portada, la etiqueta, el titular y la primera línea entran uno tras otro desde abajo; si el dispositivo pide menos movimiento, aparecen sin animación. Sin cielo de estrellas: eso queda para los sitios de Numinia.",
					en: "When the home page opens, the label, the headline and the first line rise in one after another; if the device asks for less motion, they simply appear. No star sky: that stays with the Numinia sites.",
				},
			},
		],
	},
	{
		version: "v0.6.0",
		date: "2026-09-29",
		entries: [
			{
				type: "FIX",
				text: {
					es: "El aviso de cookies muestra «Aceptar todo» y «Rechazar todo» uno junto al otro y del mismo tamaño también en el ordenador; solo lo hacía en el móvil. La misma regla en los cuatro sitios.",
					en: "The cookie notice shows Accept all and Reject all side by side and the same size on a computer too; it only did so on phones. The same rule on the four sites.",
				},
			},
			{
				type: "CHG",
				text: {
					es: "El aviso legal (versión 0.2.0) da la inscripción de la empresa en el Registro Mercantil de Madrid —tomo 46518, folio 130, hoja M-816810, inscripción 1— y el código postal del domicilio social, 28290 Las Rozas de Madrid. La política de cookies es la 2.1.0: añade una clave que guarda numinia.org; en este sitio no cambia nada.",
					en: "The legal notice (version 0.2.0) gives the company's entry in the Mercantile Registry of Madrid — volume 46518, folio 130, sheet M-816810, entry 1 — and the postal code of its registered address, 28290 Las Rozas de Madrid. The cookie policy is 2.1.0: it adds a key numinia.org keeps; nothing changes on this site.",
				},
			},
		],
	},
	{
		version: "v0.5.0",
		date: "2026-09-29",
		entries: [
			{
				type: "ADD",
				text: {
					es: "Un aviso de cookies en la primera visita: dice qué guarda el sitio en tu navegador (tu modo día o noche y tu respuesta al aviso, nada más), con «Aceptar todo» y «Rechazar todo» del mismo tamaño, uno junto al otro. Los dos botones dejan el sitio igual, porque no hay nada opcional. Puedes volver a abrirlo desde el pie: «Cambiar mi elección de cookies».",
					en: "A cookie notice on your first visit: it says what the site keeps in your browser (your day or night mode and your answer to the notice, nothing else), with Accept all and Reject all the same size, side by side. Both buttons leave the site the same, because nothing is optional. You can open it again from the footer: Change my cookie choice.",
				},
			},
			{
				type: "CHG",
				text: {
					es: "Los textos legales, al día con el archivo: aviso legal y política de cookies nuevos, privacidad 2.1.0 y términos 1.0.1. El pie los lista en orden —aviso legal, privacidad, cookies, términos— y la nota de alcance encima de cada texto desaparece: cada texto dice ya a qué sitios se aplica. Las notas internas de revisión no se publican.",
					en: "The legal texts, up to date with the archive: a new legal notice and cookie policy, privacy 2.1.0 and terms 1.0.1. The footer lists them in order — legal notice, privacy, cookies, terms — and the scope note above each text is gone: each text now says which sites it applies to. Internal review notes are not published.",
				},
			},
		],
	},
	{
		version: "v0.4.0",
		date: "2026-09-24",
		entries: [
			{
				type: "ADD",
				text: {
					es: "Día y noche (DSN-016): un botón en la barra, con la luna y estrellas o el sol según a dónde lleva pulsarlo. Mientras no eliges, la página sigue a tu dispositivo; si eliges, se acuerda (clave numinia-modo, la misma que numinia.com) y al recargar no parpadea. El modo día usa el papel Arena y las tintas del sistema.",
					en: "Day and night (DSN-016): a button in the bar, showing the moon with stars or the sun for where a tap leads. Until you choose, the page follows your device; once you choose, it remembers (key numinia-modo, the same as numinia.com) and does not flash on reload. The day mode uses the Arena paper and the system's inks.",
				},
			},
		],
	},
	{
		version: "v0.3.0",
		date: "2026-09-18",
		entries: [
			{
				type: "ADD",
				text: {
					es: "Un enlace a este sitio se presenta solo (DSN-014): el escarabajo como favicon —marfil sobre carbón, igual en los cuatro sitios, en lugar del PNG con NG sobre lapislázuli—, una línea en los dos idiomas que dice qué hace Numen Games (la misma en el pie, en la descripción de la página y en la tarjeta) y una tarjeta de 1200×630 dibujada en cada build. El antiguo opengraph.jpg (una ciudad, sin nombre ni marca) se retira.",
					en: "A link to this site presents itself (DSN-014): the scarab as favicon — Marfil on Carbón, the same in the four sites, replacing the NG-on-lapis PNG —, one line in both languages that says what Numen Games does (the same line in the footer, the page description and the share card), and a 1200×630 share card drawn at build. The old opengraph.jpg (a city, no name, no mark) retires.",
				},
			},
		],
	},
	{
		version: "v0.2.0",
		date: "2026-09-18",
		entries: [
			{
				type: "CHG",
				text: {
					es: "El repositorio se queda solo con código: el informe de cumplimiento, el registro de tareas y el README de la plantilla se retiran. Las reglas, el vocabulario y las decisiones de la casa viven en numinia-nwos (numinia.org). En el sitio no cambia nada.",
					en: "The repository keeps code only: the compliance report, the task register and the template README are retired. The rules, the vocabulary and the decisions of the house live in numinia-nwos (numinia.org). Nothing changes on the site.",
				},
			},
		],
	},
	{
		version: "v0.1.1",
		date: "2026-09-16",
		entries: [
			{
				type: "CHG",
				text: {
					es: "El sitio se publica desde Cloudflare (Workers Builds conectado al repositorio), sin tokens en GitHub. El workflow de despliegue que exigía secretos inexistentes se retira: llevaba una semana en rojo y numen.games seguía sirviendo «Coming Soon». Esta es la primera versión que llega a producción desde el 17 de agosto.",
					en: 'The site is published from Cloudflare (Workers Builds connected to the repository), with no tokens in GitHub. The deploy workflow that demanded secrets that never existed is retired: it had been red for a week while numen.games kept serving "Coming Soon". This is the first version to reach production since 17 August.',
				},
			},
		],
	},
	{
		version: "v0.1.0",
		date: "2026-09-16",
		entries: [
			{
				type: "ADD",
				text: {
					es: "Esta página. La línea temporal empieza aquí: la web nueva (Inicio, Experiencias, Cómo trabajamos, Numen, Contacto) se fusionó el 11 de septiembre y no había registro de versiones.",
					en: "This page. The timeline starts here: the new site (Home, Experiences, How we work, Numen, Contact) merged on 11 September with no version record.",
				},
			},
			{
				type: "CHG",
				text: {
					es: "El pie toma la forma de la casa, la misma en los cuatro sitios: marca y una línea, Navegación, columna Numen Games con los otros tres sitios, Legal, Social y la línea de cierre — escarabajo, firma, licencia · telemetría · versión · commit.",
					en: "The footer takes the house shape, the same on the four sites: brand and one line, Navigation, a Numen Games column naming the other three sites, Legal, Social and the closing line — scarab, signature, licence · telemetry · version · commit.",
				},
			},
			{
				type: "ADD",
				text: {
					es: "Términos y condiciones y Política de privacidad, publicados por primera vez en este dominio (son los textos maestros de numinia-nwos, escritos para www.numen.games).",
					en: "Terms and conditions and Privacy policy, published on this domain for the first time (the numinia-nwos master texts, written for www.numen.games).",
				},
			},
			{
				type: "DEL",
				text: {
					es: "Web3Forms, el servicio externo del formulario de contacto: era legacy y su clave inexistente bloqueó cinco despliegues. El formulario compone ahora un correo a hola@numen.games.",
					en: "Web3Forms, the contact form's external service: legacy, and its missing key blocked five deploys. The form now composes an email to hola@numen.games.",
				},
			},
		],
	},
];

export const PENDING: readonly PendingItem[] = [
	{
		status: "blocked",
		text: {
			es: "Cuentas de empresa en X y Discord para la columna Social — pendiente del Oráculo.",
			en: "Company accounts on X and Discord for the Social column — waiting on the Oracle.",
		},
	},
	{
		status: "planned",
		text: {
			es: "Un solo sistema de diseño en los cuatro sitios: instalar @numengames/design-kit aquí y en numinia.com para que colores y tipografías dejen de diferir.",
			en: "One design system on the four sites: install @numengames/design-kit here and on numinia.com so colours and type stop differing.",
		},
	},
	{
		status: "planned",
		text: {
			es: "Telemetría real: interacción con la página, rendimiento y consentimiento de cookies. Hoy /telemetry solo dice versión y commit.",
			en: "Real telemetry: page interaction, performance and cookie consent. Today /telemetry says only version and commit.",
		},
	},
];

/** La versión más nueva — lo que imprime el pie. */
export const CURRENT_VERSION: string = UPDATES[0]!.version;
