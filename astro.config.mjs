import icon from "astro-icon";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import { defineConfig } from "astro/config";
import cookieConsent from "@jop-software/astro-cookieconsent";
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
	site: "https://numen.games",
	integrations: [
		icon({
			iconDir: "public/icons",
		}),
		mdx(),
		sitemap(),
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
							description: "Our website uses cookies and similar technologies to enable essential services and functionalities on our site and to collect data on how visitors interact with our site, products, and services. By clicking 'Accept all cookies', you agree that we can use these tools for advertising, analytical, and support purposes, and you consent to their use. Please see our Cookie Policy and Privacy Policy for more information.",
							acceptAllBtn: "Accept all",
							acceptNecessaryBtn: "Reject all",
							footer: '<a href="https://statics.numinia.xyz/cookies-policy-2024-05-09.pdf">Privacy Policy</a>\n<a href="https://statics.numinia.xyz/terms_and_conditions_2024_05_09.pdf">Terms and conditions</a>',
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
									description: "We use cookies and similar technologies to improve your browsing experience, personalise content and ads, provide social media features, and analyse our traffic.",
								},
								{
									title: 'Strictly Necessary Cookies <span class="pm__badge">Always Enabled</span>',
									description: "These cookies are essential for the website to function properly. They enable core features such as security, session management, and accessibility. They cannot be disabled.",
									linkedCategory: "necessary",
								},
								{
									title: "Analytics Cookies",
									description: "These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve the site experience.",
									linkedCategory: "analytics",
								},
								{
									title: "More information",
									description: 'For any queries about our cookie policy and your choices, please <a class="cc__link" href="mailto:hello@numen.games">contact us</a>.',
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
				"@app-types": "/src/types",
			},
		},
	},
});
