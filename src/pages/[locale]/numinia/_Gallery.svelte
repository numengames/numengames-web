<script lang="ts">
	import type { ContentData } from "@app-types/content";
	import BracketedContent from "@components/BracketedContent.svelte";

	export let textObj: ContentData;
</script>

<div class="w-full flex flex-col relative px-4 md:px-8 lg:px-0">
	<div class="w-full flex flex-col items-center z-10">
		<BracketedContent className="text-arena/75" text={textObj?.bracketedContent} />
		<div class="w-full flex flex-col justify-between items-center">
			<h2 class="text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl font-normal mt-3 mb-4 md:mb-6 text-arena text-center">
				{textObj?.header?.titlePart1}
				<span class="text-ambar">{textObj?.header?.titlePart2}</span>
				{textObj?.header?.titlePart3}
			</h2>
			<p class="text-arena text-sm md:text-base text-center max-w-2xl">{textObj?.description}</p>
		</div>
	</div>
	<div class="flex flex-col items-center w-full mt-8 md:mt-12">
		<div class="w-full max-w-[929px] aspect-video rounded-lg overflow-hidden shadow-lg">
			<iframe class="w-full h-full" src="https://www.youtube.com/embed/2GweAC5ItvM" title="Welcome to Numinia City" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
		</div>
	</div>
</div>

<style>
	.aspect-video {
		aspect-ratio: 16 / 9;
	}
</style>
