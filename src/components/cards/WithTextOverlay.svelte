<script lang="ts">
	export let image: string;
	export let description: string;
	export let className: string = "";
	export let isAnimating: boolean = false;
</script>

<div class={`${isAnimating ? "w-full h-full" : "w-0 h-0"} ${className} relative rounded-xl bg-nocturno-base/80 overflow-hidden`} style="transition: opacity 1s ease; opacity: {isAnimating ? 1 : 0};">
	<div class="before:content-[''] before:top-[-125px] before:absolute before:left-[-10%] before:w-[120%] before:h-[250px] before:rounded-[100%] before:bg-[radial-gradient(rgba(239,165,23,0.10)_0%,rgba(249,235,220,0.00)_70%)] after:content-[''] after:bottom-[-125px] after:absolute after:left-[-10%] after:w-[120%] after:h-[300px] after:rounded-[100%] after:bg-[radial-gradient(rgba(239,165,23,0.28)_0%,rgba(249,235,220,0.00)_70%)]">
		<p class="pt-6 px-6 xl:pt-10 xl:px-10 text-arena/75 font-light text-base md:text-lg 2xl:text-xl 3xl:text-2xl">
			{description}
		</p>
		<img class="mx-auto mt-8 md:mt-12 opacity-80 w-full h-44 xl:h-52 2xl:h-60 object-contain" src={image} alt="card_img" />
	</div>
</div>
