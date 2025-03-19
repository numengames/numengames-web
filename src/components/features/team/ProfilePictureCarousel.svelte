<script>
	import { onMount, onDestroy } from "svelte";

	import ProfileCard from "@components/cards/Profile.svelte";

	export let profileList;

	let carousel;
	let currentIndex = 0;

	function updateCarousel() {
		const maxOffset = (profileList.length - 1) * 449;
		const offset = Math.min(currentIndex * 449, maxOffset);
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
	});

	onDestroy(() => {});
</script>

<div class="relative w-full h-auto text-white">
	<div
		class="flex transition-transform duration-500 ease-in-out overflow-hidden"
		bind:this={carousel}
		style="width: calc(449px * {profileList.length});">
		{#each profileList as profile, index}
			<ProfileCard
				{...profile}
				className={`w-[449px] h-[529px] transition-all duration-500 ease-in-out ${
					index === currentIndex
						? "scale-95 border-2 border-primary-darkRed shadow-[0px_0px_20px_0px_#F35059]"
						: "scale-90 opacity-75"
				}`}
				on:click={() => goToSlide(index)} />
		{/each}
	</div>

	<button
		class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-primary-coralRed bg-opacity-50 p-3 rounded-full text-white hover:bg-opacity-75"
		on:click={prevSlide}>
		<img
			src="/icons/arrow-down.svg"
			class="w-6 h-6 transform rotate-90"
			alt="arrow" />
	</button>
	<button
		class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-primary-coralRed bg-opacity-50 p-3 rounded-full text-white hover:bg-opacity-75"
		on:click={nextSlide}>
		<img
			src="/icons/arrow-down.svg"
			class="w-6 h-6 transform -rotate-90"
			alt="arrow" />
	</button>
</div>
