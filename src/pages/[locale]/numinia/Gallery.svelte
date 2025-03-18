<script>
	import BracketedContent from "@components/BracketedContent.svelte";

	export let textObj;
</script>

<div class="w-full flex flex-col relative">
	<div class="w-full flex flex-col items-center z-10">
		<BracketedContent
			className="text-primary-beige/75"
			text={textObj?.bracketedContent} />
		<div class="w-full flex flex-col justify-between items-center">
			<h2
				class="text-4xl 2xl:text-5xl font-normal mt-3 mb-6 text-primary-beige pr-10">
				{textObj?.header?.titlePart1}
				<span class="text-primary-coralRed">{textObj?.header?.titlePart2}</span>
				{textObj?.header?.titlePart3}
			</h2>
			<p class="text-primary-beige">{textObj?.description}</p>
		</div>
	</div>
	<div class="flex flex-col items-center w-full">
		<iframe
			width="929"
			height="523"
			src="https://www.youtube.com/embed/2GweAC5ItvM"
			title="Welcome to Numinia City"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			referrerpolicy="strict-origin-when-cross-origin"
			allowfullscreen></iframe>
	</div>
</div>
