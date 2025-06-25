<script>
	import Container from "@components/Container.svelte";
	import FlowCarousel from "@components/FlowCarousel.svelte";
	import BracketedContent from "@components/BracketedContent.svelte";
	import SpotlightCarousel from "@components/SpotlightCarousel.svelte";

	export let testimonialList = [
		{
			quote:
				"On A Pathway To An Open Metaverse. We are going to make a run at changing the arc of history. It is a Return of the Jedi vs the Death Star style mission. They have the money and the power.",
			author: "Punk 6529",
			position: "Open Metaverse Defender",
			hueRotate: "hue-rotate-180",
			animationDelay: "",
		},
		{
			quote:
				"I think these are the timelines we need to be looking at - the one-hundred- or two-hundrd-year horizons. Because most of the really bad stuff that's happening right now is the result of very short-term thinking.",
			author: "Jane McGonigal",
			position: "Game developer",
			hueRotate: "hue-rotate-90",
			animationDelay: "[animation-delay:-12s]",
		},
		{
			quote:
				"Human-focused design is a journey into the soul of the user. You're not just solving problems-you're touching lives, shaping futures, creating magic.",
			author: "Yu-kai Chou",
			position: "Gamification Expert",
			hueRotate: "hue-rotate-[25deg]",
			animationDelay: "[animation-delay:-24s]",
		},
		{
			quote:
				"My favorite part of this training is the immersive learning ability for students is really incredible and the instructor was great!",
			author: "",
			position: "Program Specialist at Hayward Unified School District Office",
			hueRotate: "hue-rotate-[45deg]",
			animationDelay: "[animation-delay:-36s]",
		},
	];
</script>

<Container
	className="xl:flex hidden flex-col items-center justify-center py-24"
	bgColor="bg-primary-panther">
	<div class="w-full min-h-[675px]">
		<BracketedContent text="TESTIMONIALS" />
		<div class="flex justify-between items-start mt-4">
			<h3
				class="text-primary-beige text-4xl 2xl:text-5xl 3xl:text-6xl font-medium">
				Why People Love Us
			</h3>
			<p
				class="text-primary-beige/70 max-w-[26rem] 2xl:max-w-[32rem] 3xl:max-w-[38rem] font-[84] text-base 2xl:text-xl 3xl:text-2xl text-right">
				Our clients' stories showcase our passion for delivering great results.
				Take a look at how we've helped them succeed.
			</p>
		</div>
		<div
			class="flex justify-center space-x-24 mt-8 h-full overflow-x-auto p-5 relative">
			<SpotlightCarousel list={testimonialList} />
		</div>
		<div class="flex flex-col align-middle justify-center mt-16">
			<h4
				class="text-primary-beige/60 text-base font-light text-center 2xl:text-xl">
				Working with ecosystem leaders
			</h4>
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
