// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: AGPL-3.0-only
//
// Las tres puertas de la casa. Lo que vende Numen Games se ordena por lo que
// busca quien llega —un evento, una formación, un mundo 3D—, no por cómo lo
// hace el equipo. La barra las lleva y la portada las abre bajo el titular;
// cada una lleva a su página de venta, con la misma forma en las tres.
// Fuente de cada oferta: numinia-archive operations/ (OPS-013 eventos,
// OPS-012 formación) y numinia-k8s/ovh (alojamiento).
import type { SupportedLocale } from "@lib/locale";

export interface Door {
	path: "/experiencias" | "/formacion" | "/hosting";
	name: string;
	question: string;
	forWhom: string;
	youGet: string[];
	cta: string;
}

export interface Doors {
	title: string;
	lead: string;
	items: Door[];
	note: string;
}

const es: Doors = {
	title: "¿Qué necesitas?",
	lead: "Hacemos tres cosas. Empieza por la que se parece a lo que buscas.",
	items: [
		{
			path: "/experiencias",
			name: "Eventos",
			question: "Tengo un evento y quiero que la gente participe.",
			forWhom: "Congresos, foros y encuentros de comunidad, de 150 a más de 3.000 personas.",
			youGet: ["Un sistema de participación diseñado para tu evento", "Un equipo que lo dirige en vivo", "Informe, mapa del evento y piezas hechas con lo que aportó la gente"],
			cta: "Ver eventos",
		},
		{
			path: "/formacion",
			name: "Formación",
			question: "Quiero que mi equipo ensaye un procedimiento antes del día que cuenta.",
			forWhom: "Organizaciones con un primer día, una secuencia o una norma cara de aprender en el puesto.",
			youGet: ["Un espacio 3D hecho con tu procedimiento", "Acceso por enlace, desde el móvil, el ordenador o unas gafas", "Un registro de lo que hizo cada persona"],
			cta: "Ver formación",
		},
		{
			path: "/hosting",
			name: "Mundos 3D",
			question: "Tengo un mundo 3D y necesito que esté siempre abierto.",
			forWhom: "Comunidades y organizaciones con un espacio propio y eventos de vez en cuando.",
			youGet: ["Tu mundo en tu dirección, con HTTPS", "Copia cada noche y refuerzo el día del evento", "Servidores en la UE, sin permanencia"],
			cta: "Ver alojamiento",
		},
	],
	note: "¿No encaja en ninguna? Cuéntanos qué buscas y te decimos si podemos ayudarte.",
};

const en: Doors = {
	title: "What do you need?",
	lead: "We do three things. Start with the one closest to what you are looking for.",
	items: [
		{
			path: "/experiencias",
			name: "Events",
			question: "I have an event and I want people to take part.",
			forWhom: "Conferences, forums and community gatherings, from 150 to over 3,000 people.",
			youGet: ["A participation system designed for your event", "A crew that runs it live", "A report, a map of the event and pieces made from what people contributed"],
			cta: "See events",
		},
		{
			path: "/formacion",
			name: "Training",
			question: "I want my team to rehearse a procedure before the day it counts.",
			forWhom: "Organisations with a first day, a sequence or a rule that is expensive to learn on the job.",
			youGet: ["A 3D space built from your procedure", "Access by link, from a phone, a computer or a headset", "A record of what each person did"],
			cta: "See training",
		},
		{
			path: "/hosting",
			name: "3D worlds",
			question: "I have a 3D world and it needs to stay open.",
			forWhom: "Communities and organisations with a space of their own and events now and then.",
			youGet: ["Your world at your address, with HTTPS", "A copy every night and a boost on event day", "Servers in the EU, no lock-in"],
			cta: "See hosting",
		},
	],
	note: "Doesn't fit any of them? Tell us what you are after and we will say whether we can help.",
};

export const DOORS: Record<SupportedLocale, Doors> = { es, en };
