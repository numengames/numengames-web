<script>
	export let list;
	let activeIndex = null;

	function toggleFaq(index) {
		activeIndex = activeIndex === index ? null : index;
	}

	function handleKey(event, index) {
		if (event.key === "Enter" || event.key === " ") {
			toggleFaq(index);
		}
	}
</script>

{#each list as faq, index}
	<div
		class="w-full flex flex-col p-6 border border-white/5 rounded-lg mb-3 hover:bg-basics-white/10 z-10"
		on:click={() => toggleFaq(index)}
		on:keydown={(event) => handleKey(event, index)}
		tabindex="0"
		role="button"
		aria-expanded={activeIndex === index}>
		<div class="w-full flex justify-between items-center cursor-pointer">
			<p
				class={activeIndex === index
					? "text-primary-coralRed"
					: "text-primary-beige"}>
				{faq.question}
			</p>
			<div class="flex">
				{#if activeIndex !== index}
					<img src="/icons/plus.svg" class="w-5 h-5" alt="expandir" />
				{:else}
					<img src="/icons/minus.svg" class="w-5 h-5" alt="colapsar" />
				{/if}
			</div>
		</div>
		<p
			class="mt-6 text-sm text-primary-beige/75"
			hidden={activeIndex !== index}
			aria-hidden={activeIndex !== index}>
			{faq.answer}
		</p>
	</div>
{/each}
