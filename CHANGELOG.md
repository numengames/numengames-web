# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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