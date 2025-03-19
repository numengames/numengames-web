<script>
	import PulseAnimatedBtn from "@components/PulseAnimatedBtn.svelte";
	import BracketedContent from "@components/BracketedContent.svelte";

	export let textObj;
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

<div class="w-full flex relative justify-between">
	<div class="w-[25%] flex flex-col items-start z-10">
		<div>
			<BracketedContent
				className="text-primary-beige/75"
				text={textObj?.bracketedContent} />
			<h2
				class="text-4xl 2xl:text-5xl font-normal mt-3 mb-6 text-primary-beige">
				{textObj?.header?.titlePart1}
				<span class="text-primary-coralRed">{textObj?.header?.titlePart2}</span>
			</h2>
		</div>
		<PulseAnimatedBtn
			text={textObj?.ctaButtons?.primary?.text}
			className="form-toggle-button" />
	</div>
	<div class="w-[53%] flex flex-col items-end gap-10 my-24">
		{#each textObj?.list as faq, index}
			<div class="w-full flex flex-col">
				<button
					type="button"
					class="w-full flex justify-between items-center cursor-pointer"
					on:click={() => toggleFaq(index)}
					on:keydown={(event) => handleKey(event, index)}
					aria-expanded={activeIndex === index}>
					<p
						class={activeIndex === index
							? "text-[#F35059]"
							: "text-primary-beige"}>
						{faq.question}
					</p>
					<div class="flex">
						<img
							src="/icons/plus.svg"
							class="w-5 h-5"
							alt="plus"
							class:hidden={activeIndex === index} />
						<img
							src="/icons/minus.svg"
							class="w-5 h-5"
							alt="minus"
							class:hidden={activeIndex !== index} />
					</div>
				</button>
				<p
					class="text-primary-beige/75 text-xs mt-2 w-[75%]"
					class:hidden={activeIndex !== index}
					aria-hidden={activeIndex !== index}>
					{faq.answer}
				</p>
			</div>
		{/each}
	</div>
</div>
