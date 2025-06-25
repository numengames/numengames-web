<script>
	import BracketedContent from "@components/BracketedContent.svelte";

	export let textObj;
</script>

<div class="w-full flex flex-col relative items-center">
	<div class="w-full flex flex-col items-center z-10">
		<BracketedContent
			className="text-primary-beige/75"
			text={textObj?.bracketedContent} />
		<h2
			class="text-4xl 2xl:text-5xl font-normal mt-4 mb-6 text-primary-beige pr-10">
			{textObj?.header?.titlePart1}
			<span class="text-primary-coralRed">{textObj?.header?.titlePart2}</span>
		</h2>
		<h3 class="w-[52%] text-center text-primary-beige/75">
			{textObj?.subtitle}
		</h3>
	</div>
	<div class="w-[80%] flex justify-center mt-10 flex-wrap gap-5">
		{#each textObj?.list as partner}
			<a href={partner.link} target="_blank" class="w-[15%] cursor-pointer">
				<img
					class="border border-primary-panther rounded-md px-6 py-2"
					src={partner.imgPath}
					alt={partner.name} />
			</a>
		{/each}
	</div>
</div>
