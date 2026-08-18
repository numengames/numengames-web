<script>
	export let plans = [
		{
			title: "Tiers 1",
			priceLabel: "Starting at",
			priceValue: "3.895€",
			features: ["Navigable mini-universe", "Basic 2D -> 3D conversion", "Adapted visual identity", "Fast delivery", "Ideal for testing the metaverse"],
			cta: "Contact",
		},
		{
			title: "Tiers 2",
			priceLabel: "Starting at",
			priceValue: "7.895€",
			features: ["100% custom design", "Narrative + art + interaction", "Multimedia integration", "Full immersive experience", "Ideal for brands seeking differentiation"],
			cta: "Contact",
		},
		{
			title: "Tiers 3",
			priceLabel: "Starting at",
			priceValue: "14.895€",
			features: ["Persistent and scalable world", "Gamification", "Events, rooms and missions", "Custom visual identity and architecture", "Ideal for brands wanting their own world"],
			cta: "Contact",
		},
	];
</script>

<!-- GRID -->
<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 w-full mt-20 px-4">
	{#each plans as plan, planIndex (planIndex)}
		<div class="card-base">
			<!-- TITLE -->
			<h3 class="text-2xl font-semibold text-primary-beige mb-3">
				{plan.title}
			</h3>

			<!-- PRICE -->
			<div class="text-primary-beige mb-6 text-3xl">
				<span class="font-light mr-2">{plan.priceLabel}</span>
				<span class="font-semibold">{plan.priceValue}</span>
			</div>

			<!-- FEATURES -->
			<ul class="flex flex-col gap-2 text-primary-beige/70 text-base mb-8 leading-relaxed">
				{#each plan.features as feat, featIndex (featIndex)}
					<li class="flex items-start gap-2">
						<span class="text-primary-coralRed text-xl leading-none">✓</span>
						<span>{feat}</span>
					</li>
				{/each}
			</ul>

			<!-- CTA BUTTON -->
			<button class="btn-contact form-toggle-button">
				{plan.cta}
				<span class="text-arena text-lg leading-none">›</span>
			</button>
		</div>
	{/each}
</div>

<style>
	.card-base {
		@apply flex flex-col justify-between rounded-xl
    bg-[#1E1A17] border border-[#292420]
    p-8 transition-all duration-300 shadow-[0_0_30px_rgba(20,17,15,0.35)];
	}

	.card-base:hover {
		box-shadow:
			0 0 25px 4px rgba(239, 165, 23, 0.45),
			0 0 10px rgba(239, 165, 23, 0.25),
			0 0 4px rgba(239, 165, 23, 0.15);
		transform: translateY(-2px);
		border-color: rgba(239, 165, 23, 0.35);
	}

	.btn-contact {
		@apply w-full py-3 px-6 rounded-xl bg-[#1E1A17]
    text-arena flex items-center justify-center gap-2
    border border-[#292420]
    transition-all duration-300;
		box-shadow: 0 0 20px 3px rgba(239, 165, 23, 0.35);
	}

	.btn-contact:hover {
		box-shadow: 0 0 30px 6px rgba(239, 165, 23, 0.75);
	}
</style>
