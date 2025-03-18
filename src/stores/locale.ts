import { writable } from 'svelte/store';
import type { SupportedLocale } from '../i18n';
import { DEFAULT_LOCALE } from '../i18n';

// Create a writable store with default locale
const createLocaleStore = () => {
  // Get initial locale (browser or localStorage)
  const getInitialLocale = (): SupportedLocale => {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const storedLocale = localStorage.getItem('locale');
      if (storedLocale === 'en' || storedLocale === 'es') {
        return storedLocale as SupportedLocale;
      }
      
      // Check browser language
      if (navigator.language.startsWith('es')) {
        return 'es';
      }
    }
    
    return DEFAULT_LOCALE;
  };
  
  const { subscribe, set } = writable<SupportedLocale>(getInitialLocale());
  
  return {
    subscribe,
    setLocale: (locale: SupportedLocale) => {
      set(locale);
      
      // Update localStorage
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('locale', locale);
      }
      
      // Update document language
      if (typeof document !== 'undefined') {
        document.documentElement.lang = locale;
      }
    }
  };
};

export const locale = createLocaleStore(); 