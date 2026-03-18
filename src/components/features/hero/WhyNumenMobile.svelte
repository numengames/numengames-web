<script lang="ts">
	import { onMount, onDestroy } from "svelte";
	import { DEFAULT_LOCALE } from "../../../i18n";
	import type { SupportedLocale } from "../../../i18n";
	import PulseAnimatedBtn from "@components/PulseAnimatedBtn.svelte";
	import BracketedContent from "@components/BracketedContent.svelte";

	export let locale: SupportedLocale = DEFAULT_LOCALE;

	const translations: Record<SupportedLocale, {
		label: string;
		points: { number: string; title: string; desc: string; tag: string }[];
		button: string;
	}> = {
		en: {
			label: "WHY_NUMEN",
			points: [
				{
					number: "01",
					tag: "Cost",
					title: "Engagement",
					desc: "Hosting and organizing professional events often comes with hidden costs that escalate unexpectedly. Shifting to immersive virtual experiences not only curbs these costs but also delivers impactful, unforgettable events."
				},
				{
					number: "02",
					tag: "Culture",
					title: "Training",
					desc: "Remote teams frequently face challenges in preserving a cohesive company culture through video meetings. With the right set of tools, teams can develop deeper bonds through immersive, interactive environments."
				},
				{
					number: "03",
					tag: "Operations",
					title: "Experience",
					desc: "Planning team-building events demands extensive coordination, pulling critical resources away from essential business operations. Virtual formats give organizations the flexibility to adapt while maintaining meaningful engagement."
				}
			],
			button: "Ready to Talk"
		},
		es: {
			label: "POR_QUÉ_NUMEN",
			points: [
				{
					number: "01",
					tag: "Coste",
					title: "Engagement",
					desc: "Organizar eventos profesionales a menudo conlleva costos ocultos que escalan inesperadamente. Cambiar a experiencias virtuales inmersivas no solo reduce estos costos, sino que también ofrece eventos impactantes."
				},
				{
					number: "02",
					tag: "Cultura",
					title: "Training",
					desc: "Los equipos remotos suelen enfrentar desafíos para preservar una cultura empresarial cohesiva. Con el conjunto adecuado de herramientas, los equipos pueden desarrollar vínculos más profundos."
				},
				{
					number: "03",
					tag: "Operaciones",
					title: "Experience",
					desc: "Planificar eventos requiere una coordinación extensiva que desvía recursos críticos. Al hacer la transición a formatos virtuales, las organizaciones ganan flexibilidad y compromiso."
				}
			],
			button: "Hablemos"
		}
	};

	const t = translations[locale] ?? translations.en;
	const STEPS = t.points.length;

	let activeIndex = 0;
	let intervalId: ReturnType<typeof setInterval> | undefined;

	function goTo(i: number) {
		activeIndex = i;
		restartTimer();
	}

	function next() {
		activeIndex = (activeIndex + 1) % STEPS;
	}

	function restartTimer() {
		if (intervalId) clearInterval(intervalId);
		intervalId = setInterval(next, 5000);
	}

	onMount(() => restartTimer());
	onDestroy(() => { if (intervalId) clearInterval(intervalId); });
</script>

<div class="xl:hidden bg-primary-panther px-5 pt-12 pb-20">

	<BracketedContent text={t.label} />

	<!-- Card -->
	<div class="mt-8 relative">
		{#each t.points as point, i}
			<div
				class="transition-all duration-500"
				style="display: {activeIndex === i ? 'block' : 'none'}">

				<div class="flex items-start gap-3 mb-4">
					<div class="flex flex-col items-center gap-1.5 pt-1 shrink-0">
						<div class="w-px h-12"
							style="background: linear-gradient(to bottom, rgba(217,184,106,0.55), rgba(217,184,106,0.03));">
						</div>
						<div class="w-1.5 h-1.5 rounded-full bg-[#D9B86A]"></div>
					</div>
					<div>
						<p class="text-xs font-mono tracking-[0.2em] text-[#D9B86A]/55 mb-1">{point.tag}</p>
						<p class="font-bold leading-none text-primary-beige/5 select-none"
							style="font-size: clamp(4rem, 20vw, 6rem);">
							{point.number}
						</p>
					</div>
				</div>

				<div class="pl-1 border-l border-[rgba(217,184,106,0.1)] ml-2">
					<h2 class="text-2xl font-medium text-white tracking-tight leading-tight mb-3 pl-4">
						{point.title}
					</h2>
					<p class="text-sm text-primary-beige/55 font-light leading-relaxed pl-4">
						{point.desc}
					</p>
				</div>
			</div>
		{/each}
	</div>

	<!-- Timeline dots -->
	<div class="mt-8 flex flex-col gap-3">
		<div class="relative h-px w-full bg-[rgba(217,184,106,0.12)]">
			<div class="absolute left-0 top-0 h-full bg-[#D9B86A] transition-all duration-500"
				style="width: {((activeIndex + 1) / STEPS) * 100}%;">
			</div>
			{#each t.points as _, i}
				<button
					on:click={() => goTo(i)}
					class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full border transition-all duration-300"
					style="
						left: {((i * 2 + 1) / (STEPS * 2)) * 100}%;
						width: {activeIndex === i ? '12px' : '8px'};
						height: {activeIndex === i ? '12px' : '8px'};
						background: {activeIndex >= i ? '#D9B86A' : 'rgb(33,33,35)'};
						border-color: {activeIndex >= i ? '#D9B86A' : 'rgba(217,184,106,0.22)'};
						box-shadow: {activeIndex === i ? '0 0 10px rgba(217,184,106,0.5)' : 'none'};
					"
					aria-label={t.points[i].title}>
				</button>
			{/each}
		</div>

		<div class="flex" style="justify-content: space-around;">
			{#each t.points as point, i}
				<button
					on:click={() => goTo(i)}
					class="flex flex-col items-center gap-1 text-center transition-all duration-300"
					style="opacity: {activeIndex === i ? 1 : 0.3}; width: {100 / STEPS}%;">
					<span class="text-[9px] font-mono tracking-widest text-[#D9B86A]">{point.number}</span>
					<span class="text-[10px] text-primary-beige/60 leading-snug">{point.title}</span>
				</button>
			{/each}
		</div>
	</div>

	<!-- CTA -->
	<div class="mt-10 flex justify-center">
		<PulseAnimatedBtn
			className="text-primary-beige form-toggle-button"
			text={t.button} />
	</div>

</div>
