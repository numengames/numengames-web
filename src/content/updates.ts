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
	{
		status: "planned",
		text: {
			es: "Política de cookies: la de privacidad cita una que no existe en el archivo.",
			en: "A cookie policy: the privacy text cites one that does not exist in the archive.",
		},
	},
];

/** La versión más nueva — lo que imprime el pie. */
export const CURRENT_VERSION: string = UPDATES[0]!.version;
