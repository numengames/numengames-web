# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Removed — el workflow de despliegue (2026-09-16)
- `.github/workflows/deploy.yml`. Exigía `CLOUDFLARE_API_TOKEN` y
  `CLOUDFLARE_ACCOUNT_ID`, que nunca existieron en este repositorio, y
  fallaba en cada merge. El despliegue es de Cloudflare: Workers Builds
  conectado al repo, como en numinia.org. `CONTRIBUTING`, `TODO`,
  `docs/nwos-compliance.md` y `scripts/audit-nwos.py` lo reflejan; la
  auditoría mide ahora `numen.games/version.json` contra `main`.

### Changed — ronda dos del pie (2026-09-16)
- El pie toma la forma final aprobada: nombre escrito + una línea;
  Navegación en dos columnas; columna **Numen Games** con los cuatro
  sitios de la casa y este marcado «estás aquí»; Legal; Social con el
  GitHub de la organización. La versión enlaza ahora a `/updates`, no al
  CHANGELOG.
- `/updates` (nueva, es/en): la línea temporal del sitio con bloque de
  pendientes, a imagen de numinia.com/updates. Empieza en v0.1.0. El
  número del pie sale de `src/content/updates.ts`, no de package.json.
- Guard nuevo en CI (`scripts/check-version-bump.mjs`): una PR que cambie
  `src/` sin añadir entrada y subir versión en `updates.ts` no se fusiona.

### Removed
- **Web3Forms**, el servicio de terceros que procesaba el formulario de
  contacto. Era legacy: dependía de un secreto `PUBLIC_WEB3FORMS_KEY` que
  nunca existió en CI y que bloqueó todos los despliegues desde el 11 de
  septiembre — numen.games seguía sirviendo «Coming Soon» con la web nueva
  fusionada. El formulario compone ahora un correo a `hola@numen.games` con
  los campos ya escritos; cero servicios, cero secretos. La puerta del
  deploy que exigía la clave desaparece con él. `.env.example` se vacía:
  ninguna de sus variables se leía.

### Added
- Pie de página estándar de la casa, el mismo en numinia.org, numinia.com
  y numen.games: columnas Navegación · Legal · Social, cierre con el
  escarabajo, la firma «by Numen Games — we build for a better future.» y
  la línea de build (licencia · telemetría · versión · commit). El commit
  enlaza a GitHub; la versión, a este registro.
- Páginas legales `/{es,en}/legal/terms` y `/{es,en}/legal/privacy`:
  copias literales de los maestros de numinia-nwos (OPS-004 v1.0.0,
  OPS-003 v2.0.0), publicadas con sus notas de revisión abiertas.
  `tests/legal-corpus.test.ts` fija que no se editan aquí.
- `src/lib/build-info.ts`: versión y SHA del build, el mismo contrato que
  `/version.json`.

### Removed
- La línea `© año Numen Games S.L.`: la licencia va por fichero
  (REUSE.toml), una reclamación global la contradecía.

### Pending
- Columna Social: vacía hasta recibir las cuentas de empresa.
- `/telemetry`: página mínima (versión y commit); la página que mida el
  sitio (interacción, consentimiento) es una misión aparte.

### Fixed
- **Services Routing and Links**
  - Date: 2024-03-19
  - Description: Fixed services routing and navigation links in the footer component
  - Changes:
    - Updated slug matching logic in `[slug].astro` to ensure exact file name matching
    - Fixed i18n import path in footer component
    - Improved services links construction in footer
  - Files Modified:
    - `src/pages/[locale]/services/[slug].astro`
    - `src/components/footer.astro`
  - Impact:
    - Services pages now correctly load content from markdown files
    - Footer links properly navigate to localized service pages
    - Improved code maintainability with correct import paths 