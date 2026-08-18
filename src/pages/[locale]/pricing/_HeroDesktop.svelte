<script lang="ts">
	import type { ContentData } from "@app-types/content";
	export let textObj: ContentData;
</script>

<!-- HERO wrapper -->
<div class="w-full flex flex-col items-center mt-20 mb-12">
	<!-- Main content -->
	<div class="flex flex-col items-center text-center max-w-[650px] px-6 space-y-4">
		<!-- [ PRICING ] — versión local corregida -->
		<p class="tracking-[0.25em] text-xs">
			<span class="text-ambar">[</span>
			<span class="text-arena mx-1">
				{textObj?.bracketedContent}
			</span>
			<span class="text-ambar">]</span>
		</p>

		<!-- Título con salto de línea natural -->
		<h2
			class="font-light text-arena leading-tight
      text-4xl sm:text-5xl md:text-[56px] md:leading-[1.10]">
			{textObj?.header?.titlePart1}
			<span class="text-ambar">
				{textObj?.header?.titlePart2}
			</span>
			<br />
			{textObj?.header?.titlePart3}
		</h2>
	</div>
</div>
