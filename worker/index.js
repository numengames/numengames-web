export default {
	async fetch(request, env) {
		const url = new URL(request.url);

		if (url.hostname === "www.numen.games") {
			url.hostname = "numen.games";
			return Response.redirect(url.toString(), 301);
		}

		return env.ASSETS.fetch(request);
	},
};
