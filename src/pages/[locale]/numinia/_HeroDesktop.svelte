<script lang="ts">
	import type { ContentData } from "@app-types/content";
	import PulseAnimatedBtn from "@components/PulseAnimatedBtn.svelte";

	export let textObj: ContentData;
</script>

<div class="w-full h-full flex flex-col items-center mt-4 md:mt-8 mb-10 md:mb-20">
	<div class="px-4 md:px-8 lg:px-36 h-full flex flex-col md:flex-row justify-between items-center md:items-end z-10 relative">
		<div class="w-full md:w-[60%] relative mb-8 md:mb-0">
			<img class="w-full opacity-90" src="/assets/header-numinia.jpg" alt="header_numinia_img" />
		</div>
		<div class="w-full md:w-[40%] flex flex-col items-center md:items-end">
			<p class="w-full text-center md:text-right font-extralight text-basics-white/70 break-words z-10 text-sm md:text-base relative mb-6 md:mb-8">
				{textObj?.mainText}
			</p>
			<div class="flex flex-col items-center md:items-end z-10 w-full md:w-auto relative">
				<PulseAnimatedBtn icon="/icons/sword.svg" link={textObj?.ctaButtons?.primary?.link} className="bg-primary-coralRed mb-6 mx-auto md:mr-2 md:ml-0" text={textObj?.ctaButtons?.primary?.text} />
				<img class="w-[80%] md:w-full relative" src="/assets/numinia-logo.png" alt="numinia_logo" />
			</div>
		</div>
	</div>
</div>

<style>
	img {
		filter: drop-shadow(0 0 20px rgba(20, 17, 15, 0.5));
	}
</style>
