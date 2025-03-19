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
			services: "SERVICES",
			title: {
				text1: "High",
				highlight: "adaptability experiences",
				text2: "to different organizational needs"
			},
			cards: {
				engage: {
					title: "Immersive 3D environments",
					categoryLabel: "ENGAGE",
					highlightMetricValue: "+60%",
					highlightMetricDescription: "Employee Engagement",
					description: "Create immersive 3D environments that support your organization's talent retention, values, and culture. Through gamified solutions, we make processes like onboarding engaging and impactful, helping foster a motivated, cohesive workforce."
				},
				training: {
					title: "Learning experiences, guided by experts.",
					categoryLabel: "TRAINING",
					highlightMetricValue: "26%",
					highlightMetricDescription: "Engagement boost",
					description: "Revolutionize your training programs with our interactive, gamified solutions. Learning becomes a dynamic experience that not only teaches but empowers. From building practical skills to fostering team collaboration, we create training journeys that accelerate growth."
				},
				experience: {
					title: "Fully customized gamified experiences",
					categoryLabel: "EXPERIENCE",
					highlightMetricValue: "26%",
					highlightMetricDescription: "Engagement boost",
					description: "Our custom gamified experiences are designed to match your organization's goals and spark real engagement. Whether boosting leadership skills or crafting a once-in-a-lifetime event, like a personalized proposal, we deliver memorable moments with lasting effects."
				}
			}
		},
		es: {
			services: "SERVICIOS",
			title: {
				text1: "Alta",
				highlight: "adaptabilidad de experiencias",
				text2: "para diferentes necesidades organizativas"
			},
			cards: {
				engage: {
					title: "Entornos 3D inmersivos",
					categoryLabel: "ENGAGE",
					highlightMetricValue: "+60%",
					highlightMetricDescription: "Compromiso empleados",
					description: "Creamos entornos 3D inmersivos que apoyan la retención de talento, valores y cultura de tu organización. A través de soluciones gamificadas, hacemos que procesos como la incorporación sean atractivos e impactantes, ayudando a fomentar una plantilla motivada y cohesionada."
				},
				training: {
					title: "Experiencias de aprendizaje, guiadas por expertos.",
					categoryLabel: "TRAINING",
					highlightMetricValue: "26%",
					highlightMetricDescription: "Aumento compromiso",
					description: "Revoluciona tus programas de formación con nuestras soluciones interactivas y gamificadas. El aprendizaje se convierte en una experiencia dinámica que no solo enseña sino que empodera. Desde desarrollar habilidades prácticas hasta fomentar la colaboración en equipo, creamos viajes de formación que aceleran el crecimiento."
				},
				experience: {
					title: "Experiencias gamificadas totalmente personalizadas",
					categoryLabel: "EXPERIENCE",
					highlightMetricValue: "26%",
					highlightMetricDescription: "Aumento compromiso",
					description: "Nuestras experiencias gamificadas personalizadas están diseñadas para alcanzar los objetivos de tu organización y generar un compromiso real. Ya sea potenciando habilidades de liderazgo o creando un evento único en la vida, como una propuesta personalizada, ofrecemos momentos memorables con efectos duraderos."
				}
			}
		}
	};

	const texts = translations[locale];

	onMount(() => start());
	onDestroy(() => stop());
</script>

<Container
	className="xl:flex hidden flex-col items-center justify-center pt-24 xl:pt-28"
	bgColor="bg-primary-panther">
	<div
		class="h-screen flex justify-between items-center relative before:bg-[url('/icons/khepri.svg')] before:bg-repeat before:bg-[length:15%] before:content-[''] before:absolute before:w-[calc(100%+4.5rem)] before:h-[90vh] before:left-[-2.5rem] after:content-[''] after:absolute after:w-full after:left-[-2.5rem] after:h-[90%] after:top-1/2 after:transform after:-translate-y-1/2">
		<section class="max-w-[56%] space-y-6 z-10">
			<header>
				<BracketedContent text={texts.services} />
				<h2
					class="text-4xl leading-tight 2xl:text-5xl 2xl:leading-tight font-normal text-left mt-3 text-primary-beige pr-10">
					{texts.title.text1} <span class="text-primary-coralRed">{texts.title.highlight}</span>
					{texts.title.text2}
				</h2>
			</header>
			<div class="flex gap-6">
				<LoadingButton
					on:click={() => handleButtonClick(0)}
					iconPath="/icons/strategy.svg"
					buttonText="Engage"
					isAnimating={activeIndex === 0} />
				<LoadingButton
					on:click={() => handleButtonClick(1)}
					iconPath="/icons/sword.svg"
					buttonText="Training"
					isAnimating={activeIndex === 1} />
				<LoadingButton
					on:click={() => handleButtonClick(2)}
					iconPath="/icons/game-controller.svg"
					buttonText="Experience"
					isAnimating={activeIndex === 2} />
			</div>
		</section>
		<aside
			class="max-w-[37%] bg-black rounded-xl shadow-[0_0_1.25rem_0_#F3505980] z-10"
			data-aos="fade-center"
			data-aos-delay="600">
			<CardWithVRMAndCTA
				title={texts.cards.engage.title}
				logoFileName="strategy.svg"
				logoName="Engage"
				buttonHref={`/${locale}/services/engage`}
				viewerId="Logo-Khepri-0.1.3-29-10-2024"
				categoryLabel={texts.cards.engage.categoryLabel}
				highlightMetricValue={texts.cards.engage.highlightMetricValue}
				isAnimating={activeIndex === 0}
				highlightMetricDescription={texts.cards.engage.highlightMetricDescription}
				description={texts.cards.engage.description} />
			<CardWithVRMAndCTA
				title={texts.cards.training.title}
				logoFileName="sword.svg"
				logoName="Training"
				buttonHref={`/${locale}/services/training`}
				viewerId="Procyon-3-11-2024"
				categoryLabel={texts.cards.training.categoryLabel}
				highlightMetricValue={texts.cards.training.highlightMetricValue}
				isAnimating={activeIndex === 1}
				highlightMetricDescription={texts.cards.training.highlightMetricDescription}
				description={texts.cards.training.description} />
			<CardWithVRMAndCTA
				title={texts.cards.experience.title}
				logoFileName="game-controller.svg"
				logoName="Experience"
				buttonHref={`/${locale}/services/experience`}
				viewerId="Ruins-Website-Model-29-10-2024"
				categoryLabel={texts.cards.experience.categoryLabel}
				highlightMetricValue={texts.cards.experience.highlightMetricValue}
				isAnimating={activeIndex === 2}
				highlightMetricDescription={texts.cards.experience.highlightMetricDescription}
				description={texts.cards.experience.description} />
		</aside>
		<div
			class="w-[calc(100vw-40px)] left-[-40px] absolute inset-0 flex items-center justify-center mx-auto my-auto h-[35%] bg-gradient-to-b from-primary-panther/80 via-primary-panther to-primary-panther/80">
		</div>
	</div>
</Container>
