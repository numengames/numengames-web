import { readable } from 'svelte/store';
import type { Readable } from 'svelte/store';

/**
 * Hook para detectar media queries y reaccionar a cambios en el viewport
 * @param query Media query a evaluar (ej: '(min-width: 768px)')
 * @returns Un store readable que contiene el estado actual del media query
 */
export function useMediaQuery(query: string): Readable<boolean> {
  // During SSR, return a default value
  if (typeof window === 'undefined') {
    return readable(false);
  }
  
  return readable(false, (set) => {
    // Create the media query list
    const mql = window.matchMedia(query);
    
    // Define our handler
    const onChange = () => {
      set(mql.matches);
    };
    
    // Add the event listener
    mql.addEventListener('change', onChange);
    
    // Set initial value
    set(mql.matches);
    
    // Return cleanup function
    return () => {
      mql.removeEventListener('change', onChange);
    };
  });
}

// Uso:
// const isDesktop = useMediaQuery('(min-width: 1024px)'); 