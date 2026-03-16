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
			image: "/assets/jane-mcgonigal.png",
		},
		{
			quote:
				"Human-focused design is a journey into the soul of the user. You're not just solving problems-you're touching lives, shaping futures, creating magic.",
			author: "Yu-kai Chou",
			position: "Gamification Expert",
			image: "/assets/yu-kai-chou.png",
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

		<div class="mt-4 flex flex-col items-start justify-between">
			<h3 class="mb-4 text-4xl font-medium text-primary-beige">
				Why People Love Us
			</h3>

			<p class="mb-8 text-base text-primary-beige/70">
				Our partners & clients' stories showcase our passion for delivering great results.
				Take a look at how we've helped clients, partners, and community to succeed.
			</p>
		</div>

		<div class="relative w-full">
			<div class="testimonial-card mx-auto w-full max-w-[500px]">
				<div class="testimonial-card__inner">
					<div class="testimonial-quote-mark">“</div>

					<p class="testimonial-quote-text">
						{testimonialList[currentIndex].quote}
					</p>

					<div class="mt-8 flex items-end justify-between gap-4">
						<div class="min-w-0 flex-1">
							<p class="truncate text-lg font-medium text-primary-beige/96">
								{testimonialList[currentIndex].author}
							</p>

							<p class="mt-1 text-sm leading-relaxed text-primary-beige/58">
								{testimonialList[currentIndex].position}
							</p>
						</div>

						{#if testimonialList[currentIndex].image}
							<div class="testimonial-avatar-shell shrink-0">
								<img
									src={testimonialList[currentIndex].image}
									alt={testimonialList[currentIndex].author}
									class="h-14 w-14 rounded-full object-cover" />
							</div>
						{/if}
					</div>
				</div>
			</div>

			<div class="mt-5 flex justify-center gap-3">
				<button
					class="testimonial-nav-button"
					on:click={prevSlide}
					aria-label="Previous testimonial">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5 text-primary-beige"
						viewBox="0 0 20 20"
						fill="currentColor">
						<path
							fill-rule="evenodd"
							d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
							clip-rule="evenodd" />
					</svg>
				</button>

				<button
					class="testimonial-nav-button"
					on:click={nextSlide}
					aria-label="Next testimonial">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5 text-primary-beige"
						viewBox="0 0 20 20"
						fill="currentColor">
						<path
							fill-rule="evenodd"
							d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
							clip-rule="evenodd" />
					</svg>
				</button>
			</div>
		</div>

		<div class="mt-16 flex flex-col justify-center align-middle">
			<h4 class="text-center text-base font-light text-primary-beige/60">
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
		position: relative;
		overflow: hidden;
		padding: 1.5rem;
		border-radius: 1.5rem;
		border: 1px solid rgba(217, 184, 106, 0.18);
		background:
			radial-gradient(circle at top left, rgba(217, 184, 106, 0.14), transparent 34%),
			radial-gradient(circle at 85% 18%, rgba(255, 255, 255, 0.05), transparent 22%),
			linear-gradient(145deg, rgba(30, 26, 21, 0.96), rgba(16, 18, 22, 0.97) 52%, rgba(11, 13, 17, 0.98));
		box-shadow:
			0 0 0 1px rgba(255, 255, 255, 0.02) inset,
			0 18px 44px rgba(0, 0, 0, 0.32),
			0 0 38px rgba(217, 184, 106, 0.08);
	}

	.testimonial-card::before {
		content: "";
		position: absolute;
		inset: 0;
		border-radius: inherit;
		background: linear-gradient(
			180deg,
			rgba(255, 255, 255, 0.05) 0%,
			rgba(255, 255, 255, 0.015) 18%,
			transparent 42%
		);
		pointer-events: none;
	}

	.testimonial-card::after {
		content: "";
		position: absolute;
		inset: 1px;
		border-radius: calc(1.5rem - 1px);
		border: 1px solid rgba(217, 184, 106, 0.08);
		pointer-events: none;
	}

	.testimonial-card__inner {
		position: relative;
		z-index: 1;
	}

	.testimonial-quote-mark {
		font-size: 3.5rem;
		line-height: 0.9;
		font-weight: 700;
		color: #d9b86a;
		text-shadow: 0 0 24px rgba(217, 184, 106, 0.18);
	}

	.testimonial-quote-text {
		margin: 1rem 0 0;
		color: rgba(245, 236, 214, 0.82);
		font-size: 1.08rem;
		line-height: 1.65;
		letter-spacing: 0.005em;
		text-wrap: pretty;
	}

	.testimonial-avatar-shell {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.3rem;
		border: 1px solid rgba(217, 184, 106, 0.2);
		border-radius: 9999px;
		background:
			linear-gradient(135deg, rgba(217, 184, 106, 0.12), rgba(255, 255, 255, 0.02)),
			rgba(15, 17, 21, 0.92);
		box-shadow:
			0 0 20px rgba(217, 184, 106, 0.1),
			0 10px 20px rgba(0, 0, 0, 0.24);
	}

	.testimonial-nav-button {
		display: flex;
		height: 2.75rem;
		width: 2.75rem;
		align-items: center;
		justify-content: center;
		border-radius: 9999px;
		border: 1px solid rgba(217, 184, 106, 0.24);
		background:
			linear-gradient(180deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02)),
			rgba(18, 20, 25, 0.92);
		box-shadow:
			0 0 20px rgba(217, 184, 106, 0.08),
			0 8px 18px rgba(0, 0, 0, 0.22);
		transition:
			transform 0.2s ease,
			background 0.2s ease,
			border-color 0.2s ease,
			box-shadow 0.2s ease;
	}

	.testimonial-nav-button:hover {
		transform: translateY(-1px);
		border-color: rgba(217, 184, 106, 0.38);
		background:
			linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03)),
			rgba(20, 22, 28, 0.96);
		box-shadow:
			0 0 24px rgba(217, 184, 106, 0.12),
			0 10px 22px rgba(0, 0, 0, 0.26);
	}

	.testimonial-nav-button:active {
		transform: translateY(0);
	}

	@media (max-width: 420px) {
		.testimonial-card {
			padding: 1.25rem;
		}

		.testimonial-quote-mark {
			font-size: 3rem;
		}

		.testimonial-quote-text {
			font-size: 1rem;
		}
	}
</style>
