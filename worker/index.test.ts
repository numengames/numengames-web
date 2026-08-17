import { describe, expect, it, vi } from "vitest";
import worker from "./index.js";

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

		expect(res).toBe(assetsResponse);
		expect(env.ASSETS.fetch).toHaveBeenCalledWith(request);
	});

	it("serves static assets for any non-www hostname (workers.dev previews)", async () => {
		const env = makeEnv();
		await worker.fetch(new Request("https://numengames-web.example.workers.dev/"), env);

		expect(env.ASSETS.fetch).toHaveBeenCalledOnce();
	});
});
