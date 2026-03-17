<script lang="ts">
	import type { LogoItem } from "@types/components";
	export let list: LogoItem[] = [];

	let isPaused = false;
</script>

<div class="flow-carousel">
	<div class="flow-carousel__viewport">
		<div
			class:flow-carousel__track--paused={isPaused}
			class="flow-carousel__track"
			aria-hidden="true"
			on:mouseenter={() => (isPaused = true)}
			on:mouseleave={() => (isPaused = false)}>
			<div class="flow-carousel__group" aria-label="Partner logos">
				{#each list as { name, link }}
					<a
						href={link}
						target="_blank"
						rel="noopener noreferrer"
						class="flow-carousel__item">
						<img
							src={`/assets/${name}.png`}
							alt={name}
							class="flow-carousel__image" />
					</a>
				{/each}
			</div>

			<div class="flow-carousel__group" aria-hidden="true">
				{#each list as { name, link }}
					<a
						href={link}
						target="_blank"
						rel="noopener noreferrer"
						class="flow-carousel__item">
						<img
							src={`/assets/${name}.png`}
							alt={name}
							class="flow-carousel__image" />
					</a>
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	.flow-carousel {
		width: 100%;
		margin-top: 2.5rem;
		overflow: hidden;
	}

	.flow-carousel__viewport {
		width: 100%;
		overflow: hidden;
	}

	.flow-carousel__track {
		display: flex;
		width: max-content;
		align-items: center;
		animation: flow-carousel-marquee 42s linear infinite;
		will-change: transform;
	}

	.flow-carousel__track--paused {
		animation-play-state: paused;
	}

	.flow-carousel__group {
		display: flex;
		width: max-content;
		flex-shrink: 0;
		align-items: center;
		gap: 0.5rem;
	}

	.flow-carousel__item {
		display: inline-flex;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
		padding: 0 1.75rem;
		opacity: 0.9;
		transition: opacity 0.25s ease, transform 0.25s ease;
	}

	.flow-carousel__item:hover {
		opacity: 1;
		transform: translateY(-1px);
	}

	.flow-carousel__image {
		display: block;
		height: auto;
		max-height: 2.75rem;
		width: auto;
		object-fit: contain;
	}

	@keyframes flow-carousel-marquee {
		from {
			transform: translate3d(0, 0, 0);
		}
		to {
			transform: translate3d(-50%, 0, 0);
		}
	}

	@media (min-width: 1536px) {
		.flow-carousel__item {
			padding: 0 2.25rem;
		}

		.flow-carousel__image {
			max-height: 3.1rem;
		}
	}
</style>
