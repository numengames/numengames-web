<script>
	import { onMount } from "svelte";

	import Container from "@components/Container.svelte";
	import { setupRotation } from "@scripts/rotation.js";
	import BracketedContent from "@components/BracketedContent.svelte";

	export let steps = [
		{
			number: "01",
			title: "Act",
			description:
				"Share your requirements and employee profiles to enable us to craft a solution tailored to your team’s unique needs.",
		},
		{
			number: "02",
			title: "Infer",
			description:
				"Our approach involves an in-depth assessment of your needs, ensuring the simulation solutions we create are perfectly aligned with your team's expertise.",
		},
		{
			number: "03",
			title: "Serv",
			description:
				"Get customized solutions designed to achieve your goals. Then, choose from our wide variety of gamified options to boost your employee training program.",
		},
	];

	onMount(() => {
		const handleScroll = () => {
			const elements = document.querySelectorAll(".work-process-step");
			elements.forEach((element, index) => {
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
	className="xl:hidden flex flex-col items-center justify-center pt-12 pb-60"
	bgColor="bg-primary-panther">
	<div class="flex flex-col items-center relative mt-16">
		<div
			class="xl:h-[600px] xl:sticky top-10 xl:top-[100px] flex flex-col items-center z-20 text-primary-beige">
			<BracketedContent text="WORK_PROCESS" />
			<h2
				class="text-3xl font-light xl:text-5xl 3xl:text-6xl xl:font-medium text-center mt-3">
				How we collaborate with you.
			</h2>
		</div>

		{#each steps as step, index}
			<div
				class="xl:max-w-[450px] 2xl:max-w-[600px] work-process-step xl:sticky opacity-0 transition-opacity duration-700 p-6 bg-gradient-to-tr from-[#2C2C2C] via-[#3B2C36] to-[#1F2C2C] rounded-lg shadow-lg xl:mx-12"
				style={`margin-top:50px; transform: rotate(${index % 2 === 0 ? "-3deg" : "3deg"}); @media (min-width: 1280px) { top: ${280 + index * 120}px; z-index: ${3 + index}; margin-bottom: ${[144, 0, -144][index] || 0}px; box-shadow: 1px 1px 30px #18181b; }`}>
				<p
					class="px-1 xl:px-5 mt-2 text-2xl font-light text-primary-coralRed font-IBMPlexMono">
					{step.number}
				</p>
				<div class="p-1 xl:p-6 mt-2">
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
								class="text-base px-6 py-3 rounded-md border border-solid border-[#F350594D] backdrop-blur-[25px] shadow-[0_0_20px_0_#F35059] mt-10 text-primary-beige form-toggle-button">
								Let's talk
							</button>
							<span
								class="absolute top-10 right-0 text-xs font-bold text-white bg-red-500 rounded-md px-2 py-1 transform translate-x-1/2 -translate-y-1/2">
								FREE
							</span>
						</div>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</Container>
