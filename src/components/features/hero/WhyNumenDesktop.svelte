<script>
	import { onMount, onDestroy } from "svelte";
	import { getLocaleFromURL, DEFAULT_LOCALE } from "../../../i18n";

	import Container from "@components/Container.svelte";
	import { setupRotation } from "@scripts/rotation.js";
	import LoadingButton from "@components/LoadingButton.svelte";
	import BracketedContent from "@components/BracketedContent.svelte";
	import CardWithVRMAndCTA from "@components/cards/WithVRMAndCTA.svelte";

	export let locale = DEFAULT_LOCALE;

	let activeIndex = 0;
	const contentCount = 3;
	let timeUntilNextAnimation = 20000;

	const { start, stop, handleButtonClick } = setupRotation(
		contentCount,
		timeUntilNextAnimation,
		(newIndex) => (activeIndex = newIndex),
	);

	const translations = {
		en: {
			whyNumen: "WHY NUMEN",
			title: {
				text1: "Discover the",
				highlight: "power of gamification",
				text2: "in your organization"
			},
			cards: {
				engagement: {
					title: "Boost engagement and motivation",
					categoryLabel: "ENGAGEMENT",
					highlightMetricValue: "+60%",
					highlightMetricDescription: "Employee Engagement",
					description: "Transform mundane tasks into engaging experiences. Our gamified solutions make learning and development not just effective, but truly enjoyable, leading to higher engagement rates and better outcomes."
				},
				retention: {
					title: "Improve retention and performance",
					categoryLabel: "RETENTION",
					highlightMetricValue: "+40%",
					highlightMetricDescription: "Knowledge Retention",
					description: "Through interactive learning and real-time feedback, employees retain information better and perform tasks more efficiently. Our solutions create lasting impact through memorable, hands-on experiences."
				},
				roi: {
					title: "Maximize your ROI",
					categoryLabel: "ROI",
					highlightMetricValue: "3x",
					highlightMetricDescription: "Return on Investment",
					description: "Our gamified solutions deliver measurable results. From reduced training time to improved performance metrics, see tangible returns on your investment in engaging, effective learning experiences."
				}
			}
		},
		es: {
			whyNumen: "POR QUÉ NUMEN",
			title: {
				text1: "Descubre el",
				highlight: "poder de la gamificación",
				text2: "en tu organización"
			},
			cards: {
				engagement: {
					title: "Impulsa el compromiso y la motivación",
					categoryLabel: "COMPROMISO",
					highlightMetricValue: "+60%",
					highlightMetricDescription: "Compromiso Empleados",
					description: "Transforma las tareas rutinarias en experiencias atractivas. Nuestras soluciones gamificadas hacen que el aprendizaje y desarrollo no solo sean efectivos, sino verdaderamente agradables, llevando a mayores tasas de compromiso y mejores resultados."
				},
				retention: {
					title: "Mejora la retención y el rendimiento",
					categoryLabel: "RETENCIÓN",
					highlightMetricValue: "+40%",
					highlightMetricDescription: "Retención Conocimiento",
					description: "A través del aprendizaje interactivo y feedback en tiempo real, los empleados retienen mejor la información y realizan las tareas de manera más eficiente. Nuestras soluciones crean un impacto duradero a través de experiencias memorables y prácticas."
				},
				roi: {
					title: "Maximiza tu ROI",
					categoryLabel: "ROI",
					highlightMetricValue: "3x",
					highlightMetricDescription: "Retorno de Inversión",
					description: "Nuestras soluciones gamificadas entregan resultados medibles. Desde la reducción del tiempo de formación hasta la mejora de métricas de rendimiento, observa retornos tangibles en tu inversión en experiencias de aprendizaje atractivas y efectivas."
				}
			}
		}
	};

	const texts = translations[locale];

	onMount(() => start());
	onDestroy(() => stop());
</script>

<Container className="hidden xl:flex flex-col pt-24 xl:pt-28" bgColor="bg-primary-panther">
	<div class="w-full flex flex-col z-10 gap-6">
		<header class="w-full flex flex-col">
			<BracketedContent className="mx-auto" text={texts.whyNumen} />
			<h2
				class="text-2xl leading-tight 2xl:text-5xl 2xl:leading-tight font-normal text-center mt-3 text-primary-beige">
				{texts.title.text1} <span class="text-primary-coralRed">{texts.title.highlight}</span>
				{texts.title.text2}
			</h2>
		</header>
		<div class="flex gap-6">
			<LoadingButton
				on:click={() => handleButtonClick(0)}
				iconPath="/icons/engagement.svg"
				isAnimating={activeIndex === 0} />
			<LoadingButton
				on:click={() => handleButtonClick(1)}
				iconPath="/icons/retention.svg"
				isAnimating={activeIndex === 1} />
			<LoadingButton
				on:click={() => handleButtonClick(2)}
				iconPath="/icons/roi.svg"
				isAnimating={activeIndex === 2} />
		</div>
		<aside
			class="bg-black rounded-xl shadow-[0_0_1.25rem_0_#F3505980] z-10"
			data-aos="fade-center"
			data-aos-delay="600">
			<div class="flex">
				<CardWithVRMAndCTA
					title={texts.cards.engagement.title}
					logoFileName="engagement.svg"
					logoName="Engagement"
					buttonHref={`/${locale}/why-numen/engagement`}
					viewerId="Logo-Khepri-0.1.3-29-10-2024"
					categoryLabel={texts.cards.engagement.categoryLabel}
					highlightMetricValue={texts.cards.engagement.highlightMetricValue}
					isAnimating={activeIndex === 0}
					highlightMetricDescription={texts.cards.engagement.highlightMetricDescription}
					description={texts.cards.engagement.description} />
				<CardWithVRMAndCTA
					title={texts.cards.retention.title}
					logoFileName="retention.svg"
					logoName="Retention"
					buttonHref={`/${locale}/why-numen/retention`}
					viewerId="Procyon-3-11-2024"
					categoryLabel={texts.cards.retention.categoryLabel}
					highlightMetricValue={texts.cards.retention.highlightMetricValue}
					isAnimating={activeIndex === 1}
					highlightMetricDescription={texts.cards.retention.highlightMetricDescription}
					description={texts.cards.retention.description} />
				<CardWithVRMAndCTA
					title={texts.cards.roi.title}
					logoFileName="roi.svg"
					logoName="ROI"
					buttonHref={`/${locale}/why-numen/roi`}
					viewerId="Ruins-Website-Model-29-10-2024"
					categoryLabel={texts.cards.roi.categoryLabel}
					highlightMetricValue={texts.cards.roi.highlightMetricValue}
					isAnimating={activeIndex === 2}
					highlightMetricDescription={texts.cards.roi.highlightMetricDescription}
					description={texts.cards.roi.description} />
			</div>
		</aside>
	</div>
</Container>
