# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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