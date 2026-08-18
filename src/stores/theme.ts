// Theme store using Svelte stores
import { writable } from "svelte/store";

// Define theme type
export type Theme = "dark" | "light";

// Create a writable store with 'dark' as the default theme
const createThemeStore = () => {
	// Try to get the theme from localStorage (if we're in the browser)
	const getInitialTheme = (): Theme => {
		if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
			const storedTheme = localStorage.getItem("theme");
			if (storedTheme === "dark" || storedTheme === "light") {
				return storedTheme;
			}

			// If no stored theme, check user preference
			if (window.matchMedia("(prefers-color-scheme: light)").matches) {
				return "light";
			}
		}

		// Default to dark mode
		return "dark";
	};

	const { subscribe, set, update } = writable<Theme>(getInitialTheme());

	return {
		subscribe,
		toggleTheme: () =>
			update((theme) => {
				const newTheme = theme === "dark" ? "light" : "dark";

				// Update localStorage when the theme changes
				if (typeof localStorage !== "undefined") {
					localStorage.setItem("theme", newTheme);
				}

				// Update the document class for tailwind
				if (typeof document !== "undefined") {
					const root = document.documentElement;
					if (newTheme === "dark") {
						root.classList.add("dark");
					} else {
						root.classList.remove("dark");
					}
				}

				return newTheme;
			}),
		setTheme: (theme: Theme) => {
			set(theme);

			// Update localStorage when the theme changes
			if (typeof localStorage !== "undefined") {
				localStorage.setItem("theme", theme);
			}

			// Update the document class for tailwind
			if (typeof document !== "undefined") {
				const root = document.documentElement;
				if (theme === "dark") {
					root.classList.add("dark");
				} else {
					root.classList.remove("dark");
				}
			}
		},
	};
};

export const theme = createThemeStore();
