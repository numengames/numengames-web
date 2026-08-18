<script lang="ts">
	import { DEFAULT_LOCALE, type SupportedLocale } from "../../../i18n";
	/**
	 * TODO(MIS-091): this component receives `locale` and does not use it — its
	 * copy is hardcoded. The Spanish route renders the English strings. Wiring
	 * it to `src/i18n` is a content task, tracked in TODO.md.
	 */
	export let locale: SupportedLocale = DEFAULT_LOCALE;
	import Container from "@components/Container.svelte";
	import FlowCarousel from "@components/FlowCarousel.svelte";
	import BracketedContent from "@components/BracketedContent.svelte";
	import SpotlightCarousel from "@components/SpotlightCarousel.svelte";
	import type { Testimonial } from "@app-types/components";

	export let testimonialList: Testimonial[] = [
		{
			quote: "Numen’s open-source mindset and technical excellence help us bring our vision for the future of 3D internet to life.",
			author: "R3S3T Studio",
			position: "CEO r3s3t.xyz",
			hueRotate: "hue-rotate-180",
			image: "/assets/r3s3t.png",
			animationDelay: "",
		},
		{
			quote: "I think these are the timelines we need to be looking at - the one-hundred- or two-hundrd-year horizons. Because most of the really bad stuff that's happening right now is the result of very short-term thinking.",
			author: "Jane McGonigal",
			position: "Game developer",
			hueRotate: "hue-rotate-90",
			image: "/assets/jane-mcgonigal.png",
			animationDelay: "[animation-delay:-12s]",
		},
		{
			quote: "Human-focused design is a journey into the soul of the user. You're not just solving problems-you're touching lives, shaping futures, creating magic.",
			author: "Yu-kai Chou",
			position: "Gamification Expert",
			hueRotate: "hue-rotate-[25deg]",
			image: "/assets/yu-kai-chou.png",
			animationDelay: "[animation-delay:-24s]",
		},
		{
			quote: "My favorite part of this training is the immersive learning ability for students is really incredible and the instructor was great!",
			author: "",
			position: "Program Specialist at Hayward Unified School District Office",
			hueRotate: "hue-rotate-[45deg]",
			image: "",
			animationDelay: "[animation-delay:-36s]",
		},
	];
</script>

<Container className="xl:flex hidden flex-col items-center justify-center py-24" bgColor="bg-nocturno-base">
	<div class="w-full min-h-[675px]">
		<BracketedContent text="TESTIMONIALS" />
		<div class="flex justify-between items-start mt-4">
			<h3 class="text-arena text-4xl 2xl:text-5xl 3xl:text-6xl font-medium">Why People Love Us</h3>
			<p class="text-arena/70 max-w-[26rem] 2xl:max-w-[32rem] 3xl:max-w-[38rem] font-extralight text-base 2xl:text-xl 3xl:text-2xl text-right">Our partners & clients' stories showcase our passion for delivering great results. Take a look at how we've helped clients, partners, and community to succeed.</p>
		</div>
		<div class="flex justify-center space-x-24 mt-8 h-full overflow-x-auto p-5 relative">
			<SpotlightCarousel list={testimonialList} />
		</div>
		<div class="flex flex-col align-middle justify-center mt-16">
			<h4 class="text-arena/60 text-base font-light text-center 2xl:text-xl">Working with ecosystem leaders</h4>
			<FlowCarousel
				list={[
					{ name: "adigital-logo", link: "https://adigital.org/" },
					{
						name: "art-unchained-logo",
						link: "https://art-unchained.io",
					},
					{
						name: "active-inference-logo",
						link: "https://activeinference.institute",
					},
					{ name: "ath21-logo", link: "https://ath21.com" },
					{ name: "oncyber-logo", link: "https://oncyber.io" },
					{ name: "hyperfy-logo", link: "https://hyperfy.io" },
					{ name: "reset-logo", link: "https://www.r3s3t.xyz" },
					{ name: "spacedata-logo", link: "https://en.spacedata.jp" },
				]} />
		</div>
	</div>
</Container>
