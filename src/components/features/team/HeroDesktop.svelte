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
	import PulseAnimatedBtn from "@components/PulseAnimatedBtn.svelte";

	export let textObj: ContentData;
</script>

<div class="w-full flex flex-col items-center relative mt-8 md:mt-16 after:content-[''] after:absolute after:w-full after:left-0 md:after:left-[-2.5rem] after:h-[90%] after:top-1/2 after:transform after:-translate-y-1/2">
	<div class="flex flex-col justify-center items-center z-10 mb-8 md:mb-14 w-[90%] md:max-w-[75%]">
		<BracketedContent className="text-arena/75" text={textObj?.bracketedContent} />
		<h1 class="flex flex-col md:flex-row text-3xl md:text-5xl leading-tight 2xl:text-5xl 2xl:leading-tight font-normal text-center md:text-left mt-3 mb-4 md:mb-6 text-arena md:pr-10">
			<span class="flex items-center justify-center md:justify-start">
				{textObj?.header?.titlePart1}
				<span class="ml-2 md:ml-4 flex">
					<img src="/assets/n.png" class="h-6 md:h-10 mt-2" alt="Numen Games logomark" />
				</span>
			</span>
			<span class="text-ambar mx-2 md:mr-3">
				{textObj?.header?.titlePart2}
			</span>
			{textObj?.header?.titlePart3}
		</h1>
		<h2 class="w-full md:w-[75%] text-sm md:text-base font-light text-arena/75 text-center mb-6">
			{textObj?.header?.subtitle}
		</h2>
		<div class="flex flex-col md:flex-row text-arena font-light gap-4 md:gap-6">
			<PulseAnimatedBtn text={textObj?.ctaButtons?.primary?.text} className="form-toggle-button" />
			<button class="text-xs px-6 py-3 bg-arena/10 border-arena/20 rounded border hover:bg-arena/30">
				{textObj?.ctaButtons?.secondary?.text}
			</button>
		</div>
	</div>
</div>
