// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: AGPL-3.0-only
//
// Lo que el pie de página declara sobre sí mismo: qué versión y qué commit
// del sitio estás viendo. Mismo contrato que numinia.org
// (numinia-nwos/web/src/lib/build-info.ts) y que /version.json de este
// repositorio: el SHA lo inyecta el deploy como WORKERS_CI_COMMIT_SHA; en
// local no existe y se degrada a "dev" sin romper el build.
//
// Ninguno de los dos valores se escribe a mano.
import pkg from "../../package.json";

/** Semver de package.json. El único sitio donde se mantiene el número. */
export const VERSION: string = `v${pkg.version}`;

/** SHA corto del commit, o "dev" fuera de CI. */
export const COMMIT_SHA: string = (() => {
	const sha = process.env.WORKERS_CI_COMMIT_SHA ?? "";
	return sha ? sha.slice(0, 7) : "dev";
})();

export const HAS_SHA: boolean = COMMIT_SHA !== "dev";

export const REPO_URL = "https://github.com/numengames/numengames-web";

/** El commit del que salió este build, cuando se conoce. */
export const COMMIT_URL: string | null = HAS_SHA ? `${REPO_URL}/commit/${COMMIT_SHA}` : null;

/** La versión enlaza al registro humano de cambios. */
export const CHANGELOG_URL = `${REPO_URL}/blob/main/CHANGELOG.md`;

/** La licencia no es una: REUSE.toml la asigna por carpeta. Se enlaza el mapa. */
export const LICENSE_URL = `${REPO_URL}/blob/main/REUSE.toml`;
