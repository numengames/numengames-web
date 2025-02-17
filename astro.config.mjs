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
    server: {
      cors: true
    }
  },
  headers: {
    'Content-Security-Policy': `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval' https://app.spline.design https://dimensions-3d-viewer.cloudinary.com;
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: https:;
      frame-src 'self' https://app.spline.design https://dimensions-3d-viewer.cloudinary.com https://js.stripe.com;
      connect-src 'self' https://app.spline.design https://dimensions-3d-viewer.cloudinary.com;
    `
  }
});

// partytown({
//   config: {
//     forward: ["dataLayer.push"]
//   }
// }),
