<script lang="ts">
	import { DEFAULT_LOCALE, type SupportedLocale } from "../../../i18n";
	/**
	 * TODO(MIS-091): this component receives `locale` and does not use it — its
	 * copy is hardcoded. The Spanish route renders the English strings. Wiring
	 * it to `src/i18n` is a content task, tracked in TODO.md.
	 */
	export let locale: SupportedLocale = DEFAULT_LOCALE;
	import Container from "@components/Container.svelte";
	import BracketedContent from "@components/BracketedContent.svelte";

	export let steps = [
		{
			number: "01",
			title: "Act",
			description: "Share your requirements and employee profiles to enable us to craft a solution tailored to your team's unique needs.",
		},
		{
			number: "02",
			title: "Infer",
			description: "Our approach involves an in-depth assessment of your needs, ensuring the simulation solutions we create are perfectly aligned with your team's expertise.",
		},
		{
			number: "03",
			title: "Serv",
			description: "Get customized solutions designed to achieve your goals. Then, choose from our wide variety of gamified options to boost your employee training program.",
		},
	];
</script>

<Container className="xl:hidden flex flex-col items-center justify-center pt-8 pb-20" bgColor="bg-nocturno-base">
	<div class="flex flex-col items-center relative mt-8">
		<div class="flex flex-col items-center z-20 text-arena">
			<BracketedContent text="WORK_PROCESS" />
			<h2 class="text-3xl font-light xl:text-5xl 3xl:text-6xl xl:font-medium text-center mt-3">How We Co-Create With You</h2>
		</div>

		<div class="flex flex-col gap-8 mt-12 w-full" style="visibility: visible !important; opacity: 1 !important;">
			{#each steps as step, index (index)}
				<div class="w-full max-w-[450px] mx-auto p-6 rounded-lg border border-[rgba(239,165,23,0.18)] bg-[linear-gradient(135deg,rgba(41,36,32,0.94),rgba(30,26,23,0.96),rgba(41,36,32,0.92))]" style={`transform: rotate(${index % 2 === 0 ? "-3deg" : "3deg"}); box-shadow: 0 0 12px rgba(239, 165, 23, 0.25); visibility: visible !important; opacity: 1 !important;`}>
					<p class="px-1 mt-2 text-2xl font-light text-[#EFA517] font-geistMono">
						{step.number}
					</p>
					<div class="p-1 mt-2">
						<h3 class="text-arena text-4xl font-medium text-left mb-3">
							{step.title}
						</h3>
						<p class="text-arena/70 font-thin mt-6 text-base">
							{step.description}
						</p>
						{#if index === steps.length - 1}
							<div class="relative inline-block">
								<button class="text-base px-6 py-3 rounded-md border border-solid border-[rgba(239,165,23,0.35)] backdrop-blur-[25px] mt-10 text-arena form-toggle-button bg-[rgba(239,165,23,0.06)] hover:bg-[rgba(239,165,23,0.12)] transition-colors"> Let's talk </button>
								<span class="absolute top-10 right-0 text-xs font-bold text-[#1E1A17] bg-[#EFA517] rounded-md px-2 py-1 transform translate-x-1/2 -translate-y-1/2"> FREE </span>
							</div>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
</Container>

<style>
	:global(.work-process-step) {
		visibility: visible !important;
		opacity: 1 !important;
	}
</style>
