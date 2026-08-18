<script lang="ts">
	import Viewer3D from "@components/Viewer3D.svelte";

	export let title: string;
	export let viewerId: string;
	export let logoName: string;
	export let buttonHref: string;
	export let isAnimating: boolean;
	export let description: string;
	export let logoFileName: string;
	export let categoryLabel: string;
	export let highlightMetricValue: string | number;
	export let highlightMetricDescription: string;
</script>

<div class={`flex-col ${(isAnimating && "flex") || "hidden"} relative`}>
	<Viewer3D {viewerId} {isAnimating} />
	<div class="absolute top-5 right-5 flex items-center p-2 rounded-md backdrop-blur-sm border border-arena/20 bg-arena/10">
		<img src={`icons/${logoFileName}`} alt="logo_icon" class="w-4 h-4 mr-2" />
		<span class="text-sm text-arena">{logoName}</span>
	</div>
	<div class="flex flex-col py-6 bg-arena px-4 xl:px-10 rounded-b-xl text-center xl:text-left">
		<p class="font-light text-sm 2xl:text-base xl:font-normal text-ambar uppercase">
			{categoryLabel}
		</p>
		<div class="mt-2 2xl:mt-3">
			<h4 class="text-xl xl:text-3xl font-medium text-nocturno-base">
				{title}
			</h4>
			<p class="text-sm 2xl:text-lg font-normal mt-4 2xl:mt-6 text-nocturno-base/75">
				{description}
			</p>
			<div class="mt-6 xl:mt-3 flex flex-col items-center xl:items-start 2xl:mt-6">
				<div class="flex items-center">
					<hr class="px-[0.1rem] py-3 bg-ambar mr-2" />
					<h5 class="text-xl xl:text-2xl font-medium text-nocturno-base">
						{highlightMetricValue}
					</h5>
				</div>
				<p class="text-xs ml-3 mt-1 2xl:mt-2 xl:text-sm 2xl:text-base font-light text-nocturno-base/60">
					{highlightMetricDescription}
				</p>
			</div>
			<a href={buttonHref} title="Read More" class="mt-6 bg-interactivo text-arena hover:bg-interactivo-hover text-sm 2xl:text-base font-light rounded-control py-3 px-6 inline-block"> Read More </a>
		</div>
	</div>
</div>
