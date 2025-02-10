<script>
	export let image;
	export let description;
	export let className = "";
	export let isAnimating = false;
</script>

<div
	class={`${isAnimating ? "w-full h-full" : "w-0 h-0 mt-0"} ${className} relative rounded-xl bg-primary-panther/80 overflow-hidden`}
	style="transition: opacity 1s ease; opacity: {isAnimating ? 1 : 0};">
	<div
		class="before:content-[''] before:top-[-125px] before:absolute before:left-[-10%] before:w-[120%] before:h-[250px] before:rounded-[100%] before:bg-[radial-gradient(rgba(166,218,213,0.15)_0%,rgba(255,255,255,0.00)_70%)] after:content-[''] after:bottom-[-125px] after:absolute after:left-[-10%] after:w-[120%] after:h-[300px] after:rounded-[100%] after:bg-[radial-gradient(rgba(243,80,89,0.35)_0%,rgba(255,255,255,0.00)_70%)]">
		<p
			class="pt-6 px-6 xl:pt-10 xl:px-10 text-primary-beige/75 font-light 2xl:text-xl 3xl:text-2xl">
			{description}
		</p>
		<img class="mx-auto mt-12 opacity-80" src={image} alt="card_img" />
	</div>
</div>
