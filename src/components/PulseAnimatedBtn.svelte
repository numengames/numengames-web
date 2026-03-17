<script lang="ts">
	export let link: string = "";
	export let text: string = "";
	export let icon: string = "";
	export let className: string = "";

	/**
	 * Heurística segura:
	 * - Si el consumidor pasa bg-primary-coralRed (ahora amarillo), forzamos texto negro.
	 * - En caso contrario, mantenemos texto claro por compatibilidad.
	 */
	$: isGoldSolid = typeof className === "string" && className.includes("bg-primary-coralRed");
	$: textClass = isGoldSolid ? "text-basics-black" : "text-basics-white";
</script>

{#if link}
	<a href={link} target="_blank" rel="noopener noreferrer">
		<button
			class={`relative text-xs px-6 py-3 rounded-md border border-primary-coralRed/25 shadow-[0_0_20px_0_theme(colors.primary.coralRed)] btnAnimated flex items-center justify-center ${textClass} ${className}`}>
			{text}
			{#if icon}
				<img src={icon} alt="icon" class="ml-2 inline-block w-4 h-4" />
			{/if}
		</button>
	</a>
{:else}
	<button
		class={`relative text-xs px-6 py-3 rounded-md border border-primary-coralRed/25 shadow-[0_0_20px_0_theme(colors.primary.coralRed)] btnAnimated flex items-center justify-center ${textClass} ${className}`}>
		{text}
		{#if icon !== ""}
			<img src={icon} alt="icon" class="ml-2 inline-block w-4 h-4" />
		{/if}
	</button>
{/if}

<style>
	.btnAnimated::before,
	.btnAnimated::after {
		top: 0;
		left: 0;
		border-radius: 5px;
		content: "";
		width: 100%;
		position: absolute;
		transition: 0.5s all ease;
		height: 100%;
		border: 1px solid rgba(255, 217, 97, 0.50); /* dorado */
		transform: scale(1);
		animation: pulse 6s infinite;
		opacity: 0.6;
		pointer-events: none;
	}

	.btnAnimated::before {
		animation-delay: 3s;
	}

	@keyframes pulse {
		0% {
			transform: scale3d(1.05, 1.15, 1.05);
			opacity: 0.6;
		}
		100% {
			transform: scale3d(1.3, 1.45, 1.3);
			opacity: 0;
		}
	}
</style>