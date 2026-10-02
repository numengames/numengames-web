import { isLegacyPath } from "./legacy-routes.js";
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from "./locales.js";

/**
 * Cabeceras de seguridad de toda respuesta del Worker: páginas, ficheros,
 * 404 y redirecciones (auditoría del 2026-10-02: no había ninguna).
 *
 * La CSP se ajusta a lo que el build publica de verdad: todo el JS, el CSS
 * y las fuentes salen del propio dominio (_astro/); Astro y el aviso de
 * cookies dejan scripts y estilos inline, de ahí 'unsafe-inline'; no hay
 * fetch a otros dominios ni iframes. Los formularios no envían a ningún
 * servicio: abren un mailto: (form-action lo permite por si un día lo
 * hacen con action=). Si se añade un origen externo, se añade aquí.
 */
export const SECURITY_HEADERS = Object.freeze({
	"Strict-Transport-Security": "max-age=31536000; includeSubDomains",
	"X-Content-Type-Options": "nosniff",
	"Referrer-Policy": "strict-origin-when-cross-origin",
	"Permissions-Policy": "camera=(), microphone=(), geolocation=()",
	"X-Frame-Options": "DENY",
	"Content-Security-Policy": ["default-src 'self'", "script-src 'self' 'unsafe-inline'", "style-src 'self' 'unsafe-inline'", "img-src 'self' data: https:", "font-src 'self'", "connect-src 'self'", "frame-ancestors 'none'", "base-uri 'self'", "form-action 'self' mailto:", "object-src 'none'"].join("; "),
});

// wrangler dev sirve por http://localhost; redirigirlo a https lo rompería.
const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "[::1]"]);

/** Copia la respuesta (las de fetch/redirect son inmutables) con las cabeceras. */
function withSecurityHeaders(response) {
	const secured = new Response(response.body, response);
	for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
		secured.headers.set(name, value);
	}
	return secured;
}

/**
 * Elige idioma a partir de Accept-Language.
 *
 * Devuelve el idioma soportado de mayor q-value. Si la cabecera falta,
 * está vacía o no cita ninguno de los soportados, cae a DEFAULT_LOCALE.
 * Deliberadamente tolerante: una cabecera mal formada nunca debe dejar
 * a nadie sin home.
 */
export function pickLocale(acceptLanguage) {
	if (!acceptLanguage) return DEFAULT_LOCALE;

	const ranked = acceptLanguage
		.split(",")
		.map((part) => {
			const [tag, ...params] = part.trim().split(";");
			const qParam = params.find((p) => p.trim().startsWith("q="));
			const q = qParam ? Number.parseFloat(qParam.trim().slice(2)) : 1;
			return {
				// "es-ES" -> "es"; el subtag de región no nos interesa.
				base: tag.trim().toLowerCase().split("-")[0],
				q: Number.isFinite(q) ? q : 0,
			};
		})
		// q=0 significa "explícitamente no quiero este idioma".
		.filter((entry) => entry.q > 0 && SUPPORTED_LOCALES.includes(entry.base))
		.sort((a, b) => b.q - a.q);

	return ranked.length > 0 ? ranked[0].base : DEFAULT_LOCALE;
}

export default {
	async fetch(request, env) {
		return withSecurityHeaders(await route(request, env));
	},
};

async function route(request, env) {
	const url = new URL(request.url);

	// Antes que nada: quien llega por http:// se va a https:// con la
	// misma ruta y la misma query. Las reglas de abajo ya solo ven https.
	if (url.protocol === "http:" && !LOCAL_HOSTS.has(url.hostname)) {
		url.protocol = "https:";
		return Response.redirect(url.toString(), 301);
	}

	if (url.hostname === "www.numen.games") {
		url.hostname = "numen.games";
		return Response.redirect(url.toString(), 301);
	}

	// La raíz no tiene contenido propio: el sitio vive bajo /es/ y /en/.
	// 302 (no 301) porque la elección depende del visitante — cachear
	// esto de forma permanente serviría el idioma equivocado al
	// siguiente. Vary avisa a las cachés intermedias por la misma razón.
	if (url.pathname === "/") {
		const locale = pickLocale(request.headers.get("Accept-Language"));
		return new Response(null, {
			status: 302,
			headers: {
				Location: new URL(`/${locale}/`, url).toString(),
				Vary: "Accept-Language",
				"Cache-Control": "no-store",
			},
		});
	}

	if (isLegacyPath(url.pathname)) {
		return Response.redirect(new URL("/", url).toString(), 301);
	}

	return env.ASSETS.fetch(request);
}
