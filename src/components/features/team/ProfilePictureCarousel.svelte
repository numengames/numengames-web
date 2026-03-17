<script lang="ts">
	import { onMount, onDestroy } from "svelte";
	import ProfileCard from "@components/cards/Profile.svelte";
	import type { TeamProfile } from "@types/components";

	export let profileList: TeamProfile[];

	let carousel;
	let currentIndex = 0;
	let cardWidth = 449; // Default desktop width

	function updateCarousel() {
		if (window.innerWidth < 768) {
			cardWidth = window.innerWidth * 0.9; // 90% of screen width on mobile
		} else {
			cardWidth = 449; // Desktop width
		}
		const maxOffset = (profileList.length - 1) * cardWidth;
		const offset = Math.min(currentIndex * cardWidth, maxOffset);
		carousel.style.transform = `translateX(-${offset}px)`;
	}

	function prevSlide() {
		currentIndex = currentIndex > 0 ? currentIndex - 1 : profileList.length - 1;
		updateCarousel();
	}

	function nextSlide() {
		currentIndex = currentIndex < profileList.length - 1 ? currentIndex + 1 : 0;
		updateCarousel();
	}

	function goToSlide(index) {
		currentIndex = index;
		updateCarousel();
	}

	onMount(() => {
		updateCarousel();
		window.addEventListener('resize', updateCarousel);
	});

	onDestroy(() => {
		window.removeEventListener('resize', updateCarousel);
	});
</script>

<div class="relative w-full h-auto text-white">
	<div
		class="flex transition-transform duration-500 ease-in-out overflow-hidden"
		bind:this={carousel}
		style="width: calc({cardWidth}px * {profileList.length});">
		{#each profileList as profile, index}
			<ProfileCard
				{...profile}
				className={`w-[90vw] md:w-[449px] h-[400px] md:h-[529px] transition-all duration-500 ease-in-out ${
					index === currentIndex
						? "scale-95 border-2 border-primary-darkRed shadow-[0px_0px_20px_0px_#D9B86A]"
						: "scale-90 opacity-75"
				}`}
				on:click={() => goToSlide(index)} />
		{/each}
	</div>

	<button
		class="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-primary-coralRed bg-opacity-50 p-2 md:p-3 rounded-full text-white hover:bg-opacity-75"
		on:click={prevSlide}>
		<img
			src="/icons/arrow-down.svg"
			class="w-4 h-4 md:w-6 md:h-6 transform rotate-90"
			alt="arrow" />
	</button>
	<button
		class="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-primary-coralRed bg-opacity-50 p-2 md:p-3 rounded-full text-white hover:bg-opacity-75"
		on:click={nextSlide}>
		<img
			src="/icons/arrow-down.svg"
			class="w-4 h-4 md:w-6 md:h-6 transform -rotate-90"
			alt="arrow" />
	</button>
</div>
