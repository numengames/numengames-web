<script lang="ts">
	export let className = "";
	export let bgColor = "";
</script>

<section class={`w-full ${bgColor || "transparent"}`}>
	<div class={`mx-auto px-10 ${className}`}>
		<slot />
	</div>
</section>
