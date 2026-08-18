import { describe, it, expect } from "vitest";
import { getLocaleFromURL, getLocalizedURL, getLocaleStaticPaths, DEFAULT_LOCALE } from "./index";

describe("getLocaleFromURL", () => {
	it("returns 'es' for Spanish URLs", () => {
		expect(getLocaleFromURL("/es/servicios")).toBe("es");
		expect(getLocaleFromURL("/es/")).toBe("es");
		expect(getLocaleFromURL("/es")).toBe("es");
	});

	it("returns 'en' for English URLs", () => {
		expect(getLocaleFromURL("/en/services")).toBe("en");
		expect(getLocaleFromURL("/en/")).toBe("en");
	});

	it("returns default locale for URLs without locale prefix", () => {
		expect(getLocaleFromURL("/")).toBe(DEFAULT_LOCALE);
		expect(getLocaleFromURL("/about")).toBe(DEFAULT_LOCALE);
	});
});

describe("getLocalizedURL", () => {
	it("replaces existing locale prefix", () => {
		expect(getLocalizedURL("/en/services", "es")).toBe("/es/services");
		expect(getLocalizedURL("/es/servicios", "en")).toBe("/en/servicios");
	});

	it("adds locale prefix when none exists", () => {
		expect(getLocalizedURL("/services", "en")).toBe("/en/services");
		expect(getLocalizedURL("/services", "es")).toBe("/es/services");
	});

	it("handles root path", () => {
		expect(getLocalizedURL("/", "es")).toBe("/es/");
		expect(getLocalizedURL("/", "en")).toBe("/en/");
	});
});

describe("getLocaleStaticPaths", () => {
	it("returns paths for all supported locales", () => {
		const paths = getLocaleStaticPaths();
		expect(paths).toHaveLength(2);
		expect(paths).toContainEqual({ params: { locale: "en" } });
		expect(paths).toContainEqual({ params: { locale: "es" } });
	});
});
