import icon from "astro-icon";
import mdx from "@astrojs/mdx";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import cookieConsent from "@jop-software/astro-cookieconsent";
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  site: "https://numen.games",
  integrations: [
    tailwind(),
    icon({
      iconDir: "public/icons",
    }),
    mdx(),
    // sitemap(), // PROVISIONAL OFF: avoids build crash in @astrojs/sitemap
    svelte(),
    cookieConsent({
      categories: {
        necessary: {
          enabled: true,
          readOnly: true,
        },
        analytics: {},
      },
      image: {
        alt: "",
      },
      language: {
        default: "en",
        translations: {
          en: {
            consentModal: {
              title: "We use cookies!",
              description:
                "Our website uses cookies and similar technologies to enable essential services and functionalities on our site and to collect data on how visitors interact with our site, products, and services. By clicking 'Accept all cookies', you agree that we can use these tools for advertising, analytical, and support purposes, and you consent to their use. Please see our Cookie Policy and Privacy Policy for more information.",
              acceptAllBtn: "Accept all",
              acceptNecessaryBtn: "Reject all",
              footer:
                '<a href="https://statics.numinia.xyz/cookies-policy-2024-05-09.pdf">Privacy Policy</a>\n<a href="https://statics.numinia.xyz/terms_and_conditions_2024_05_09.pdf">Terms and conditions</a>',
            },
            preferencesModal: {
              title: "Consent Preferences Center",
              acceptAllBtn: "Accept all",
              acceptNecessaryBtn: "Reject all",
              savePreferencesBtn: "Save preferences",
              closeIconLabel: "Close modal",
              serviceCounterLabel: "Service|Services",
              sections: [
                {
                  title: "Cookie Usage",
                  description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                },
                {
                  title:
                    'Strictly Necessary Cookies <span class="pm__badge">Always Enabled</span>',
                  description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                  linkedCategory: "necessary",
                },
                {
                  title: "Analytics Cookies",
                  description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                  linkedCategory: "analytics",
                },
                {
                  title: "More information",
                  description:
                    'For any query in relation to my policy on cookies and your choices, please <a class="cc__link" href="#yourdomain.com">contact me</a>.',
                },
              ],
            },
          },
        },
      },
    }),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
  vite: {
    resolve: {
      alias: {
        "@lib": "/src/lib",
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