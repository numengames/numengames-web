<script lang="ts">
	import { onMount } from "svelte";
	import { theme, type Theme } from "../../stores/theme";

	export let className = "";

	let currentTheme: Theme;
	let mounted = false;

	// Subscribe to the theme store
	theme.subscribe((value) => {
		currentTheme = value;
		if (mounted) {
			updateDocumentClass(value);
		}
	});

	// Function to update the document class
	function updateDocumentClass(newTheme: Theme) {
		if (typeof document !== "undefined") {
			const root = document.documentElement;
			if (newTheme === "dark") {
				root.classList.add("dark");
			} else {
				root.classList.remove("dark");
			}
		}
	}

	// Handle theme toggle
	function toggleTheme() {
		theme.toggleTheme();
	}

	onMount(() => {
		mounted = true;
		updateDocumentClass(currentTheme);

		// Run initial setup to ensure theme is applied
		const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
		const storedTheme = localStorage.getItem("theme");

		if (storedTheme) {
			theme.setTheme(storedTheme as Theme);
		} else if (prefersDark) {
			theme.setTheme("dark");
		} else {
			theme.setTheme("light");
		}
	});
</script>

<button on:click={toggleTheme} class={`inline-flex items-center justify-center p-2 rounded-md text-arena hover:text-ambar transition-colors ${className}`} aria-label={`Switch to ${currentTheme === "dark" ? "light" : "dark"} mode`}>
	{#if currentTheme === "dark"}
		<!-- Sun icon for dark mode (switch to light) -->
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
			<circle cx="12" cy="12" r="4"></circle>
			<path d="M12 2v2"></path>
			<path d="M12 20v2"></path>
			<path d="m4.93 4.93 1.41 1.41"></path>
			<path d="m17.66 17.66 1.41 1.41"></path>
			<path d="M2 12h2"></path>
			<path d="M20 12h2"></path>
			<path d="m6.34 17.66-1.41 1.41"></path>
			<path d="m19.07 4.93-1.41 1.41"></path>
		</svg>
	{:else}
		<!-- Moon icon for light mode (switch to dark) -->
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
			<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
		</svg>
	{/if}
</button>
