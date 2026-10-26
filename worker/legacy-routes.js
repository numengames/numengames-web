// Rutas del catálogo previo al giro (metaverso / mundos 3D): pricing,
// team, portfolio, lore de Numinia, manifiesto, centro de ayuda,
// servicios y subpáginas, y la antigua página de Términos.
//
// Retiradas el 2026-09-11 como parte del giro a experiencias
// gamificadas para eventos en vivo (plan "Numen Games | Plan
// profesional de web revisado").
//
// FUENTE ÚNICA. La importan dos consumidores que deben coincidir:
//   1. worker/index.js     — responde 301 a la raíz.
//   2. astro.config.mjs    — las excluye del sitemap.
// Si divergen, el sitemap ofrece a indexación URLs que redirigen, que
// es justo el defecto que esta lista compartida existe para evitar.
//
// NOTA: "/es" y "/en" (la home por idioma) estuvieron aquí cuando lo
// único que había detrás era el mensaje de metaverso. Salieron al
// sustituirlas la home reconstruida (src/pages/[locale]/index.astro).
// No volver a añadirlas una vez existe contenido real en una ruta.
//
// Es una lista explícita, no un comodín sobre /es/ o /en/, para que el
// sitio reconstruido pueda reutilizar esos prefijos con rutas nuevas
// sin que esta lista estorbe. Quitar entradas según se reconstruyan.
export const LEGACY_REDIRECT_PATHS = ["/es/pricing", "/en/pricing", "/es/team", "/en/team", "/es/portfolio", "/en/portfolio", "/es/numinia", "/en/numinia", "/es/manifesto", "/en/manifesto", "/es/help-center", "/en/help-center", "/es/services", "/en/services", "/es/services/training", "/en/services/training", "/es/services/experience", "/en/services/experience", "/es/services/engage", "/en/services/engage", "/Term/terms"];

/** Quita una barra final (pero conserva la raíz "/"). */
export function normalizePath(pathname) {
	return pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}

const LEGACY_SET = new Set(LEGACY_REDIRECT_PATHS);

export function isLegacyPath(pathname) {
	return LEGACY_SET.has(normalizePath(pathname));
}
