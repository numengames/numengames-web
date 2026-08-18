<script lang="ts">
	/**
	 * Layout wrapper. Historically it only read `className`, while half the call
	 * sites passed `class` — Svelte dropped those silently, so those classes
	 * never reached the DOM. Both are accepted now, and the dead `class`
	 * attributes were removed from the call sites in the same change (their
	 * strings are listed in MIS-091): turning twenty layouts on at once is a
	 * redesign, not a fix.
	 */
	export let className = "";
	export let bgColor = "";

	let classProp = "";
	export { classProp as class };

	$: classes = [className, classProp].filter(Boolean).join(" ");
</script>

<section class={`w-full ${bgColor || "transparent"}`}>
	<div class={`mx-auto px-10 ${classes}`}>
		<slot />
	</div>
</section>
