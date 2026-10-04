# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed — el interruptor de día y noche, 2026-10-04, v0.14.0

- El icono del interruptor (DSN-016) muestra el modo en el que estás, no
  adónde lleva pulsar: de noche se ve la luna con estrellas, de día el sol
  (decisión del Oráculo, a imagen de DES-009 1.3.0 y STD-037 0.6.0 en
  numinia.org). Solo se intercambian `solo-diurno` y `solo-nocturno` en
  `SiteHeader.astro`; botón, clave `numinia-modo` y arranque no cambian.
- `tests/mode-switch-icon.test.ts` lo fija.

### Changed — el pie del 2026-10-03, v0.13.0

- La calavera (Phosphor «skull», 20 px, tinta apagada) cierra la línea del
  pie: un botón `aria-label="Epitaph"` con `aria-expanded` que muestra en un
  globo el epitafio del manifiesto (canon `CAN-002`), en inglés en todo
  idioma. Pasar o enfocar lo muestra, pulsar lo fija, Escape lo cierra.
- El botón del café lleva a `numinia.com/back` (`/es/back/` en español): el
  mecenazgo deja `/support`. En inglés se llama «Back Numinia».
- Social suma Discord (`discord.gg/ASwwdd24pp`, servidor «Numinia») tras
  GitHub; lo pendiente ya solo espera la cuenta de X.
- `hola@numen.games` no tiene MX: el correo pasa a `hola@numengames.com` en
  el pie, el formulario de contacto y el de alojamiento.
- `tests/footer-epitaph.test.ts` lo fija.

### Security — https y cabeceras, auditoría del 2026-10-02

- `worker/index.js`: toda petición por `http://` recibe un 301 a `https://`
  (mismo host, ruta y query) antes que cualquier otra regla; `localhost` se
  exime para `wrangler dev`. Toda respuesta del Worker — páginas, ficheros,
  404 y redirecciones — lleva HSTS, `X-Content-Type-Options`,
  `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options: DENY` y una CSP
  ajustada a lo que publica el build (todo del propio dominio; inline por
  Astro y el aviso de cookies; `form-action 'self' mailto:`).
  `run_worker_first: true` ya hace pasar los assets por el Worker, así que
  no hace falta `public/_headers`. Tests en `worker/index.test.ts`, escritos
  antes: fallaban 6 de 6.
- Fuera Partytown (`@astrojs/partytown`): ningún script `text/partytown` lo
  usaba; era un script inline más en cada página y `/~partytown/`.
- `public/.well-known/security.txt` (RFC 9116): GitHub Private Vulnerability
  Reporting primero, el correo después. `SECURITY.md` dice lo mismo y que el
  correo es secundario.
- `dependabot-auto-merge.yml`: `permissions: read-all` arriba; escritura solo
  en el job. `dependabot.yml` ignora el major de `typescript` (`astro check`
  no soporta TS 7) para desatascar #53.
- Referencias muertas: CODEOWNERS ya no cita `docs/nwos-compliance.md`;
  `.env.example` ya no cita un `deploy.yml` que no existe.

### Added — el sello de ENISA en el pie, v0.12.0 (2026-09-30)

- El pie lleva el sello «Financiada por ENISA» que ENISA da a las empresas
  financiadas antes de 2025, sobre placa blanca, enlazado al registro del
  préstamo en numinia.org (`OPS-017`). `REUSE.toml` nombra a ENISA como
  titular con `LicenseRef-Third-Party-Mark` (texto en `LICENSES/`).
  `tests/enisa-seal.test.ts` lo fija.

### Removed — vuelta atrás de las tres puertas, v0.11.0 (2026-09-30)

- Revierte #59: barra, portada, titular, 404 y `/formacion` vuelven al estado
  de v0.9.0. El Oráculo: tres puertas en el frente no resuelven cómo
  presentar lo que hace la casa, lo empeoran. Se piensa antes de rehacerlo.
- Se conserva `/hosting` completo y sin motor (`src/content/hosting.ts`,
  `RequestForm.astro`, `sales-page.css`), enlazado desde el pie como antes.
- El alojamiento es el «después» de un encargo, no una puerta: una línea en
  la tarjeta «Después» de la portada enlaza a `/hosting`
  (`home.momentos.rows[].more`). `tests/after-stays-open.test.ts` fija que
  sea una sola y que la barra no lo lleve.

### Added — alojamiento de mundos, v0.8.0 (2026-09-30)

- `/es/hosting` y `/en/hosting`: la oferta de alojamiento de mundos Hyperfy 2
  (qué se aloja, qué incluye, dos planes, cómo se empieza). Sin cifra de
  precio hasta que el Oráculo la fije; `tests/hosting.test.ts` lo vigila.
- El pie gana `footer.extraLinks` para páginas que no caben en la barra.
- Lo que la página promete es lo que hace `numinia-k8s/ovh`: un contenedor
  por mundo en un VPS de OVH, HTTPS con Caddy, copia nocturna de 14 días.

### Added — la cobertura de la lógica se ve en CI, sin morder (2026-09-19)

- `vitest.config.ts`: cobertura v8 de `src/lib`, `worker` y `scripts` en
  cada `pnpm test`, con `text`, `text-summary` y `lcov`. Sin umbral: mientras
  `STD-015` sea draft el guardián ve y no muerde (ENG-067); el umbral llegará
  con el registro en `active`, fijado al valor medido entonces.
- `.github/workflows/ci.yml`: el paso Test escribe el resumen de cobertura
  en el job summary. Un test que falla sigue fallando el paso.
- `tests/coverage-visible.test.ts`: fija que se mide, que se publica y que no
  hay umbral. Escrito antes del cambio; fallaba 2 de 3.
- Medido el 2026-09-19: 27 % de sentencias (53/196). `worker/` al 100 %,
  `share-card.mjs` y `check-version-bump.mjs` al 0 %, `src/lib` al 10 %.

### Removed — la constitución propia del repo (2026-09-18)

- `docs/nwos-compliance.md`, `scripts/audit-nwos.py` (ruta absoluta de una
  máquina concreta, escribía solo ese informe), `TODO.md` y el README de la
  plantilla Astroship. Los consumidores beben del archivo
  (`numengames/numinia-nwos`) y no tienen constituciones propias. `README`,
  `CONTRIBUTING`, la plantilla de PR y un `CLAUDE.md` nuevo dicen solo lo
  específico de este código y apuntan al archivo, régimen de transición
  incluido.

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
