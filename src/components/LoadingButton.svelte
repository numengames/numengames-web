<script lang="ts">
	export let iconPath: string;
	export let buttonText: string = "";
	export let className: string = "";
	export let isAnimating: boolean = false;

	let animate = false;

	$: {
		if (isAnimating) {
			animate = false;
			setTimeout(() => {
				animate = true;
			}, 0);
		} else {
			animate = false;
		}
	}
</script>

<button
	class={`button flex justify-center items-center gap-4 w-full xl:w-auto px-4 py-3 2xl:px-6 2xl:py-4 border border-white/10 rounded-md relative overflow-hidden ${className}`}
	class:animate
	on:click>
	<div
		class="flex items-center justify-center min-w-8 w-8 h-8 bg-white/10 rounded-full border border-white/20 shadow-[0_0_20px_0_rgba(217, 184, 106, 0.25)]">
		<img
			class="block w-6 h-6 object-contain"
			loading="lazy"
			src={iconPath}
			alt="icon" />
	</div>
	{#if buttonText}
		<span
			class={`text-base 2xl:text-xl font-light text-left ${isAnimating ? "text-basics-white" : "text-basics-white/40"}`}>
			{buttonText}
		</span>
	{/if}
</button>

<style>
	.button::after {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		transition: background 0.5s ease;
		pointer-events: none;
	}

	.button.animate::after {
		animation: loading 20s linear forwards;
		background: rgba(255, 255, 255, 0.2);
	}

	@keyframes loading {
		0% {
			transform: translateX(-100%);
		}
		100% {
			transform: translateX(0%);
		}
	}
</style>
