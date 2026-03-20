// Define supported languages
export type SupportedLocale = 'en' | 'es';

// Default language
export const DEFAULT_LOCALE: SupportedLocale = 'en';

// Function to get browser language
export function getBrowserLanguage(): SupportedLocale {
  if (typeof navigator === 'undefined') return DEFAULT_LOCALE;
  
  const browserLang = navigator.language.split('-')[0];
  return browserLang === 'es' ? 'es' : 'en';
}

// Function to get locale from URL
export function getLocaleFromURL(pathname: string): SupportedLocale {
  const firstSegment = pathname.split('/')[1];
  return firstSegment === 'es' ? 'es' : 'en';
}

// Function to get URL with locale
export function getLocalizedURL(pathname: string, locale: SupportedLocale): string {
  // Strip existing locale prefix (/en, /es, /en/, /es/)
  const stripped = pathname.replace(/^\/(en|es)(\/|$)/, '/');
  const clean = stripped === '/' ? '/' : stripped;
  return `/${locale}${clean}`;
}

// Central function for locale-based static paths
export function getLocaleStaticPaths() {
  return [
    { params: { locale: 'en' } },
    { params: { locale: 'es' } }
  ];
} 