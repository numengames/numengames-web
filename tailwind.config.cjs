/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          beige: "#F9EBDC", // N-Beige

          // LEGACY REMAP:
          // Mantenemos los nombres para no tocar componentes,
          // pero cambiamos el color real a dorado.
          coralRed: "#FFD961", // was #F35059
          darkRed: "#E6C357", // was #D33440 (hover/darker)

          panther: "#212123", // N-Panther
          mediterranean: "#A6DAD5", // N-Mediterranean

          // Opcional: alias explícito nuevo (si luego quieres migrar nombres)
          gold: "#FFD961",
        },

        supportDetails: {
          mediterranean: "#A6DAD5", // N-Mediterranean
          depthSea: "#018EA1", // N-DepthSea
          gold: "#EFA517", // se mantiene (no sé si lo usáis aparte)
        },

        opacity: {
          panther75: "#59595A", // N-Panther 75%
          panther50: "#909091", // N-Panther 50%
          panther25: "#C7C7C8", // N-Panther 25%

          // LEGACY: si estas variantes se usan como /75 etc, ahora no aplican al dorado.
          // No las cambio para no introducir efectos inesperados. Si salen en UI, las migramos luego.
          darkRed75: "#DE6770", // legacy
          darkRed50: "#E99AA0", // legacy
          darkRed25: "#F4CCCF", // legacy
        },

        basics: {
          black: "#000000", // Black
          darkGray: "#4D4D4D", // Dark Gray
          mediumGray: "#BEBEBE", // Medium Gray
          lightGray: "#D9D9D9", // Light Gray
          extraLightGray: "#EEEEEE", // Extra Light Gray
          almostWhite: "#FAFAFA", // Almost White
          white: "#FFFFFF", // White
        },

        light: {
          background: "#F9F3E8",
          text: "#212123",
          accent: "#FFD961",
          muted: "#59595A",
        },

        dark: {
          background: "#212123",
          text: "#F9EBDC",
          accent: "#FFD961",
          muted: "#909091",
        },
      },

      fontFamily: {
        geist: ["Geist", "serif"],
        geistMono: ["GeistMono", "serif"],
        IBMPlexMono: ["IBMPlexMono", "monospace"],
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
        portalEntrance: {
          "0%": { opacity: "0", transform: "scale(0.5) translateZ(-150px)" },
          "100%": { opacity: "1", transform: "scale(1) translateZ(0)" },
        },

        carousel: {
          "0%": {
            transform:
              "translateX(225px) rotateY(-15deg) translateZ(-200px) scale(0)",
            zIndex: "-1",
            opacity: "0",
          },
          "25%": {
            transform:
              "translateX(400px) rotateY(-15deg) translateZ(-300px) scale(0.7)",
            zIndex: "-1",
            opacity: "1",
          },
          "50%": {
            transform: "translateX(0) rotateY(0deg) translateZ(0) scale(1)",
            zIndex: "1",
            opacity: "1",
          },
          "75%": {
            transform:
              "translateX(-400px) rotateY(15deg) translateZ(-200px) scale(0.7)",
            zIndex: "-1",
            opacity: "1",
          },
          "100%": {
            transform:
              "translateX(-225px) rotateY(-15deg) translateZ(-200px) scale(0)",
            zIndex: "-1",
            opacity: "0",
          },
        },

        flowCarousel: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },

      animation: {
        portalEntrance: "portalEntrance 3s ease infinite",
        loading: "loading 10s linear infinite",
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