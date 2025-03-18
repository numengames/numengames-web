<script>
	import BracketedContent from "@components/BracketedContent.svelte";
	import PulseAnimatedBtn from "@components/PulseAnimatedBtn.svelte";

	export let textObj;
</script>

<div
	class="w-full flex flex-col items-center relative mt-16 after:content-[''] after:absolute after:w-full after:left-[-2.5rem] after:h-[90%] after:top-1/2 after:transform after:-translate-y-1/2">
	<div
		class="bg-[url('/icons/khepri.svg')] bg-repeat bg-[length:15%] absolute w-[calc(100%+4.5rem)] h-[90%] left-[-2.5rem] opacity-25">
	</div>
	<div class="flex flex-col justify-center items-center z-10 mb-14 max-w-[75%]">
		<BracketedContent
			className="text-primary-beige/75"
			text={textObj?.bracketedContent} />
		<h2
			class="text-5xl leading-tight 2xl:text-5xl 2xl:leading-tight font-normal text-left mt-3 mb-6 text-primary-beige pr-10">
			{textObj?.header?.titlePart1}
			<span class="text-primary-coralRed">{textObj?.header?.titlePart2}</span>
			{textObj?.header?.titlePart3}
		</h2>
		<h3
			class="w-[75%] text-base font-light text-primary-beige/75 text-center mb-6">
			{textObj?.header?.subtitle}
		</h3>
		<div class="flex text-primary-beige font-light gap-6">
			<PulseAnimatedBtn
				text={textObj?.ctaButtons?.primary?.text}
				className="form-toggle-button" />
		</div>
	</div>
</div>
