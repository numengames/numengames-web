<script>
	import PulseAnimatedBtn from "@components/PulseAnimatedBtn.svelte";
	import BracketedContent from "@components/BracketedContent.svelte";

	export let textObj;

	let currentStep = 0;

	const showStep = (index) => {
		currentStep = index;
	};
</script>

<div class="w-full flex flex-col relative">
	<div class="w-full h-full flex items-center gap-6">
		<div class="w-full flex flex-col">
			<BracketedContent
				className="text-primary-beige/75"
				text={textObj?.bracketedContent} />
			<div class="flex gap-2 flex-col mt-14 relative text-left">
				<h2 class="text-5xl mt-3 text-primary-beige z-10">
					{textObj.steps[currentStep]?.title}
				</h2>
				<p class="text-primary-beige/70 font-light text-sm mt-6 pr-8">
					{textObj.steps[currentStep]?.subtitle}
				</p>
				<div>
					<PulseAnimatedBtn
						icon="/icons/sword.svg"
						className="bg-primary-coralRed mt-6"
						link={textObj?.ctaButtons?.primary?.link}
						text={textObj?.ctaButtons?.primary?.text} />
				</div>
				<div
					class="absolute -top-[65px] left-0 text-9xl text-transparent stroke-red-500 stroke-1 font-IBMPlexMono"
					style="-webkit-text-stroke: 1px red;">
					{textObj.steps[currentStep]?.number}
				</div>
			</div>
		</div>
		<div class="w-[48%] shrink-0 relative">
			<img src={textObj.steps[currentStep]?.imgPath} alt="#" class="w-full" />
			<div
				class="w-full h-full absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0)_20%,rgba(23,23,23,1.00)_80%)]">
			</div>
		</div>
	</div>
	<div class="flex justify-between items-center w-full mt-10">
		{#each textObj?.steps as step, index}
			<button
				type="button"
				class="flex flex-col items-center cursor-pointer"
				on:click={() => showStep(index)}
				on:keydown={(e) => e.key === "Enter" && showStep(index)}>
				<div
					class="flex items-center justify-center w-8 h-8 rounded-full bg-primary-coralRed text-white font-IBMPlexMono">
					{step?.number}
				</div>
				<p class="text-primary-beige mt-2">{step.title}</p>
			</button>
			{#if index < textObj.steps.length - 1}
				<div
					class="flex-grow h-[0.125rem] border-t border-dotted border-primary-beige mx-2">
				</div>
			{/if}
		{/each}
	</div>
</div>
