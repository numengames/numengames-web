/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	darkMode: "class",
	theme: {
		extend: {
			// ───────────────────────────────────────────────────────────────────
			// Sistema de Diseño de Numen Games v5.0.0 · tokens canónicos §19.3.
			// This block IS the palette. A colour that is not here does not exist:
			// never write a raw hex in a component (see CLAUDE.md).
			// Registro: Umbral · modo por defecto: Nocturno.
			// ───────────────────────────────────────────────────────────────────
			colors: {
				// Marca — máx. 3 por composición; coral y grana no coexisten.
				verdemar: "#A6DAD5",
				turquesa: "#018EA1",
				ambar: "#EFA517",
				arena: "#F9EBDC",
				coral: "#F35059",
				grana: "#D33440",

				// Variantes de texto sobre fondo claro.
				sobreClaro: {
					turquesa: "#016E7D",
					grana: "#B02330",
					ambar: "#7A5100",
					verdemar: "#1F6B5F",
				},

				// Rellenos de acción con texto claro · la interacción OSCURECE (§3.4, §9.1).
				interactivo: {
					DEFAULT: "#017C8D",
					hover: "#016E7D",
					activo: "#015866",
					destructivoHover: "#B02330",
				},

				enlace: {
					nocturno: "#A6DAD5",
					diurno: "#016E7D",
				},

				// Nocturno — el modo por defecto de la web.
				nocturno: {
					base: "#14110F",
					superficie: "#1E1A17",
					elevada: "#292420",
					lineaTenue: "#241F1B",
					lineaFuerte: "#3A332D",
					texto: "#F9EBDC",
					texto2: "#C4B5A6",
					texto3: "#8A7D72",
				},

				// Diurno — impresión y el tema claro del conmutador.
				diurno: {
					base: "#F9EBDC",
					superficie: "#FDF6EE",
					lineaTenue: "#E2D3C2",
					texto: "#14110F",
					texto2: "#4A423B",
					texto3: "#6E6259",
					tinteConfirmacion: "#EFE9DB",
					tinteAviso: "#F8D8CC",
					tinteCritico: "#F4D5C9",
					tinteInteractivo: "#DBE0D5",
				},

				// Paleta de datos §3.8 — gráficas, máx. 6 series. Nunca la de rareza.
				datos: {
					1: "#018EA1",
					2: "#EFA517",
					3: "#A6DAD5",
					4: "#D33440",
					5: "#8FC46B",
					6: "#8A7D72",
				},
			},

			// §4 · dos voces y solo dos: Geist afirma, Geist Mono mide.
			// Both self-hosted (public/fonts). No Inter, no IBM Plex, no CDN.
			fontFamily: {
				geist: ["Geist", "Inter", "Aptos", "Segoe UI", "Arial", "sans-serif"],
				geistMono: ["Geist Mono", "Consolas", "Courier New", "monospace"],
			},

			// §5 · dos radios y solo dos: control y marco.
			borderRadius: {
				control: "6px",
				marco: "8px",
			},

			// §10 · duraciones y curva del catálogo de movimiento.
			transitionDuration: {
				instante: "120ms",
				corto: "200ms",
				medio: "320ms",
				largo: "560ms",
			},

			transitionTimingFunction: {
				ciclo: "cubic-bezier(0.2, 0, 0, 1)",
			},

			fontWeight: {
				thin: "100",
				extralight: "200",
				light: "300",
				normal: "400",
				medium: "500",
				semibold: "600",
				bold: "700",
				extrabold: "800",
				black: "900",
			},

			fontSize: {
				// Desktop font sizes
				h1L: ["5rem", { lineHeight: "120%" }], // 80px/120%
				h1M: ["4rem", { lineHeight: "120%" }], // 64px/120%
				h2: ["3rem", { lineHeight: "120%" }], // 48px/120%
				h3: ["2.5rem", { lineHeight: "120%" }], // 40px/120%
				h4: ["2rem", { lineHeight: "120%" }], // 32px/120%
				h5: ["1.5rem", { lineHeight: "120%" }], // 24px/120%
				h6: ["1rem", { lineHeight: "120%" }], // 16px/120%

				// Desktop text sizes
				"text-lg": ["1.5rem", { lineHeight: "150%" }], // 24px/150%
				"text-md": ["1.25rem", { lineHeight: "150%" }], // 20px/150%
				"text-base": ["1rem", { lineHeight: "150%" }], // 16px/150%
				"text-sm": ["0.875rem", { lineHeight: "150%" }], // 14px/150%
				"text-xs": ["0.75rem", { lineHeight: "150%" }], // 12px/150%

				// Mobile font sizes
				"mobile-h1L": ["3rem", { lineHeight: "120%" }], // 48px/120%
				"mobile-h1M": ["2.5rem", { lineHeight: "120%" }], // 40px/120%
				"mobile-h2": ["2rem", { lineHeight: "120%" }], // 32px/120%
				"mobile-h3": ["1.5rem", { lineHeight: "120%" }], // 24px/120%
				"mobile-h4": ["1.25rem", { lineHeight: "120%" }], // 20px/120%
				"mobile-h5": ["1rem", { lineHeight: "120%" }], // 16px/120%
				"mobile-h6": ["0.875rem", { lineHeight: "120%" }], // 14px/120%

				// Mobile text sizes
				"mobile-text-lg": ["1.25rem", { lineHeight: "150%" }], // 20px/150%
				"mobile-text-md": ["1.125rem", { lineHeight: "150%" }], // 18px/150%
				"mobile-text-base": ["1rem", { lineHeight: "150%" }], // 16px/150%
				"mobile-text-sm": ["0.875rem", { lineHeight: "150%" }], // 14px/150%
				"mobile-text-xs": ["0.875rem", { lineHeight: "150%" }], // 14px/150%
			},

			perspective: {
				none: "0",
				sm: "600px",
				md: "800px",
				lg: "1000px",
				xl: "1200px",
			},

			perspectiveOrigin: {
				center: "center",
				top: "top",
				"top-left": "top left",
				"top-right": "top right",
				bottom: "bottom",
				"bottom-left": "bottom left",
				"bottom-right": "bottom right",
			},

			keyframes: {
				flowCarousel: {
					"0%": { transform: "translateX(0)" },
					"100%": { transform: "translateX(-50%)" },
				},
			},

			animation: {
				flowCarousel: "flowCarousel 64s linear infinite",
			},

			transitionDelay: {
				"0ms": "0ms",
				"200ms": "200ms",
				"400ms": "400ms",
				"600ms": "600ms",
			},

			screens: {
				"3xl": "1920px",
			},
		},
	},
};
