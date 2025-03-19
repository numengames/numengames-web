<script>
	import PulseAnimatedBtn from "@components/PulseAnimatedBtn.svelte";
	import BracketedContent from "@components/BracketedContent.svelte";

	export let textObj;
</script>

<div class="w-full flex flex-col relative">
	<div class="w-full flex flex-col items-start z-10">
		<BracketedContent
			className="text-primary-beige/75"
			text={textObj?.bracketedContent} />
		<div class="w-full flex justify-between items-center">
			<h2
				class="text-4xl 2xl:text-5xl font-normal mt-3 mb-6 text-primary-beige pr-10">
				{textObj?.header?.titlePart1}
				<span class="text-primary-coralRed">{textObj?.header?.titlePart2}</span>
			</h2>
			<div>
				<PulseAnimatedBtn text={textObj?.ctaButtons?.primary?.text} />
			</div>
		</div>
	</div>
	<div class="w-full flex gap-6 mt-6">
		{#each Object.entries(textObj?.list) as [key, texts]}
			<div
				class={`w-full rounded-xl py-10 px-6 ${key === "before" ? "border border-white/5" : "border border-[#F3505940] border-opacity-25 shadow-[0_0_50px_0_rgba(243,80,89,0.10)] bg-[#171717]"}`}>
				<p
					class={`mb-8 ${key === "before" ? "text-primary-beige" : "text-primary-coralRed"}`}>
					{key.charAt(0).toUpperCase() + key.slice(1)}
				</p>
				{#each texts as text, index}
					<div
						class={`text-primary-beige/75 flex items-center py-6 ${index !== texts.length - 1 ? "mb-4" : ""} border rounded-lg ${key === "before" ? "border-white/5 bg-[linear-gradient(90deg,rgba(33,33,35,0.70)_24%,rgba(0,0,0,0.00)_100%)]" : "border-primary-coralRed/25"}`}>
						<div
							class={`flex justify-center items-center rounded-full ml-5 w-6 h-6 ${key === "before" ? "bg-white/10" : "bg-primary-coralRed"}`}>
							{#if key === "before"}
								<img class="w-4 h-4" src="/icons/x.svg" alt="x" />
							{:else}
								<img class="w-4 h-4" src="/icons/check.svg" alt="check" />
							{/if}
						</div>
						<p class="ml-4 font-light text-sm">{text}</p>
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
