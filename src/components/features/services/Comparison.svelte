<script lang="ts">
	import type { ContentData } from "@app-types/content";
	import PulseAnimatedBtn from "@components/PulseAnimatedBtn.svelte";
	import BracketedContent from "@components/BracketedContent.svelte";

	export let textObj: ContentData;
</script>

<div class="w-full flex flex-col relative px-4 md:px-8 lg:px-0">
	<div class="w-full flex flex-col items-start z-10">
		<BracketedContent className="text-arena/75" text={textObj?.bracketedContent} />
		<div class="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
			<h2 class="text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl font-normal mt-3 mb-4 md:mb-6 text-arena md:pr-10">
				{textObj?.header?.titlePart1}
				<span class="text-ambar">{textObj?.header?.titlePart2}</span>
			</h2>
			<div>
				<PulseAnimatedBtn text={textObj?.ctaButtons?.primary?.text} />
			</div>
		</div>
	</div>
	<div class="w-full flex flex-col md:flex-row gap-4 md:gap-6 mt-6">
		{#each Object.entries(textObj?.list) as [key, texts] (key)}
			<div class={`w-full rounded-xl py-6 md:py-8 lg:py-10 px-4 md:px-6 ${key === "before" ? "border border-arena/5" : "border border-[#EFA51740] border-opacity-25 bg-[#1E1A17]"}`}>
				<p class={`mb-6 md:mb-8 text-lg md:text-xl ${key === "before" ? "text-arena" : "text-ambar"}`}>
					{key.charAt(0).toUpperCase() + key.slice(1)}
				</p>
				{#each texts as text, index (index)}
					<div class={`text-arena/75 flex items-start md:items-center py-4 md:py-6 ${index !== texts.length - 1 ? "mb-3 md:mb-4" : ""} border rounded-lg ${key === "before" ? "border-arena/5 bg-[linear-gradient(90deg,rgba(20,17,15,0.70)_24%,rgba(20,17,15,0.00)_100%)]" : "border-ambar/25"}`}>
						<div class={`flex justify-center items-center rounded-full ml-4 md:ml-5 w-5 h-5 md:w-6 md:h-6 mt-1 md:mt-0 ${key === "before" ? "bg-arena/10" : "bg-interactivo"}`}>
							{#if key === "before"}
								<img class="w-3 h-3 md:w-4 md:h-4" src="/icons/x.svg" alt="x" />
							{:else}
								<img class="w-3 h-3 md:w-4 md:h-4" src="/icons/check.svg" alt="check" />
							{/if}
						</div>
						<p class="ml-3 md:ml-4 font-light text-sm md:text-base pr-2">{text}</p>
					</div>
				{/each}
			</div>
		{/each}
	</div>
</div>

<style>
	/* §10.1 · the ambient pulse rings retire; the edge stays. */
	.btnAnimated {
		transition: border-color 120ms cubic-bezier(0.2, 0, 0, 1);
	}

	.btnAnimated:hover {
		border-color: rgba(243, 80, 88, 0.6);
	}
</style>
