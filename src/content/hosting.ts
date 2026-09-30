// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: AGPL-3.0-only
//
// numen.games/hosting — alojamiento de mundos 3D (Hyperfy 2). Cada frase
// describe lo que la infraestructura hace hoy (numinia-k8s/ovh): un
// contenedor por mundo en un servidor de OVH en Francia, HTTPS, copia cada
// noche y el mundo exportable con todo lo necesario para correr fuera. No
// hay cifra de precio hasta que el Oráculo la fije; el test lo vigila.
import type { SupportedLocale } from "@lib/locale";

export interface HostingPlan {
	name: string;
	forWhom: string;
	includes: string[];
}

export interface HostingPage {
	title: string;
	lead: string;
	whatTitle: string;
	whatBody: string;
	includedTitle: string;
	included: { title: string; body: string }[];
	plansTitle: string;
	plans: HostingPlan[];
	stepsTitle: string;
	steps: string[];
	priceTitle: string;
	priceBody: string;
	ctaTitle: string;
	cta: string;
}

const es: HostingPage = {
	title: "Alojamiento de mundos",
	lead: "Alojamos tu mundo 3D para que esté siempre disponible en tu dirección, se abra desde el navegador sin instalar nada y aguante tus eventos.",
	whatTitle: "Qué alojamos",
	whatBody: "Mundos hechos con Hyperfy 2: espacios 3D que se visitan desde un móvil, un ordenador o unas gafas de realidad virtual, con un enlace. Casi siempre están tranquilos y de vez en cuando se llenan con un evento; el servicio está pensado para eso.",
	includedTitle: "Qué incluye",
	included: [
		{
			title: "Tu dirección",
			body: "Tu mundo en un subdominio nuestro o en tu propio dominio, con HTTPS.",
		},
		{
			title: "Copia cada noche",
			body: "Guardamos una copia de tu mundo cada noche y las conservamos dos semanas.",
		},
		{
			title: "Preparado para tus eventos",
			body: "Avísanos de la fecha y le damos más potencia a tu mundo ese día.",
		},
		{
			title: "Tu mundo es tuyo",
			body: "Cuando quieras te entregamos tu mundo completo, con las instrucciones para ponerlo en marcha en cualquier otro sitio.",
		},
		{
			title: "Servidores en Europa",
			body: "Tu mundo vive en servidores de OVHcloud en Francia.",
		},
	],
	plansTitle: "Dos formas de alojarlo",
	plans: [
		{
			name: "Mundo",
			forWhom: "Para un espacio propio que recibe visitas y algún evento al mes.",
			includes: ["Tu mundo en un servidor compartido, con su potencia reservada", "Tu dirección con HTTPS", "Copia cada noche", "Refuerzo el día de tus eventos, con aviso"],
		},
		{
			name: "Mundo dedicado",
			forWhom: "Para eventos grandes o frecuentes, o si necesitas tu propio servidor.",
			includes: ["Un servidor solo para tu organización", "Todo lo del plan Mundo", "Dimensionado según tu público"],
		},
	],
	stepsTitle: "Cómo empezamos",
	steps: ["Nos cuentas qué mundo es, a quién recibe y cuándo tiene eventos.", "Te proponemos el plan y te decimos qué dirección apuntar hacia nosotros.", "Si ya tienes el mundo en otro sitio, lo traemos nosotros.", "Tu mundo queda en marcha en tu dirección."],
	priceTitle: "Precio",
	priceBody: "Una cuota mensual según el plan. Te la decimos en la propuesta, con los impuestos aparte.",
	ctaTitle: "¿Alojamos tu mundo?",
	cta: "Hablar del alojamiento",
};

const en: HostingPage = {
	title: "World hosting",
	lead: "We host your 3D world so it is always there at your address, opens in the browser with nothing to install, and holds up during your events.",
	whatTitle: "What we host",
	whatBody: "Worlds made with Hyperfy 2: 3D spaces visited from a phone, a computer or a VR headset, with a link. They are quiet most of the time and fill up now and then for an event; the service is built for that.",
	includedTitle: "What is included",
	included: [
		{
			title: "Your address",
			body: "Your world on one of our subdomains or on your own domain, with HTTPS.",
		},
		{
			title: "A copy every night",
			body: "We keep a copy of your world every night and hold them for two weeks.",
		},
		{
			title: "Ready for your events",
			body: "Tell us the date and we give your world more power that day.",
		},
		{
			title: "Your world is yours",
			body: "Whenever you want, we hand you your complete world, with the instructions to run it anywhere else.",
		},
		{
			title: "Servers in Europe",
			body: "Your world lives on OVHcloud servers in France.",
		},
	],
	plansTitle: "Two ways to host it",
	plans: [
		{
			name: "World",
			forWhom: "For a space of your own that gets visitors and an event now and then.",
			includes: ["Your world on a shared server, with its power reserved", "Your address with HTTPS", "A copy every night", "A boost on your event days, with notice"],
		},
		{
			name: "Dedicated world",
			forWhom: "For large or frequent events, or if you need a server of your own.",
			includes: ["A server for your organisation alone", "Everything in the World plan", "Sized to your audience"],
		},
	],
	stepsTitle: "How we start",
	steps: ["You tell us which world it is, who visits it and when it has events.", "We propose the plan and tell you which address to point at us.", "If your world already lives somewhere else, we bring it over.", "Your world is up at your address."],
	priceTitle: "Price",
	priceBody: "A monthly fee by plan. We give it in the proposal, with taxes shown separately.",
	ctaTitle: "Shall we host your world?",
	cta: "Talk about hosting",
};

export const HOSTING: Record<SupportedLocale, HostingPage> = { es, en };
