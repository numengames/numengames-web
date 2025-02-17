<script>
	import { onMount, onDestroy } from "svelte";

	import Container from "@components/Container.svelte";
	import { setupRotation } from "@scripts/rotation.js";
	import LoadingButton from "@components/LoadingButton.svelte";
	import BracketedContent from "@components/BracketedContent.svelte";
	import CardWithVRMAndCTA from "@components/cards/WithVRMAndCTA.svelte";

	let activeIndex = 0;
	const contentCount = 3;
	let timeUntilNextAnimation = 20000;

	const { start, stop, handleButtonClick } = setupRotation(
		contentCount,
		timeUntilNextAnimation,
		(newIndex) => (activeIndex = newIndex),
	);

	onMount(() => start());

	onDestroy(() => stop());
</script>

<Container
	className="xl:hidden flex flex-col px-4 pt-24 xl:pt-28"
	bgColor="bg-primary-panther">
	<div class="w-full flex flex-col z-10 gap-6">
		<header class="w-full flex flex-col">
			<BracketedContent className="mx-auto" text="SERVICES" />
			<h2
				class="text-2xl leading-tight 2xl:text-5xl 2xl:leading-tight font-normal text-center mt-3 text-primary-beige">
				High <span class="text-primary-coralRed">adaptability experiences</span>
				to different organizational needs
			</h2>
		</header>
		<div class="flex gap-6">
			<LoadingButton
				on:click={() => handleButtonClick(0)}
				iconPath="/icons/strategy.svg"
				isAnimating={activeIndex === 0} />
			<LoadingButton
				on:click={() => handleButtonClick(1)}
				iconPath="/icons/sword.svg"
				isAnimating={activeIndex === 1} />
			<LoadingButton
				on:click={() => handleButtonClick(2)}
				iconPath="/icons/game-controller.svg"
				isAnimating={activeIndex === 2} />
		</div>
		<aside
			class="bg-black rounded-xl shadow-[0_0_1.25rem_0_#F3505980] z-10"
			data-aos="fade-center"
			data-aos-delay="600">
			<CardWithVRMAndCTA
				title="Immersive 3D environments"
				logoFileName="strategy.svg"
				logoName="Engage"
				buttonHref="/services/engage"
				viewerId="Logo-Khepri-0.1.3-29-10-2024"
				categoryLabel="ENGAGE"
				highlightMetricValue="+60%"
				isAnimating={activeIndex === 0}
				highlightMetricDescription="Employee Engagement"
				description="Create immersive 3D environments that support your organization's talent retention, values, and culture. Through gamified solutions, we make processes like onboarding engaging and impactful, helping foster a motivated, cohesive workforce." />
			<CardWithVRMAndCTA
				title="Learning experiences, guided by experts."
				logoFileName="sword.svg"
				logoName="Training"
				buttonHref="/services/training"
				viewerId="Procyon-3-11-2024"
				categoryLabel="TRAINING"
				highlightMetricValue="26%"
				isAnimating={activeIndex === 1}
				highlightMetricDescription="Engagement boost"
				description="Revolutionize your training programs with our interactive, gamified solutions. Learning becomes a dynamic experience that not only teaches but empowers. From building practical skills to fostering team collaboration, we create training journeys that accelerate growth." />
			<CardWithVRMAndCTA
				title="Fully customized gamified experiences"
				logoFileName="game-controller.svg"
				logoName="Experience"
				buttonHref="/services/experience"
				viewerId="Ruins-Website-Model-29-10-2024"
				categoryLabel="EXPERIENCE"
				highlightMetricValue="26%"
				isAnimating={activeIndex === 2}
				highlightMetricDescription="Engagement boost"
				description="Our custom gamified experiences are designed to match your organization’s goals and spark real engagement. Whether boosting leadership skills or crafting a once-in-a-lifetime event, like a personalized proposal, we deliver memorable moments with lasting effects." />
		</aside>
	</div>
</Container>
