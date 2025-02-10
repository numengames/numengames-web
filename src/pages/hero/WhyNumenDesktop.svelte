<script>
	import { onMount, onDestroy } from "svelte";

	import { setupRotation } from "@scripts/rotation.js";
	import Container from "@components/Container.svelte";
	import FeaturePoint from "@components/FeaturePoint.svelte";
	import PulseAnimatedBtn from "@components/PulseAnimatedBtn.svelte";
	import BracketedContent from "@components/BracketedContent.svelte";
	import CardWithTextOverlay from "@components/cards/WithTextOverlay.svelte";

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
	className="xl:flex hidden items-center justify-center"
	bgColor="bg-primary-panther">
	<div class="py-[6.2rem] flex justify-between text-primary-beige">
		<div class="flex justify-between items-stretch min-h-[300px]">
			<div class="flex w-[46.5%] h-full">
				<CardWithTextOverlay
					image="/assets/Mushrooms.png"
					description="Hosting and organizing professional events often comes with hidden costs that escalate unexpectedly. Expenses like travel and venue rentals can make traditional event formats increasingly impractical for many organizations. Shifting to immersive virtual experiences not only curbs these costs but also delivers impactful, unforgettable events."
					isAnimating={activeIndex === 0} />
				<CardWithTextOverlay
					image="/assets/spring-1.png"
					description="Remote teams frequently face challenges in preserving a cohesive company culture through video meetings. Establishing authentic connections and keeping team members engaged can feel daunting when interactions lack a personal touch and fluidity. Yet, with the right set of tools, remote teams can develop deeper bonds and a sense of unity through immersive, interactive environments."
					isAnimating={activeIndex === 1} />
				<CardWithTextOverlay
					image="/assets/icosahedron-1.png"
					description="Planning team-building events or conferences often demands extensive coordination, from aligning schedules to securing venues and organizing activities. This often pulls critical resources away from essential business operations. By transitioning to virtual formats, organizations gain the flexibility to adapt events to their needs while maintaining scalability and meaningful engagement."
					isAnimating={activeIndex === 2} />
			</div>
			<section class="flex flex-col justify-between w-[48%] h-full">
				<div class="flex flex-col">
					<BracketedContent text="WHY_NUMEN" />
					<FeaturePoint
						on:click={() => handleButtonClick(0)}
						title="Event costs spiral quickly"
						isAnimating={activeIndex === 0}
						superscriptNumber="01" />
					<FeaturePoint
						on:click={() => handleButtonClick(1)}
						title="Culture fades over zoom"
						isAnimating={activeIndex === 1}
						superscriptNumber="02" />
					<FeaturePoint
						on:click={() => handleButtonClick(2)}
						title="Logistics drain your resources"
						isAnimating={activeIndex === 2}
						superscriptNumber="03" />
				</div>
				<div>
					<p
						class="text-base 2xl:text-xl font-[84] max-w-[12rem] 2xl:max-w-[13rem] 3xl:max-w-[15rem]">
						Start designing your 3D environment
					</p>
					<PulseAnimatedBtn
						className="mt-4 2xl:mt-6 2xl:text-lg text-primary-beige form-toggle-button"
						text="Ready to Talk" />
				</div>
			</section>
		</div>
	</div>
</Container>
