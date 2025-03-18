<script>
	export let className = "";
	export let bgColor = "";
	export let px = "px-10";
</script>

<section class={`w-full ${bgColor || "transparent"} mx-auto ${px} max-w-[1920px] ${className}`}>
	<slot />
</section>
