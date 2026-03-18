<script lang="ts">
	import { onMount, onDestroy } from "svelte";
	import { DEFAULT_LOCALE } from "../../../i18n";
	import type { SupportedLocale } from "../../../i18n";
	import PulseAnimatedBtn from "@components/PulseAnimatedBtn.svelte";
	import BracketedContent from "@components/BracketedContent.svelte";

	export let locale: SupportedLocale = DEFAULT_LOCALE;

	let sectionEl: HTMLElement;
	let activeIndex = 0;
	let fillPct = 0;

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
					title: "Event costs spiral quickly",
					desc: "Hosting and organizing professional events often comes with hidden costs that escalate unexpectedly. Shifting to immersive virtual experiences not only curbs these costs but also delivers impactful, unforgettable events."
				},
				{
					number: "02",
					tag: "Culture",
					title: "Culture fades over Zoom",
					desc: "Remote teams frequently face challenges in preserving a cohesive company culture through video meetings. With the right set of tools, teams can develop deeper bonds through immersive, interactive environments."
				},
				{
					number: "03",
					tag: "Operations",
					title: "Logistics drain your resources",
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
					title: "Los costos de eventos se disparan",
					desc: "Organizar eventos profesionales a menudo conlleva costos ocultos que escalan inesperadamente. Cambiar a experiencias virtuales inmersivas no solo reduce estos costos, sino que también ofrece eventos impactantes."
				},
				{
					number: "02",
					tag: "Cultura",
					title: "La cultura se desvanece a través de Zoom",
					desc: "Los equipos remotos suelen enfrentar desafíos para preservar una cultura empresarial cohesiva. Con el conjunto adecuado de herramientas, los equipos pueden desarrollar vínculos más profundos."
				},
				{
					number: "03",
					tag: "Operaciones",
					title: "La logística agota tus recursos",
					desc: "Planificar eventos requiere una coordinación extensiva que desvía recursos críticos. Al hacer la transición a formatos virtuales, las organizaciones ganan flexibilidad y compromiso."
				}
			],
			button: "Hablemos"
		}
	};

	const t = translations[locale] ?? translations.en;
	const STEPS = t.points.length;

	// Walk up the offsetParent chain for true document-relative top
	function getAbsoluteTop(el: HTMLElement): number {
		let top = 0;
		let curr: HTMLElement | null = el;
		while (curr) {
			top += curr.offsetTop;
			curr = curr.offsetParent as HTMLElement | null;
		}
		return top;
	}

	function update() {
		if (!sectionEl) return;
		const absTop = getAbsoluteTop(sectionEl);
		const scrollable = sectionEl.offsetHeight - window.innerHeight;
		const scrolled = window.scrollY - absTop;
		const raw = Math.max(0, Math.min(1, scrolled / scrollable));
		fillPct = raw * 100;
		activeIndex = Math.min(STEPS - 1, Math.floor(raw * STEPS));
	}

	function goToStep(i: number) {
		const absTop = getAbsoluteTop(sectionEl);
		const scrollable = sectionEl.offsetHeight - window.innerHeight;
		window.scrollTo({ top: absTop + (i / STEPS) * scrollable, behavior: "smooth" });
	}

	onMount(() => {
		window.addEventListener("scroll", update, { passive: true });
		update();
	});

	onDestroy(() => {
		window.removeEventListener("scroll", update);
	});
</script>

