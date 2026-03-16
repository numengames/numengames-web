<script>
	import { onMount, onDestroy } from "svelte";

	import { setupRotation } from "@scripts/rotation.js";
	import BracketedContent from "@components/BracketedContent.svelte";
	import PulseAnimatedBtn from "@components/PulseAnimatedBtn.svelte";

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
	class="w-full flex flex-col items-center relative mt-8 md:mt-16 after:content-[''] after:absolute after:w-full after:left-0 md:after:left-[-2.5rem] after:h-[90%] after:top-1/2 after:transform after:-translate-y-1/2">
	<div class="flex flex-col justify-center items-center z-10 mb-8 md:mb-14 w-[90%] md:max-w-[75%]">
		<BracketedContent
			className="text-primary-beige/75"
			text={textObj?.bracketedContent} />
		<h1
			class="flex flex-col md:flex-row text-3xl md:text-5xl leading-tight 2xl:text-5xl 2xl:leading-tight font-normal text-center md:text-left mt-3 mb-4 md:mb-6 text-primary-beige md:pr-10">
			<span class="flex items-center justify-center md:justify-start">
				{textObj?.header?.titlePart1}
				<span class="ml-2 md:ml-4 flex">
					<img src="/assets/n.png" class="h-6 md:h-10 mt-2" alt="Numen Games logomark" />
				</span>
			</span>
			<span class="text-primary-coralRed mx-2 md:mr-3">
				{textObj?.header?.titlePart2}
			</span>
			{textObj?.header?.titlePart3}
		</h1>
		<h2
			class="w-full md:w-[75%] text-sm md:text-base font-light text-primary-beige/75 text-center mb-6">
			{textObj?.header?.subtitle}
		</h2>
		<div class="flex flex-col md:flex-row text-primary-beige font-light gap-4 md:gap-6">
			<PulseAnimatedBtn
				text={textObj?.ctaButtons?.primary?.text}
				className="form-toggle-button" />
			<button
				class="text-xs px-6 py-3 bg-basics-white/10 border-basics-white/20 rounded border hover:bg-basics-white/30">
				{textObj?.ctaButtons?.secondary?.text}
			</button>
		</div>
	</div>
</div>
