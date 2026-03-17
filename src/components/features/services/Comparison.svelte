<script lang="ts">
	import PulseAnimatedBtn from "@components/PulseAnimatedBtn.svelte";
	import BracketedContent from "@components/BracketedContent.svelte";

	export let textObj: Record<string, any>;
</script>

<div class="w-full flex flex-col relative px-4 md:px-8 lg:px-0">
	<div class="w-full flex flex-col items-start z-10">
		<BracketedContent
			className="text-primary-beige/75"
			text={textObj?.bracketedContent} />
		<div class="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
			<h2
				class="text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl font-normal mt-3 mb-4 md:mb-6 text-primary-beige md:pr-10">
				{textObj?.header?.titlePart1}
				<span class="text-primary-coralRed">{textObj?.header?.titlePart2}</span>
			</h2>
			<div>
				<PulseAnimatedBtn text={textObj?.ctaButtons?.primary?.text} />
			</div>
		</div>
	</div>
	<div class="w-full flex flex-col md:flex-row gap-4 md:gap-6 mt-6">
		{#each Object.entries(textObj?.list) as [key, texts]}
			<div
				class={`w-full rounded-xl py-6 md:py-8 lg:py-10 px-4 md:px-6 ${key === "before" ? "border border-white/5" : "border border-[#D9B86A40] border-opacity-25 shadow-[0_0_50px_0_rgba(217, 184, 106, 0.10)] bg-[#171717]"}`}>
				<p
					class={`mb-6 md:mb-8 text-lg md:text-xl ${key === "before" ? "text-primary-beige" : "text-primary-coralRed"}`}>
					{key.charAt(0).toUpperCase() + key.slice(1)}
				</p>
				{#each texts as text, index}
					<div
						class={`text-primary-beige/75 flex items-start md:items-center py-4 md:py-6 ${index !== texts.length - 1 ? "mb-3 md:mb-4" : ""} border rounded-lg ${key === "before" ? "border-white/5 bg-[linear-gradient(90deg,rgba(33,33,35,0.70)_24%,rgba(0,0,0,0.00)_100%)]" : "border-primary-coralRed/25"}`}>
						<div
							class={`flex justify-center items-center rounded-full ml-4 md:ml-5 w-5 h-5 md:w-6 md:h-6 mt-1 md:mt-0 ${key === "before" ? "bg-white/10" : "bg-primary-coralRed"}`}>
							{#if key === "before"}
								<img class="w-3 h-3 md:w-4 md:h-4" src="/icons/x.svg" alt="x" />
							{:else}
								<img class="w-3 h-3 md:w-4 md:h-4" src="/icons/check.svg" alt="check" />
							{/if}
						</div>
						<p class="ml-3 md:ml-4 font-light text-sm md:text-base pr-2">{text}</p>
					</div>
				{/each}
			</div>
		{/each}
	</div>
</div>

<style>
	.btnAnimated::before {
		top: 0;
		left: 0;
		border-radius: 5px;
		content: "";
		width: 100%;
		position: absolute;
		transition: 0.5s all ease;
		height: 100%;
		border: 1px solid rgba(243, 80, 88, 0.5);
		transform: scale(1);
		animation: pulse 6s infinite;
		animation-delay: 3s;
		opacity: 0.6;
	}

	.btnAnimated::after {
		top: 0;
		left: 0;
		border-radius: 5px;
		content: "";
		width: 100%;
		position: absolute;
		transition: 0.5s all ease;
		height: 100%;
		border: 1px solid rgba(243, 80, 88, 0.5);
		transform: scale(1);
		animation: pulse 6s infinite;
		opacity: 0.6;
	}

	@keyframes pulse {
		0% {
			transform: scale3d(1.05, 1.15, 1.05);
			opacity: 0.6;
		}
		100% {
			transform: scale3d(1.3, 1.45, 1.3);
			opacity: 0;
		}
	}
</style>
