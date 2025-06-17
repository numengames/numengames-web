<script>
	import { onMount, onDestroy } from "svelte";

	import { setupRotation } from "@scripts/rotation.js";
	import LoadingButton from "@components/LoadingButton.svelte";
	import BracketedContent from "@components/BracketedContent.svelte";
	import PulseAnimatedBtn from "@components/PulseAnimatedBtn.svelte";
	import CardWithTextOverlay from "@components/cards/WithTextOverlay.svelte";

	export let textObj;

	let activeIndex = 0;
	const contentCount = 3;
	let timeUntilNextAnimation = 20000;

	const { start, stop, handleButtonClick } = setupRotation(
		contentCount,
		timeUntilNextAnimation,
		(newIndex) => (activeIndex = newIndex),
	);

	onMount(() => start());

	onDestroy(() => stop());
</script>

<div
	class="w-full flex flex-col items-center relative pt-20 md:pt-32 lg:pt-40 after:content-[''] after:absolute after:w-full after:left-[-2.5rem] after:h-[90%] after:top-1/2 after:transform after:-translate-y-1/2">
	<div
		class="bg-[url('/icons/khepri.svg')] bg-repeat bg-[length:15%] absolute w-[calc(100%+4.5rem)] h-[90%] left-[-2.5rem] opacity-25">
	</div>
	<div class="flex flex-col justify-center items-center z-10 mb-8 md:mb-12 lg:mb-14 w-full px-4 md:px-8 lg:px-0 max-w-[90%] md:max-w-[85%] lg:max-w-[75%]">
		<BracketedContent
			className="text-primary-beige/75"
			text={textObj?.bracketedContent} />
		<h2
			class="text-3xl md:text-4xl lg:text-5xl leading-tight 2xl:text-5xl 2xl:leading-tight font-normal text-center md:text-left mt-3 mb-4 md:mb-6 text-primary-beige md:pr-10">
			{textObj?.header?.titlePart1}
			<span class="text-primary-coralRed">{textObj?.header?.titlePart2}</span>
			{textObj?.header?.titlePart3}
		</h2>
		<h3
			class="w-full md:w-[75%] text-sm md:text-base font-light text-primary-beige/75 text-center mb-6">
			{textObj?.header?.subtitle}
		</h3>
		<div class="flex flex-col md:flex-row text-primary-beige font-light gap-4 md:gap-6">
			<PulseAnimatedBtn text={textObj?.ctaButtons?.primary?.text} />
			<a target="_blank" href={textObj?.ctaButtons?.secondary?.link}>
				<button
					class="text-xs px-6 py-3 bg-basics-white/10 border-basics-white/20 rounded border hover:bg-basics-white/30">
					{textObj?.ctaButtons?.secondary?.text}
				</button>
			</a>
		</div>
	</div>

	<div class="w-full md:w-[85%] lg:w-[75%] z-10 px-4 md:px-8 lg:px-0">
		<div class="w-full flex flex-col md:flex-row justify-center gap-4 md:gap-6">
			{#each textObj?.features as feature, index}
				<LoadingButton
					className="flex-1"
					on:click={() => handleButtonClick(index)}
					iconPath={feature?.iconPathBtn}
					buttonText={feature?.titleBtn}
					isAnimating={activeIndex === index} />
			{/each}
		</div>
		<div class="w-full mt-6">
			{#each textObj?.features as feature, index}
				<CardWithTextOverlay
					className="rounded-b-none"
					image={feature?.cardImgPath}
					description={feature?.cardDescription}
					isAnimating={activeIndex === index} />
			{/each}
		</div>
	</div>
</div>
