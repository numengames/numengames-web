<script>
	import Container from "@components/Container.svelte";
	import BracketedContent from "@components/BracketedContent.svelte";

	export let steps = [
		{
			number: "01",
			title: "Act",
			description:
				"Share your requirements and employee profiles to enable us to craft a solution tailored to your team's unique needs.",
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
</script>

<Container
	className="xl:hidden flex flex-col items-center justify-center pt-8 pb-20"
	bgColor="bg-primary-panther">
	<div class="flex flex-col items-center relative mt-8">
		<div class="flex flex-col items-center z-20 text-primary-beige">
			<BracketedContent text="WORK_PROCESS" />
			<h2
				class="text-3xl font-light xl:text-5xl 3xl:text-6xl xl:font-medium text-center mt-3">
				How we collaborate with you.
			</h2>
		</div>

		<div class="flex flex-col gap-8 mt-12 w-full" style="visibility: visible !important; opacity: 1 !important;">
			{#each steps as step, index}
				<div
					class="w-full max-w-[450px] mx-auto p-6 rounded-lg border border-[rgba(217,184,106,0.18)] bg-[linear-gradient(135deg,rgba(48,40,24,0.94),rgba(28,28,28,0.96),rgba(64,52,24,0.92))]"
					style={`transform: rotate(${index % 2 === 0 ? "-3deg" : "3deg"}); box-shadow: 0 0 32px rgba(217,184,106,0.14), 0 18px 48px rgba(0,0,0,0.36); visibility: visible !important; opacity: 1 !important;`}>
					<p
						class="px-1 mt-2 text-2xl font-light text-[#D9B86A] font-IBMPlexMono">
						{step.number}
					</p>
					<div class="p-1 mt-2">
						<h3 class="text-primary-beige text-4xl font-medium text-left mb-3">
							{step.title}
						</h3>
						<p
							class="text-primary-beige/70 font-thin mt-6 text-base">
							{step.description}
						</p>
						{#if index === steps.length - 1}
							<div class="relative inline-block">
								<button
									class="text-base px-6 py-3 rounded-md border border-solid border-[rgba(217,184,106,0.35)] backdrop-blur-[25px] shadow-[0_0_20px_0_rgba(217,184,106,0.28)] mt-10 text-primary-beige form-toggle-button bg-[rgba(217,184,106,0.06)] hover:bg-[rgba(217,184,106,0.12)] transition-colors">
									Let's talk
								</button>
								<span
									class="absolute top-10 right-0 text-xs font-bold text-[#171717] bg-[#D9B86A] rounded-md px-2 py-1 transform translate-x-1/2 -translate-y-1/2 shadow-[0_0_14px_rgba(217,184,106,0.25)]">
									FREE
								</span>
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
