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
</script>

<div class="w-full flex flex-col relative items-center">
	<div class="w-full flex flex-col items-center z-10">
		<BracketedContent className="text-arena/75" text={textObj?.bracketedContent} />
		<h2 class="text-4xl 2xl:text-5xl font-normal mt-4 mb-6 text-arena pr-10">
			{textObj?.header?.titlePart1}
			<span class="text-ambar">{textObj?.header?.titlePart2}</span>
		</h2>
		<h3 class="w-[52%] text-center text-arena/75">
			{textObj?.subtitle}
		</h3>
	</div>
	<div class="w-[80%] flex justify-center mt-10 flex-wrap gap-5">
		{#each textObj?.list as partner, index (index)}
			<a href={partner.link} target="_blank" class="w-[15%] cursor-pointer">
				<img class="border border-nocturno-base rounded-md px-6 py-2" src={partner.imgPath} alt={partner.name} />
			</a>
		{/each}
	</div>
</div>
