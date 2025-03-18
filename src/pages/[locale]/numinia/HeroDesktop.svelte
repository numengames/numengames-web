<script>
	import PulseAnimatedBtn from "@components/PulseAnimatedBtn.svelte";

	export let textObj;
</script>

<div class="w-full h-full flex flex-col items-center mt-8 mb-20">
	<div
		class="px-36 h-full flex flex-col justify-between items-end z-10 relative">
		<img
			class="absolute -top-[12%] left-1/2 transform -translate-x-1/2 w-[85%]"
			src="/assets/header-numinia.png"
			alt="header_numinia_img" />
		<p
			class="w-[30%] text-right font-extralight text-basics-white/70 break-words z-10">
			{textObj?.mainText}
		</p>
		<div class="flex flex-col items-end z-10">
			<PulseAnimatedBtn
				icon="/icons/sword.svg"
				link={textObj?.ctaButtons?.primary?.link}
				className="bg-primary-coralRed mb-6 mr-2"
				text={textObj?.ctaButtons?.primary?.text} />
			<img class="w-full" src="/assets/numinia-logo.png" alt="numinia_logo" />
		</div>
	</div>
</div>
