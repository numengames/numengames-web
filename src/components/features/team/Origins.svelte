<script lang="ts">
	import { DEFAULT_LOCALE, type SupportedLocale } from "../../../i18n";
	/**
	 * TODO(MIS-091): this component receives `locale` and does not use it — its
	 * copy is hardcoded. The Spanish route renders the English strings. Wiring
	 * it to `src/i18n` is a content task, tracked in TODO.md.
	 */
	export let locale: SupportedLocale = DEFAULT_LOCALE;
	import type { ContentData } from "@app-types/content";
	import BracketedContent from "@components/BracketedContent.svelte";

	export let textObj: ContentData;

	let selectedYear = textObj?.content?.length > 0 ? Object.keys(textObj.content[0])[0] : null;

	function toggleYearSelection(year) {
		selectedYear = selectedYear === year ? null : year;
	}
</script>

<div class="w-full flex flex-col relative">
	<div class="w-full flex flex-col items-start z-10">
		<BracketedContent className="text-arena/75" text={textObj?.bracketedContent} />
		<div class="w-full flex justify-between items-center">
			<h2 class="text-4xl 2xl:text-5xl font-normal mt-3 mb-6 text-arena pr-10">
				{textObj?.header?.titlePart1}
				<span class="text-ambar">{textObj?.header?.titlePart2}</span>
			</h2>
		</div>
	</div>
	<div class="flex flex-col mt-10 h-full max-w-4xl mx-auto">
		{#each textObj?.content as yearContent, yearIndex (yearIndex)}
			{#each Object.entries(yearContent) as [year, texts] (year)}
				<button class="flex h-full cursor-pointer relative mb-8" on:click={() => toggleYearSelection(year)} on:keydown={(e) => e.key === "Enter" && toggleYearSelection(year)}>
					<h3 class={`year-title font-geistMono text-xl md:text-2xl ${selectedYear === year ? "text-ambar" : "text-arena/40"}`}>
						{year}
					</h3>
					<div class="h-full px-8 md:px-16 flex flex-col items-center">
						<div class="flex w-full items-center justify-center relative z-10">
							<div class={`rounded-full top-0 ${selectedYear === year ? "bg-ambar" : "bg-[#8A7D72]/50"} w-6 h-6 opacity-40 absolute`}></div>
							<div class={`rounded-full top-1.5 ${selectedYear === year ? "bg-ambar" : "bg-[#8A7D72]"} w-3 h-3 absolute`}></div>
						</div>
						{#if yearContent !== textObj.content[textObj.content.length - 1]}
							<div class="absolute w-0.5 h-full top-2.5 bg-nocturno-base"></div>
						{/if}
					</div>
					<div class="flex flex-col h-full flex-1">
						{#each texts as text, index (index)}
							<p class={`text-left text-base md:text-lg leading-relaxed ${index === texts.length - 1 ? "pb-8 md:pb-16" : "pb-4"} ${selectedYear === year ? "text-arena/75" : "text-arena/40"}`}>
								{text}
							</p>
						{/each}
					</div>
				</button>
			{/each}
		{/each}
	</div>
</div>
