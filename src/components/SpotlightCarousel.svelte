<script>
	export let list = [];

	function toggleAnimationPlayState(state) {
		document.querySelectorAll(".card").forEach((card) => {
			card.style.animationPlayState = state;
		});
	}
</script>

<div
	class="carousel h-[400px] w-full flex justify-center relative"
	style="perspective: 1200px; perspective-origin: center;">
	{#each list as item, index}
		<div
			role="menuitem"
			tabindex="-1"
			class={`card absolute flex flex-col bg-white text-primary-panther rounded-lg p-6 w-[30vw] max-w-[459px] h-[400px] shadow-lg animate-[carousel_48s_infinite_ease-in-out] ${item.animationDelay}`}
			style="transform-style: preserve-3d; backface-visibility: hidden; transition: transform 1s ease, opacity 1s ease;"
			on:mouseenter={() => toggleAnimationPlayState("paused")}
			on:mouseleave={() => toggleAnimationPlayState("running")}>
			<blockquote
				class="relative text-lg font-light mb-4 h-full flex flex-col justify-center">
				<p class="text-4xl font-bold text-primary-coralRed leading-none">“</p>
				<div class="flex-grow text-2xl">{item.quote}</div>
			</blockquote>
			<div class="flex justify-between items-center">
				<div class="flex flex-col">
					<p class="text-primary-panther text-xl">{item.author}</p>
					{#if item.position}
						<p class="text-base opacity-75 text-primary-panther">
							{item.position}
						</p>
					{/if}
				</div>
				<div class="flex flex-col">
					{#if item.image}
						<img src={item.image} alt={item.author} class="w-20 h-20 rounded-full" />
					{/if}
				</div>
			</div>
		</div>
	{/each}
	<div class="absolute inset-0 flex items-center justify-center z-[-2]">
		<div
			class="w-full h-12 bg-gradient-to-r from-transparent via-primary-coralRed to-transparent blur-xl rounded-full">
		</div>
	</div>
</div>
