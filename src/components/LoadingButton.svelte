<script lang="ts">
	export let iconPath: string;
	export let buttonText: string = "";
	export let className: string = "";
	export let isAnimating: boolean = false;

	let animate = false;

	/**
	 * Retriggers the CSS animation: the class has to drop for a frame before it
	 * can be applied again, or the browser reuses the finished animation.
	 */
	function restartAnimation(active) {
		animate = false;
		if (active) {
			setTimeout(() => {
				animate = true;
			}, 0);
		}
	}

	$: restartAnimation(isAnimating);
</script>

<button class={`button flex justify-center items-center gap-4 w-full xl:w-auto px-4 py-3 2xl:px-6 2xl:py-4 border border-arena/10 rounded-md relative overflow-hidden ${className}`} class:animate on:click>
	<div class="flex items-center justify-center min-w-8 w-8 h-8 bg-arena/10 rounded-full border border-arena/20">
		<img class="block w-6 h-6 object-contain" loading="lazy" src={iconPath} alt="icon" />
	</div>
	{#if buttonText}
		<span class={`text-base 2xl:text-xl font-light text-left ${isAnimating ? "text-arena" : "text-arena/40"}`}>
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
		background: rgba(249, 235, 220, 0.2);
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
