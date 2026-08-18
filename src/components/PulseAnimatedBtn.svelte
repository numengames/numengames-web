<script lang="ts">
	export let link: string = "";
	export let text: string = "";
	export let icon: string = "";
	export let className: string = "";

	/**
	 * Ámbar is a light fill: anything on it carries ink (§19.4, contrast). Every
	 * other fill in the system — Turquesa above all — carries Arena.
	 */
	$: isAmberSolid = typeof className === "string" && className.includes("bg-ambar");
	$: textClass = isAmberSolid ? "text-nocturno-base" : "text-arena";
</script>

{#if link}
	<a href={link} target="_blank" rel="noopener noreferrer">
		<button class={`relative text-xs px-6 py-3 rounded-md border border-ambar/25 btnAnimated flex items-center justify-center ${textClass} ${className}`}>
			{text}
			{#if icon}
				<img src={icon} alt="icon" class="ml-2 inline-block w-4 h-4" />
			{/if}
		</button>
	</a>
{:else}
	<button class={`relative text-xs px-6 py-3 rounded-md border border-ambar/25 btnAnimated flex items-center justify-center ${textClass} ${className}`}>
		{text}
		{#if icon !== ""}
			<img src={icon} alt="icon" class="ml-2 inline-block w-4 h-4" />
		{/if}
	</button>
{/if}

<style>
	/*
	 * §10.1 · the pulsing rings this component was named for were an ambient
	 * loop, and the catalogue has none: the legendary pulse fires twice, on
	 * obtaining something. What is left is the button's own edge, and the
	 * canonical elevation on hover.
	 */
	.btnAnimated {
		transition: border-color 120ms cubic-bezier(0.2, 0, 0, 1);
	}

	.btnAnimated:hover {
		border-color: rgba(239, 165, 23, 0.6);
	}
</style>
