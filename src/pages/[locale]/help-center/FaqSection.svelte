<script>
	import { onMount } from "svelte";

	import BracketedContent from "@components/BracketedContent.svelte";

	import FaqSection from "./Faq.svelte";

	export let list = [];
	let activeSection = 0;

	function handleScroll() {
		const sections = document.querySelectorAll("[id^='section-']");
		let currentIndex = 0;

		sections.forEach((section, index) => {
			const rect = section.getBoundingClientRect();
			if (rect.top <= window.innerHeight / 2) {
				currentIndex = index;
			}
		});

		activeSection = currentIndex;
	}

	function scrollToSection(index) {
		const section = document.getElementById(`section-${index}`);
		if (section) {
			section.scrollIntoView({ behavior: "smooth" });
		}
	}

	onMount(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	});
</script>

<div class="mt-10 flex">
	<div class="w-full flex">
		<div class="flex-1">
			{#each Object.entries(list) as [key, section], index (key)}
				<div id={`section-${index}`}>
					<h4 class="text-2xl text-primary-beige">
						{section.title}
					</h4>
					<div
						class={`flex flex-col items-end mt-6 ${index !== Object.entries(list).length - 1 ? "mb-10" : ""}`}>
						<FaqSection list={section.list} />
					</div>
				</div>
			{/each}
		</div>
		<div
			class="w-[25%] h-64 border border-white/10 ml-6 sticky mt-14 top-24 rounded-lg p-6">
			<BracketedContent text="FAQs" />
			{#each list as section, index}
				<button
					class={`transition-colors duration-300 cursor-pointer bg-transparent border-none p-0 m-0 text-left ${activeSection === index ? "text-primary-coralRed" : "text-primary-beige/15"}`}
					on:click={() => scrollToSection(index)}>
					{section.title}
				</button>
			{/each}
		</div>
	</div>
</div>
