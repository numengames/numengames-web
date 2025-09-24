<script>
	import Container from "@components/Container.svelte";
	import FlowCarousel from "@components/FlowCarousel.svelte";
	import BracketedContent from "@components/BracketedContent.svelte";
</script>

<Container
	className="xl:flex hidden flex-col items-center justify-center pb-24"
	bgColor="bg-primary-panther">
	<div class="w-full">
		<div class="flex flex-col items-center justify-center gap-6">
			<h4
				class="text-primary-beige/60 text-base font-light text-center 2xl:text-xl">
				Financed by
			</h4>
			<a href="https://www.enisa.es/" target="_blank" rel="noopener noreferrer" class="cursor-pointer">
				<img
					width={120}
					src="/assets/enisa-logo.png"
					alt="Enisa Logo"
					class="object-contain mx-7 2xl:mx-9" />
			</a>
		</div>
	</div>
</Container>
