<script>
	import Container from "@components/Container.svelte";
	import FlowCarousel from "@components/FlowCarousel.svelte";
	import BracketedContent from "@components/BracketedContent.svelte";

	export let testimonialList = [
		{
			quote:
				"My favorite part of this training is the immersive learning ability for students is really incredible and the instructor was great!",
			author: "Manuel Castro",
			position: "Program Specialist at Hayward Unified School District Office",
		},
		{
			quote:
				"Numen’s open-source mindset and technical excellence help us bring our vision for the future of 3D internet to life.",
			author: "R3S3T Studio",
			position: "CEO r3s3t.xyz",
			image: "/assets/r3s3t.png",
		},
		{
			quote:
				"I think these are the timelines we need to be looking at - the one-hundred- or two-hundrd-year horizons. Because most of the really bad stuff that's happening right now is the result of very short-term thinking.",
			author: "Jane McGonigal",
			position: "Game developer",
		},
		{
			quote:
				"Human-focused design is a journey into the soul of the user. You're not just solving problems-you're touching lives, shaping futures, creating magic.",
			author: "Yu-kai Chou",
			position: "Gamification Expert",
		}
	];

	let currentIndex = 0;

	function prevSlide() {
		currentIndex = currentIndex > 0 ? currentIndex - 1 : testimonialList.length - 1;
	}

	function nextSlide() {
		currentIndex = currentIndex < testimonialList.length - 1 ? currentIndex + 1 : 0;
	}
</script>

<Container
	className="xl:hidden flex flex-col items-center justify-center pt-24"
	bgColor="bg-primary-panther">
	<div class="w-full min-h-[675px]">
		<BracketedContent text="TESTIMONIALS" />

		<div class="flex flex-col justify-between items-start mt-4">
			<h3 class="text-primary-beige text-4xl font-medium mb-4">
				Why People Love Us
			</h3>
			<p class="text-primary-beige/70 text-base mb-8">
				Our partners & clients' stories showcase our passion for delivering great results.
				Take a look at how we've helped clients, partners, and community to succeed.
			</p>
		</div>

		<div class="relative w-full">
			<div class="testimonial-card w-full max-w-[500px] mx-auto">
				<div class="testimonial-quote-mark">"</div>

				<p class="text-primary-beige text-lg my-4 leading-relaxed">
					{testimonialList[currentIndex].quote}
				</p>

				<div class="mt-6">
					<p class="text-primary-beige text-lg font-medium">
						{testimonialList[currentIndex].author}
					</p>
					<p class="text-primary-beige/65 text-sm">
						{testimonialList[currentIndex].position}
					</p>
				</div>
			</div>

			<div class="flex justify-center mt-5 space-x-3">
				<button
					class="testimonial-nav-button"
					on:click={prevSlide}
					aria-label="Previous testimonial">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-beige" viewBox="0 0 20 20" fill="currentColor">
						<path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
					</svg>
				</button>

				<button
					class="testimonial-nav-button"
					on:click={nextSlide}
					aria-label="Next testimonial">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-beige" viewBox="0 0 20 20" fill="currentColor">
						<path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
					</svg>
				</button>
			</div>
		</div>

		<div class="flex flex-col align-middle justify-center mt-16">
			<h4 class="text-primary-beige/60 text-base font-light text-center">
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

<style>
	.testimonial-card {
		padding: 1.5rem;
		border-radius: 1rem;
		background:
			linear-gradient(135deg, rgba(44, 36, 22, 0.92), rgba(19, 22, 26, 0.96), rgba(24, 20, 16, 0.96));
		border: 1px solid rgba(217, 184, 106, 0.18);
		box-shadow:
			0 0 32px rgba(217, 184, 106, 0.10),
			0 20px 40px rgba(0, 0, 0, 0.28);
	}

	.testimonial-quote-mark {
		font-size: 3rem;
		line-height: 1;
		font-weight: 700;
		color: #d9b86a;
	}

	.testimonial-nav-button {
		width: 2.5rem;
		height: 2.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 9999px;
		background: rgba(217, 184, 106, 0.14);
		border: 1px solid rgba(217, 184, 106, 0.28);
		box-shadow: 0 0 18px rgba(217, 184, 106, 0.14);
		transition: background 0.2s ease, transform 0.2s ease;
	}

	.testimonial-nav-button:hover {
		background: rgba(217, 184, 106, 0.22);
		transform: translateY(-1px);
	}
</style>
