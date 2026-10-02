import icon from "astro-icon";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import { defineConfig } from "astro/config";
import { LEGACY_REDIRECT_PATHS, normalizePath } from "./worker/legacy-routes.js";

// El sitemap no debe ofrecer a indexación lo que el Worker responde con
// 301, ni /version.json (sello de build, no contenido), ni las páginas
// de error, ni la raíz (302 por idioma: un sitemap no debe listar una
// URL que redirige). Las rutas legacy vienen de worker/legacy-routes.js,
// la misma lista que usa el Worker: una sola fuente, imposible que
// diverjan y que el sitemap acabe ofreciendo URLs que responden 301.
const excludedFromSitemap = new Set([
  ...LEGACY_REDIRECT_PATHS,
  "/version.json",
  "/",
  "/es/404",
  "/en/404",
]);

// https://astro.build/config
export default defineConfig({
  site: "https://numen.games",
  integrations: [
    icon({
      iconDir: "public/icons",
    }),
    mdx(),
    sitemap({
      filter: (page) => {
        // `page` llega como URL absoluta; comparamos solo la ruta.
        const path = normalizePath(new URL(page).pathname);
        return !excludedFromSitemap.has(path);
      },
    }),
    svelte(),
  ],
  vite: {
    resolve: {
      alias: {
        "@lib": "/src/lib",
        "@content": "/src/content",
        "@styles": "/src/styles",
        "@utils": "/src/utils",
        "@components": "/src/components",
        "@icons": "/src/icons",
        "@layouts": "/src/layouts",
        "@scripts": "/src/scripts",
        "@assets": "/src/assets",
        "@pages": "/src/pages",
        "@constants": "/src/constants",
        "@types": "/src/types",
      },
    },
  },
});
