import icon from "astro-icon";
import mdx from "@astrojs/mdx";
import svelte from '@astrojs/svelte';
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import cookieConsent from "@jop-software/astro-cookieconsent";


// https://astro.build/config
export default defineConfig({
  site: "https://numen.games",
  integrations: [
    tailwind(), 
    icon({
      iconDir: "public/icons",
    }), 
    mdx(), 
    sitemap(), 
    svelte()
  ],
  vite: {
    resolve: {
      alias: {
        '@lib': '/src/lib',
        '@utils': '/src/utils',
        '@components': '/src/components',
        '@icons': '/src/icons',
        '@layouts': '/src/layouts',
        '@scripts': '/src/scripts',
        '@assets': '/src/assets',
        '@pages': '/src/pages',
        '@constants': '/src/constants',
        '@types': '/src/types',
      }
    }
  }
});

// partytown({
//   config: {
//     forward: ["dataLayer.push"]
//   }
// }),
