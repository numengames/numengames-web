<script lang="ts">
	import type { ContentData } from "@app-types/content";
	import PulseAnimatedBtn from "@components/PulseAnimatedBtn.svelte";
	import BracketedContent from "@components/BracketedContent.svelte";

	export let textObj: ContentData;
	let activeIndex: number | null = null;

	function toggleFaq(index) {
		activeIndex = activeIndex === index ? null : index;
	}

	function handleKey(event, index) {
		if (event.key === "Enter" || event.key === " ") {
			toggleFaq(index);
		}
	}
</script>

<div class="w-full flex flex-col xl:flex-row relative justify-between">
	<div class="w-full xl:w-[25%] flex flex-col items-center xl:items-start z-10 mb-8 xl:mb-0 landscape:mb-4">
		<div class="text-center xl:text-left landscape:text-left">
			<BracketedContent className="text-primary-beige/75" text={textObj?.bracketedContent} />
			<h2 class="text-2xl sm:text-3xl xl:text-4xl 2xl:text-5xl font-normal mt-3 mb-6 text-primary-beige landscape:text-3xl">
				{textObj?.header?.titlePart1}
				<span class="text-primary-coralRed">{textObj?.header?.titlePart2}</span>
			</h2>
		</div>
		<PulseAnimatedBtn text={textObj?.ctaButtons?.primary?.text} className="form-toggle-button" />
	</div>
	<div class="w-full xl:w-[53%] flex flex-col items-center xl:items-end gap-6 xl:gap-10 my-12 xl:my-24 landscape:my-8">
		{#each textObj?.list as faq, index (index)}
			<div class="w-full flex flex-col">
				<button type="button" class="w-full flex justify-between items-center cursor-pointer" on:click={() => toggleFaq(index)} on:keydown={(event) => handleKey(event, index)} aria-expanded={activeIndex === index}>
					<p class={`text-base xl:text-lg landscape:text-base ${activeIndex === index ? "text-[#EFA517]" : "text-primary-beige"}`}>
						{faq.question}
					</p>
					<div class="flex">
						<img src="/icons/plus.svg" class="w-5 h-5" alt="plus" class:hidden={activeIndex === index} />
						<img src="/icons/minus.svg" class="w-5 h-5" alt="minus" class:hidden={activeIndex !== index} />
					</div>
				</button>
				<p class="text-primary-beige/75 text-xs xl:text-sm mt-2 w-full xl:w-[75%] landscape:text-xs" class:hidden={activeIndex !== index} aria-hidden={activeIndex !== index}>
					{faq.answer}
				</p>
			</div>
		{/each}
	</div>
</div>
