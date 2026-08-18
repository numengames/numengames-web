<script>
	import { onMount } from "svelte";

	import BracketedContent from "@components/BracketedContent.svelte";
	import FaqSection from "./_Faq.svelte";

	export let list = [];

	let activeSection = 0;

	// Ajusta este offset si cambias el layout (sticky top + padding)
	const TOP_OFFSET_PX = 120;

	function handleScroll() {
		const sections = document.querySelectorAll("[id^='section-']");
		if (!sections.length) return;
		let currentIndex = 0;

		sections.forEach((section, index) => {
			const rect = section.getBoundingClientRect();
			if (rect.top - TOP_OFFSET_PX <= 0) currentIndex = index;
		});

		activeSection = currentIndex;
	}

	function scrollToSection(index) {
		activeSection = index; //

		const section = document.getElementById(`section-${index}`);
		if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
	}

	onMount(() => {
		handleScroll();

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	});
</script>

<div class="mt-10 flex flex-col lg:flex-row">
	<div class="w-full flex flex-col lg:flex-row">
		<div class="flex-1">
			{#each list as section, index (section.title)}
				<div id={`section-${index}`} class="px-4 lg:px-0 scroll-mt-[120px]">
					<h4 class="text-xl lg:text-2xl text-arena">
						{section.title}
					</h4>

					<div class={`flex flex-col items-center lg:items-end mt-6 ${index !== list.length - 1 ? "mb-10" : ""}`}>
						<FaqSection list={section.list} />
					</div>
				</div>
			{/each}
		</div>

		<div class="hidden lg:block w-[25%] h-64 border border-arena/10 ml-6 sticky mt-14 top-24 rounded-lg p-6">
			<BracketedContent text="FAQs" />

			<div class="mt-4 flex flex-col gap-2">
				{#each list as section, index (section.title)}
					<button type="button" class={`block w-full text-left px-0 py-1 bg-transparent border-none m-0 cursor-pointer transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-ambar/40 ${activeSection === index ? "text-ambar" : "text-arena/15 hover:text-arena/60"}`} on:click={() => scrollToSection(index)}>
						{section.title}
					</button>
				{/each}
			</div>
		</div>
	</div>
</div>
