// /version.json — el sello de identidad del build.
//
// POR QUÉ EXISTE. Sin esto no hay forma de saber desde fuera qué commit
// sirve el dominio. numinia.org estuvo ocho días sirviendo un build
// viejo tras una desconexión silenciosa de Workers Builds y nada avisó
// (nota de corrección en numinia-nwos/web/wrangler.toml, 2026-08-25).
// Con el sello:
//
//   curl -s https://numen.games/version.json | jq -r .commit
//
// responde en un segundo y se compara con el HEAD de main. Mismo
// contrato que numinia.com (que lo sella en su workflow de deploy).
// Aquí no hay workflow — Workers Builds construye directamente desde el
// repo, conectado en Cloudflare — así que el sello se emite como endpoint.
//
// El SHA lo inyecta Workers Builds en el entorno de build como
// WORKERS_CI_COMMIT_SHA. En local no existe y el valor es "local": eso
// es exactamente lo que delataría un despliegue hecho a mano desde un
// portátil en lugar de desde CI.
//
// Nota de implementación: ha de ser un endpoint (.ts), no una página
// .astro. Con build.format "directory" — el de este proyecto — una
// página llamada version.json.astro genera dist/version.json/index.html,
// un directorio, y la URL /version.json no devuelve JSON.
export const prerender = true;

export function GET() {
	const commit = process.env.WORKERS_CI_COMMIT_SHA ?? "local";
	const body = JSON.stringify({
		commit,
		builtAt: new Date().toISOString(),
	});

	return new Response(body, {
		headers: {
			"Content-Type": "application/json; charset=utf-8",
			// Nota verificada con `wrangler dev`: el servidor de assets de
			// Cloudflare sobrescribe esta cabecera por
			// "public, max-age=0, must-revalidate". El efecto buscado se
			// mantiene — se revalida en cada petición, nunca se sirve una
			// copia rancia — pero el valor que llega al cliente no es este.
			"Cache-Control": "no-store",
		},
	});
}
