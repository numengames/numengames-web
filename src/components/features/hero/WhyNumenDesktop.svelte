<script>
	import { onMount, onDestroy } from "svelte";
	import { DEFAULT_LOCALE } from "../../../i18n";

	import { setupRotation } from "@scripts/rotation";
	import Container from "@components/Container.svelte";
	import FeaturePoint from "@components/FeaturePoint.svelte";
	import PulseAnimatedBtn from "@components/PulseAnimatedBtn.svelte";
	import BracketedContent from "@components/BracketedContent.svelte";
	export let locale = DEFAULT_LOCALE;

	let activeIndex = 0;
	const contentCount = 3;
	let timeUntilNextAnimation = 20000;

	const { start, stop, handleButtonClick } = setupRotation(contentCount, timeUntilNextAnimation, (newIndex) => (activeIndex = newIndex));

	const images = ["/assets/I2.png", "/assets/I1.png", "/assets/I3.png"];
	const imageAlts = ["Illustration of escalating event costs", "Illustration of remote culture challenges", "Illustration of logistics complexity"];

	const translations = {
		en: {
			whyNumen: "WHY_NUMEN",
			featurePoints: {
				costs: "Event costs spiral quickly",
				culture: "Culture fades over zoom",
				logistics: "Logistics drain your resources",
			},
			cardDescriptions: {
				costs: "Hosting and organizing professional events often comes with hidden costs that escalate unexpectedly. Expenses like travel and venue rentals can make traditional event formats increasingly impractical for many organizations. Shifting to immersive virtual experiences not only curbs these costs but also delivers impactful, unforgettable events.",
				culture: "Remote teams frequently face challenges in preserving a cohesive company culture through video meetings. Establishing authentic connections and keeping team members engaged can feel daunting when interactions lack a personal touch and fluidity. Yet, with the right set of tools, remote teams can develop deeper bonds and a sense of unity through immersive, interactive environments.",
				logistics: "Planning team-building events or conferences often demands extensive coordination, from aligning schedules to securing venues and organizing activities. This often pulls critical resources away from essential business operations. By transitioning to virtual formats, organizations gain the flexibility to adapt events to their needs while maintaining scalability and meaningful engagement.",
			},
			cta: "Start designing your 3D environment",
			button: "Ready to Talk",
		},
		es: {
			whyNumen: "POR_QUÉ_NUMEN",
			featurePoints: {
				costs: "Los costos de eventos se disparan rápidamente",
				culture: "La cultura se desvanece a través de Zoom",
				logistics: "La logística agota tus recursos",
			},
			cardDescriptions: {
				costs: "Organizar eventos profesionales a menudo conlleva costos ocultos que escalan inesperadamente. Gastos como viajes y alquiler de locales pueden hacer que los formatos tradicionales de eventos sean cada vez más impracticables para muchas organizaciones. Cambiar a experiencias virtuales inmersivas no solo reduce estos costos, sino que también ofrece eventos impactantes e inolvidables.",
				culture: "Los equipos remotos suelen enfrentar desafíos para preservar una cultura empresarial cohesiva a través de reuniones por video. Establecer conexiones auténticas y mantener a los miembros del equipo comprometidos puede resultar desalentador cuando las interacciones carecen de un toque personal y fluidez. Sin embargo, con el conjunto adecuado de herramientas, los equipos remotos pueden desarrollar vínculos más profundos y un sentido de unidad a través de entornos inmersivos e interactivos.",
				logistics: "Planificar eventos de creación de equipos o conferencias a menudo requiere una coordinación extensiva, desde alinear agendas hasta asegurar locales y organizar actividades. Esto a menudo desvía recursos críticos de las operaciones comerciales esenciales. Al hacer la transición a formatos virtuales, las organizaciones obtienen la flexibilidad para adaptar los eventos a sus necesidades mientras mantienen la escalabilidad y un compromiso significativo.",
			},
			cta: "Comienza a diseñar tu entorno 3D",
			button: "Hablemos",
		},
	};

	const texts = translations[locale];

	onMount(() => start());
	onDestroy(() => stop());
</script>

<Container className="xl:flex hidden items-center justify-center" bgColor="bg-nocturno-base">
	<div class="py-12 md:py-16 lg:py-20 w-full flex gap-12 2xl:gap-16 text-arena items-stretch">
		<!-- Left: large image -->
		<div class="relative flex-1 rounded-2xl overflow-hidden min-h-[520px] border border-[rgba(239,165,23,0.18)]">
			{#each images as img, i (i)}
				<img src={img} alt={imageAlts[i]} class="absolute inset-0 w-full h-full object-cover" style="opacity: {activeIndex === i ? 1 : 0}; transition: opacity 0.8s ease;" />
			{/each}
			<div class="absolute inset-0 bg-gradient-to-t from-[rgba(20,17,15,0.55)] to-transparent pointer-events-none"></div>
		</div>

		<!-- Right: content -->
		<section class="flex flex-col justify-between w-[44%] 2xl:w-[42%]">
			<div class="flex flex-col">
				<BracketedContent text={texts.whyNumen} />
				<FeaturePoint on:click={() => handleButtonClick(0)} title={texts.featurePoints.costs} isAnimating={activeIndex === 0} superscriptNumber="01" />
				<FeaturePoint on:click={() => handleButtonClick(1)} title={texts.featurePoints.culture} isAnimating={activeIndex === 1} superscriptNumber="02" />
				<FeaturePoint on:click={() => handleButtonClick(2)} title={texts.featurePoints.logistics} isAnimating={activeIndex === 2} superscriptNumber="03" />

				<p class="mt-6 2xl:mt-8 text-arena/65 text-base 2xl:text-lg font-light leading-relaxed" style="opacity: 1; transition: opacity 0.5s ease;">
					{activeIndex === 0 ? texts.cardDescriptions.costs : activeIndex === 1 ? texts.cardDescriptions.culture : texts.cardDescriptions.logistics}
				</p>
			</div>
			<div>
				<p class="text-base 2xl:text-xl font-extralight max-w-[12rem] 2xl:max-w-[13rem] 3xl:max-w-[15rem]">
					{texts.cta}
				</p>
				<PulseAnimatedBtn className="mt-10 2xl:mt-12 2xl:text-lg text-arena form-toggle-button" text={texts.button} />
			</div>
		</section>
	</div>
</Container>
