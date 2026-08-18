<script lang="ts">
	import type { ContentData } from "@app-types/content";
	import PulseAnimatedBtn from "@components/PulseAnimatedBtn.svelte";
	import BracketedContent from "@components/BracketedContent.svelte";

	export let textObj: ContentData;

	let currentStep = 0;

	const showStep = (index) => {
		currentStep = index;
	};
</script>

<div class="w-full flex flex-col relative px-4 md:px-8 lg:px-0">
	<div class="w-full h-full flex flex-col md:flex-row items-center gap-6">
		<div class="w-full flex flex-col">
			<BracketedContent className="text-primary-beige/75" text={textObj?.bracketedContent} />
			<div class="flex gap-2 flex-col mt-8 md:mt-14 relative text-left">
				<h2 class="text-3xl md:text-5xl mt-3 text-primary-beige z-10">
					{textObj.steps[currentStep]?.title}
				</h2>
				<p class="text-primary-beige/70 font-light text-sm mt-4 md:mt-6 pr-0 md:pr-8">
					{textObj.steps[currentStep]?.subtitle}
				</p>
				<div>
					<PulseAnimatedBtn icon="/icons/sword.svg" className="bg-primary-coralRed mt-4 md:mt-6" link={textObj?.ctaButtons?.primary?.link} text={textObj?.ctaButtons?.primary?.text} />
				</div>
				<div class="absolute -top-[45px] md:-top-[65px] left-0 text-6xl md:text-9xl text-transparent stroke-ambar stroke-1 font-geistMono" style="-webkit-text-stroke: 1px red;">
					{textObj.steps[currentStep]?.number}
				</div>
			</div>
		</div>
		<div class="w-full md:w-[48%] shrink-0 relative mt-8 md:mt-0">
			<img src={textObj.steps[currentStep]?.imgPath} alt="#" class="w-full" />
			<div class="w-full h-full absolute inset-0 bg-[radial-gradient(rgba(249,235,220,0)_20%,rgba(30,26,23,1.00)_80%)]"></div>
		</div>
	</div>
	<div class="flex justify-between items-center w-full mt-8 md:mt-10 overflow-x-auto pb-4">
		{#each textObj?.steps as step, index (index)}
			<button type="button" class="flex flex-col items-center cursor-pointer min-w-[80px]" on:click={() => showStep(index)} on:keydown={(e) => e.key === "Enter" && showStep(index)}>
				<div class="flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-full bg-ambar text-nocturno-base font-geistMono text-sm md:text-base">
					{step?.number}
				</div>
				<p class="text-primary-beige mt-2 text-sm md:text-base text-center">{step.title}</p>
			</button>
			{#if index < textObj.steps.length - 1}
				<div class="flex-grow h-[0.125rem] border-t border-dotted border-primary-beige mx-2"></div>
			{/if}
		{/each}
	</div>
</div>