<div bind:this={sectionEl} class="xl:block hidden pb-8" style="height: 300vh;">
	<div class="sticky top-0 h-screen bg-primary-panther flex flex-col overflow-hidden">

		<!-- Subtle bg glow -->
		<div class="absolute inset-0 pointer-events-none"
			style="background: radial-gradient(ellipse at 75% 50%, rgba(217,184,106,0.05) 0%, transparent 55%);">
		</div>

		<!-- Content area -->
		<div class="relative flex-1 flex flex-col justify-between py-12 xl:py-16 px-10 xl:px-16 2xl:px-24">

			<!-- Header label -->
			<BracketedContent text={t.label} />

			<!-- Main grid -->
			<div class="grid grid-cols-5 gap-12 xl:gap-20 items-center">

				<!-- Left: step number decorative -->
				<div class="col-span-2 flex flex-col gap-8">
					<div class="flex items-start gap-4">
						<div class="flex flex-col items-center gap-2 pt-2 shrink-0">
							<div class="w-px h-20"
								style="background: linear-gradient(to bottom, rgba(217,184,106,0.55), rgba(217,184,106,0.03));">
							</div>
							<div class="w-2 h-2 rounded-full bg-[#D9B86A] shrink-0"></div>
						</div>
						<div class="flex flex-col gap-2">
							<p class="text-xs font-mono tracking-[0.22em] text-[#D9B86A]/55">
								{t.points[activeIndex].tag}
							</p>
							<p class="font-bold leading-none select-none text-primary-beige/5"
								style="font-size: clamp(5.5rem, 10vw, 9rem);">
								{t.points[activeIndex].number}
							</p>
						</div>
					</div>

					<PulseAnimatedBtn
						className="text-primary-beige form-toggle-button"
						text={t.button} />
				</div>

				<!-- Right: title + desc + step pills -->
				<div class="col-span-3 flex flex-col gap-6 pl-10 xl:pl-14 border-l border-[rgba(217,184,106,0.1)]">
					<h2 class="text-3xl xl:text-4xl 2xl:text-5xl font-medium text-white tracking-tight leading-tight">
						{t.points[activeIndex].title}
					</h2>
					<p class="text-base xl:text-lg text-primary-beige/55 font-light leading-relaxed max-w-xl">
						{t.points[activeIndex].desc}
					</p>
					<div class="flex gap-3 pt-2">
						{#each t.points as point, i}
							<button
								on:click={() => goToStep(i)}
								class="px-3 py-1.5 rounded border text-xs font-mono tracking-widest transition-all duration-300"
								style="
									border-color: {activeIndex === i ? 'rgba(217,184,106,0.5)' : 'rgba(217,184,106,0.12)'};
									color: {activeIndex === i ? '#D9B86A' : 'rgba(245,236,214,0.25)'};
									background: {activeIndex === i ? 'rgba(217,184,106,0.07)' : 'transparent'};
								">
								{point.number}
							</button>
						{/each}
					</div>
				</div>
			</div>

			<!-- Timeline -->
			<div class="flex flex-col gap-4">
				<div class="relative h-px w-full bg-[rgba(217,184,106,0.12)]">
					<div class="absolute left-0 top-0 h-full bg-[#D9B86A] transition-none"
						style="width: {fillPct}%;">
					</div>
					{#each t.points as _, i}
						<button
							on:click={() => goToStep(i)}
							class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full border transition-all duration-300"
							style="
								left: {((i * 2 + 1) / (STEPS * 2)) * 100}%;
								width: {activeIndex === i ? '14px' : '9px'};
								height: {activeIndex === i ? '14px' : '9px'};
								background: {activeIndex >= i ? '#D9B86A' : 'rgb(20,20,20)'};
								border-color: {activeIndex >= i ? '#D9B86A' : 'rgba(217,184,106,0.22)'};
								box-shadow: {activeIndex === i ? '0 0 12px rgba(217,184,106,0.55)' : 'none'};
							"
							aria-label={t.points[i].title}>
						</button>
					{/each}
				</div>
				<div class="flex" style="justify-content: space-around;">
					{#each t.points as point, i}
						<button
							on:click={() => goToStep(i)}
							class="flex flex-col items-center gap-1 text-center transition-all duration-300 cursor-pointer"
							style="opacity: {activeIndex === i ? 1 : 0.3}; width: {100 / STEPS}%;">
							<span class="text-[10px] font-mono tracking-widest text-[#D9B86A]">{point.number}</span>
							<span class="text-xs text-primary-beige/60 font-light leading-snug max-w-[160px]">{point.title}</span>
						</button>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>
