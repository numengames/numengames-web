<script>
	import BracketedContent from "@components/BracketedContent.svelte";

	export let textObj;

	let selectedYear =
		textObj?.content?.length > 0 ? Object.keys(textObj.content[0])[0] : null;

	function toggleYearSelection(year) {
		selectedYear = selectedYear === year ? null : year;
	}
</script>

<div class="w-full flex flex-col relative">
	<div class="w-full flex flex-col items-start z-10">
		<BracketedContent
			className="text-primary-beige/75"
			text={textObj?.bracketedContent} />
		<div class="w-full flex justify-between items-center">
			<h2
				class="text-4xl 2xl:text-5xl font-normal mt-3 mb-6 text-primary-beige pr-10">
				{textObj?.header?.titlePart1}
				<span class="text-primary-coralRed">{textObj?.header?.titlePart2}</span>
			</h2>
		</div>
	</div>
	<div class="flex flex-col mt-10 h-full">
		{#each textObj?.content as yearContent}
			{#each Object.entries(yearContent) as [year, texts]}
				<button
					class="flex h-full cursor-pointer relative"
					on:click={() => toggleYearSelection(year)}
					on:keydown={(e) => e.key === "Enter" && toggleYearSelection(year)}>
					<h3
						class={`year-title font-IBMPlexMono ${selectedYear === year ? "text-red-500" : "text-primary-beige/40"}`}>
						{year}
					</h3>
					<div class="h-full px-16 flex flex-col items-center">
						<div class="flex w-full items-center justify-center relative z-10">
							<div
								class={`rounded-full top-0 ${selectedYear === year ? "bg-primary-coralRed" : "bg-[#909091]/50"} w-6 h-6 opacity-40 absolute`}>
							</div>
							<div
								class={`rounded-full top-1.5 ${
									selectedYear === year ? "bg-primary-coralRed" : "bg-[#909091]"
								} w-3 h-3 absolute`}>
							</div>
						</div>
						{#if yearContent !== textObj.content[textObj.content.length - 1]}
							<div class="absolute w-0.5 h-full top-2.5 bg-primary-panther">
							</div>
						{/if}
					</div>
					<div class="flex flex-col h-full">
						{#each texts as text, index}
							<p
								class={`text-left ${index === texts.length - 1 ? "pb-16" : ""} ${selectedYear === year ? "text-primary-beige/75" : "text-primary-beige/40"}`}>
								{text}
							</p>
						{/each}
					</div>
				</button>
			{/each}
		{/each}
	</div>
</div>
