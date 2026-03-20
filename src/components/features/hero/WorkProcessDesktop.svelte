<script>
	import { onMount } from "svelte";
	import { getWorkProcessTranslations } from "../../../i18n/translations/workProcess";
	import { DEFAULT_LOCALE } from "../../../i18n";

	import Container from "@components/Container.svelte";
	import BracketedContent from "@components/BracketedContent.svelte";

	export let locale = DEFAULT_LOCALE;

	$: t = getWorkProcessTranslations(locale);
	$: steps = t.steps;

	onMount(() => {
		const handleScroll = () => {
			const elements = document.querySelectorAll(".work-process-step");
			elements.forEach((element) => {
				const rect = element.getBoundingClientRect();
				if (rect.top < window.innerHeight && rect.bottom >= 0) {
					element.classList.add("visible");
					element.style.opacity = 1;
				} else {
					element.classList.remove("visible");
					element.style.opacity = 0;
				}
			});
		};

		window.addEventListener("scroll", handleScroll);
		handleScroll();

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	});
</script>

<Container
	className="xl:flex hidden flex-col items-center justify-center pt-12 pb-60"
	bgColor="bg-primary-panther">
	<div class="flex flex-col items-center relative">
		<div
			class="h-[180px] sticky top-[100px] flex flex-col items-center z-20 text-primary-beige">
			<BracketedContent text={t.label} />
			<h2 class="text-5xl 3xl:text-6xl font-medium text-center mt-3">
				{t.heading}
			</h2>
		</div>

		{#each steps as step, index}
			<div
				class="max-w-[450px] 2xl:max-w-[600px] work-process-step sticky opacity-100 transition-opacity duration-700 p-6 rounded-lg mx-12 border border-[rgba(217,184,106,0.18)] bg-[linear-gradient(135deg,rgba(48,40,24,0.94),rgba(28,28,28,0.96),rgba(64,52,24,0.92))]"
				style={`top: ${280 + index * 120}px; z-index: ${3 + index}; transform: rotate(${index % 2 === 0 ? "-3deg" : "3deg"}); margin-bottom: ${[144, 0, -144][index] || 0}px; box-shadow: 0 0 32px rgba(217,184,106,0.14), 0 18px 48px rgba(0,0,0,0.36);`}>
				<p
					class="px-5 mt-2 text-2xl font-light text-[#D9B86A] font-IBMPlexMono">
					{step.number}
				</p>
				<div class="p-6 mt-2">
					<h3 class="text-primary-beige text-4xl font-medium text-left mb-3">
						{step.title}
					</h3>
					<p
						class="text-primary-beige/70 font-thin mt-6 text-base 2xl:text-xl 3xl:text-2xl">
						{step.description}
					</p>
					{#if index === steps.length - 1}
						<div class="relative inline-block">
							<button
								class="wp-btn text-base px-6 py-3 mt-10 text-white form-toggle-button">
								{t.cta}
							</button>
							<span
								class="absolute top-10 right-0 text-xs font-bold text-[#171717] bg-[#D9B86A] rounded-md px-2 py-1 transform translate-x-1/2 -translate-y-1/2 shadow-[0_0_14px_rgba(217,184,106,0.25)]">
								{t.badge}
							</span>
						</div>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</Container>

<style>
	.wp-btn {
		background: #1A1A1A;
		border: 1px solid #2A2A2A;
		border-radius: 0.75rem;
		box-shadow: 0 0 20px 3px rgba(217, 184, 106, 0.35);
		transition: all 0.3s;
	}

	.wp-btn:hover {
		box-shadow: 0 0 30px 6px rgba(217, 184, 106, 0.75);
	}
</style>
