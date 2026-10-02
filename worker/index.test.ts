import { describe, expect, it, vi } from "vitest";
import worker, { pickLocale, SECURITY_HEADERS } from "./index.js";
import { LEGACY_REDIRECT_PATHS } from "./legacy-routes.js";
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from "./locales.js";
import {
	SUPPORTED_LOCALES as SITE_LOCALES,
	DEFAULT_LOCALE as SITE_DEFAULT,
} from "../src/lib/locale.ts";

const makeEnv = (assetsResponse = new Response("asset")) => ({
	ASSETS: { fetch: vi.fn(async () => assetsResponse) },
});

describe("worker fetch handler", () => {
	it("redirects www.numen.games to the apex domain with a 301", async () => {
		const env = makeEnv();
		const res = await worker.fetch(new Request("https://www.numen.games/"), env);

		expect(res.status).toBe(301);
		expect(res.headers.get("location")).toBe("https://numen.games/");
		expect(env.ASSETS.fetch).not.toHaveBeenCalled();
	});

	it("preserves path and query string on the www redirect", async () => {
		const env = makeEnv();
		const res = await worker.fetch(
			new Request("https://www.numen.games/es/contact?ref=x"),
			env,
		);

		expect(res.status).toBe(301);
		expect(res.headers.get("location")).toBe("https://numen.games/es/contact?ref=x");
	});

	it("serves static assets for the apex domain", async () => {
		const assetsResponse = new Response("hello");
		const env = makeEnv(assetsResponse);
		const request = new Request("https://numen.games/es/");
		const res = await worker.fetch(request, env);

		expect(await res.text()).toBe("hello");
		expect(env.ASSETS.fetch).toHaveBeenCalledWith(request);
	});

	it("serves static assets for any non-www hostname (workers.dev previews)", async () => {
		const env = makeEnv();
		await worker.fetch(
			new Request("https://numengames-web.example.workers.dev/es/"),
			env,
		);

		expect(env.ASSETS.fetch).toHaveBeenCalledOnce();
	});

	// El sitio no tiene contenido en "/": vive bajo /es/ y /en/. Hasta el
	// 2026-09-11 la raíz servía la página "Coming Soon" del catálogo
	// anterior, que era lo que veía cualquiera que escribiese el dominio.
	describe("apex root language redirect", () => {
		const rootRequest = (acceptLanguage) =>
			new Request(
				"https://numen.games/",
				acceptLanguage ? { headers: { "Accept-Language": acceptLanguage } } : undefined,
			);

		it("redirects / to the default locale when there is no Accept-Language", async () => {
			const env = makeEnv();
			const res = await worker.fetch(rootRequest(), env);

			expect(res.status).toBe(302);
			expect(res.headers.get("location")).toBe(`https://numen.games/${DEFAULT_LOCALE}/`);
			expect(env.ASSETS.fetch).not.toHaveBeenCalled();
		});

		it("honours an English Accept-Language", async () => {
			const env = makeEnv();
			const res = await worker.fetch(rootRequest("en-GB,en;q=0.9"), env);

			expect(res.headers.get("location")).toBe("https://numen.games/en/");
		});

		it("honours a Spanish Accept-Language", async () => {
			const env = makeEnv();
			const res = await worker.fetch(rootRequest("es-ES,es;q=0.9,en;q=0.8"), env);

			expect(res.headers.get("location")).toBe("https://numen.games/es/");
		});

		// 301 lo cachearían navegadores e intermediarios de forma permanente,
		// sirviendo a un visitante el idioma elegido para otro.
		it("uses 302 + Vary: Accept-Language so the choice is never cached as permanent", async () => {
			const env = makeEnv();
			const res = await worker.fetch(rootRequest("en"), env);

			expect(res.status).toBe(302);
			expect(res.headers.get("vary")).toBe("Accept-Language");
			expect(res.headers.get("cache-control")).toBe("no-store");
		});

		it("redirects the www root to the apex first, not to a locale", async () => {
			const env = makeEnv();
			const res = await worker.fetch(
				new Request("https://www.numen.games/", { headers: { "Accept-Language": "en" } }),
				env,
			);

			expect(res.status).toBe(301);
			expect(res.headers.get("location")).toBe("https://numen.games/");
		});
	});

	describe("pickLocale", () => {
		it("falls back to the default locale on missing or empty headers", () => {
			expect(pickLocale(null)).toBe(DEFAULT_LOCALE);
			expect(pickLocale("")).toBe(DEFAULT_LOCALE);
		});

		it("falls back to the default locale when no supported language is cited", () => {
			expect(pickLocale("de-DE,de;q=0.9,fr;q=0.8")).toBe(DEFAULT_LOCALE);
		});

		it("ignores the region subtag", () => {
			expect(pickLocale("en-US")).toBe("en");
			expect(pickLocale("es-419")).toBe("es");
		});

		it("respects q-values rather than document order", () => {
			expect(pickLocale("es;q=0.2,en;q=0.9")).toBe("en");
			expect(pickLocale("en;q=0.3,es;q=0.7")).toBe("es");
		});

		it("treats q=0 as an explicit rejection", () => {
			expect(pickLocale("en;q=0,es;q=0.5")).toBe("es");
		});

		it("does not crash on malformed headers", () => {
			expect(SUPPORTED_LOCALES).toContain(pickLocale(";;;q=,,"));
			expect(SUPPORTED_LOCALES).toContain(pickLocale("en;q=notanumber"));
		});
	});

	describe("legacy catalog deprecation (2026-09-11)", () => {
		// La lista viaja desde worker/legacy-routes.js, que es también la que
		// consume astro.config.mjs para excluirlas del sitemap. Enumerarla
		// aquí a mano dejaría que sitemap y redirecciones divergiesen en
		// silencio, que es el defecto que la lista compartida evita.
		const legacyPaths = [...LEGACY_REDIRECT_PATHS, "/Term/terms/"];

		it.each(legacyPaths)("redirects legacy path %s to the apex with a 301", async (path) => {
			const env = makeEnv();
			const res = await worker.fetch(new Request(`https://numen.games${path}`), env);

			expect(res.status).toBe(301);
			expect(res.headers.get("location")).toBe("https://numen.games/");
			expect(env.ASSETS.fetch).not.toHaveBeenCalled();
		});

		it("covers the whole deprecated catalog, not a subset", () => {
			expect(LEGACY_REDIRECT_PATHS.length).toBe(21);
		});

		it("does not redirect unrelated paths that merely share a prefix", async () => {
			const env = makeEnv();
			await worker.fetch(new Request("https://numen.games/es/experiencias"), env);

			expect(env.ASSETS.fetch).toHaveBeenCalledOnce();
		});

		it("does not redirect the rebuilt localized home (/es/, /en/)", async () => {
			for (const path of ["/es", "/es/", "/en", "/en/"]) {
				const env = makeEnv();
				await worker.fetch(new Request(`https://numen.games${path}`), env);

				expect(env.ASSETS.fetch).toHaveBeenCalledOnce();
			}
		});
	});

	// worker/locales.js duplica los valores de src/lib/locale.ts porque el
	// Worker se empaqueta sin el resolvedor de TypeScript de Astro. Esta
	// prueba es la que impide que la duplicación se convierta en divergencia.
	describe("locale lists stay in sync with the site", () => {
		it("supports exactly the same locales as src/lib/locale.ts", () => {
			expect([...SUPPORTED_LOCALES].sort()).toEqual([...SITE_LOCALES].sort());
		});

		it("uses the same default locale as src/lib/locale.ts", () => {
			expect(DEFAULT_LOCALE).toBe(SITE_DEFAULT);
		});
	});

	// Auditoría del 2026-10-02: numen.games respondía por http:// sin
	// redirigir y sin ninguna cabecera de seguridad.
	describe("https and security headers (audit 2026-10-02)", () => {
		const expectSecurityHeaders = (res) => {
			expect(res.headers.get("strict-transport-security")).toBe("max-age=31536000; includeSubDomains");
			expect(res.headers.get("x-content-type-options")).toBe("nosniff");
			expect(res.headers.get("referrer-policy")).toBe("strict-origin-when-cross-origin");
			expect(res.headers.get("permissions-policy")).toBe("camera=(), microphone=(), geolocation=()");
			expect(res.headers.get("x-frame-options")).toBe("DENY");
			const csp = res.headers.get("content-security-policy");
			expect(csp).toContain("default-src 'self'");
			expect(csp).toContain("frame-ancestors 'none'");
			expect(csp).toContain("object-src 'none'");
			expect(csp).toContain("base-uri 'self'");
		};

		it("redirects http:// to https:// with a 301, keeping host, path and query", async () => {
			const env = makeEnv();
			const res = await worker.fetch(new Request("http://numen.games/es/contacto?ref=x"), env);

			expect(res.status).toBe(301);
			expect(res.headers.get("location")).toBe("https://numen.games/es/contacto?ref=x");
			expect(env.ASSETS.fetch).not.toHaveBeenCalled();
			expectSecurityHeaders(res);
		});

		it("sends http://www straight to https:// (the www rule then runs over https)", async () => {
			const env = makeEnv();
			const res = await worker.fetch(new Request("http://www.numen.games/en/"), env);

			expect(res.status).toBe(301);
			expect(res.headers.get("location")).toMatch(/^https:\/\//);
		});

		it("does not redirect local development hosts (wrangler dev serves http)", async () => {
			const env = makeEnv();
			await worker.fetch(new Request("http://localhost:8787/es/"), env);
			await worker.fetch(new Request("http://127.0.0.1:8787/es/"), env);

			expect(env.ASSETS.fetch).toHaveBeenCalledTimes(2);
		});

		it("adds the security headers to asset responses, keeping status and the asset's own headers", async () => {
			const env = makeEnv(
				new Response("<h1>404</h1>", {
					status: 404,
					headers: { "Content-Type": "text/html", "Cache-Control": "max-age=60" },
				}),
			);
			const res = await worker.fetch(new Request("https://numen.games/nope"), env);

			expect(res.status).toBe(404);
			expect(res.headers.get("content-type")).toBe("text/html");
			expect(res.headers.get("cache-control")).toBe("max-age=60");
			expectSecurityHeaders(res);
		});

		it("adds the security headers to every redirect the Worker emits", async () => {
			for (const url of ["https://www.numen.games/", "https://numen.games/", `https://numen.games${LEGACY_REDIRECT_PATHS[0]}`]) {
				const res = await worker.fetch(new Request(url), makeEnv());
				expect(res.status).toBeGreaterThanOrEqual(301);
				expect(res.status).toBeLessThanOrEqual(302);
				expect(res.headers.get("location")).toMatch(/^https:\/\//);
				expectSecurityHeaders(res);
			}
		});

		it("keeps the root redirect's Vary and Cache-Control alongside the security headers", async () => {
			const res = await worker.fetch(new Request("https://numen.games/"), makeEnv());

			expect(res.headers.get("vary")).toBe("Accept-Language");
			expect(res.headers.get("cache-control")).toBe("no-store");
			expectSecurityHeaders(res);
		});

		it("exports the header set so the policy has one source", () => {
			expect(Object.keys(SECURITY_HEADERS)).toHaveLength(6);
		});
	});
});
