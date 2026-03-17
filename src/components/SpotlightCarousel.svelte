<script lang="ts">
	import { onMount, onDestroy } from "svelte";
	import type { Testimonial } from "../types/components";

	export let list: Testimonial[] = [];

	let activeIndex = 0;
	let intervalId: ReturnType<typeof setInterval> | undefined;

	const AUTOPLAY_MS = 7000;

	function mod(value: number, total: number): number {
		return ((value % total) + total) % total;
	}

	function getRelativePosition(index: number, current: number, total: number): number {
		if (!total) return 0;

		let relative = index - current;
		const half = total / 2;

		if (relative > half) relative -= total;
		if (relative < -half) relative += total;

		return relative;
	}

	function getCardStyle(index: number, current: number, total: number): string {
		const relative = getRelativePosition(index, current, total);
		const distance = Math.abs(relative);

		const translateX = relative * 360;
		const translateZ = -distance * 220;
		const rotateY = -relative * 18;
		const scale = 1 - Math.min(distance * 0.12, 0.28);
		const opacity = Math.max(0.26, 1 - distance * 0.24);
		const blur = Math.min(distance * 1.25, 3);
		const zIndex = Math.round((10 - distance) * 100);

		return `
			transform:
				translate3d(${translateX}px, 0, ${translateZ}px)
				rotateY(${rotateY}deg)
				scale(${scale});
			opacity: ${opacity};
			filter: blur(${blur}px);
			z-index: ${zIndex};
			pointer-events: ${distance < 0.9 ? "auto" : "none"};
		`;
	}

	function next() {
		if (list.length <= 1) return;
		activeIndex = mod(activeIndex + 1, list.length);
	}

	function prev() {
		if (list.length <= 1) return;
		activeIndex = mod(activeIndex - 1, list.length);
	}

	function stopAutoplay() {
		if (intervalId) {
			clearInterval(intervalId);
			intervalId = undefined;
		}
	}

	function startAutoplay() {
		stopAutoplay();
		if (list.length > 1) {
			intervalId = setInterval(() => {
				next();
			}, AUTOPLAY_MS);
		}
	}

	function handleClick(e: MouseEvent) {
		const el = e.currentTarget as HTMLElement;
		const rect = el.getBoundingClientRect();
		const x = e.clientX - rect.left;
		if (x < rect.width / 2) {
			prev();
		} else {
			next();
		}
	}

	onMount(() => {
		startAutoplay();
	});

	onDestroy(() => {
		stopAutoplay();
	});
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="spotlight-carousel"
	on:mouseenter={stopAutoplay}
	on:mouseleave={startAutoplay}
	on:click={handleClick}>
	<div class="spotlight-carousel__stage">
		{#each list as item, index}
			<div
				role="article"
				tabindex="-1"
				class:spotlight-card--active={index === activeIndex}
				class="spotlight-card"
				style={getCardStyle(index, activeIndex, list.length)}>
				<div class="spotlight-card__inner">
					<blockquote class="spotlight-card__body">
						<div class="spotlight-card__quote-mark">"</div>

						<p class="spotlight-card__quote-text">
							{item.quote}
						</p>
					</blockquote>

					<div class="spotlight-card__footer">
						<div class="spotlight-card__meta">
							{#if item.author}
								<p class="spotlight-card__author">{item.author}</p>
							{/if}

							{#if item.position}
								<p class="spotlight-card__position">{item.position}</p>
							{/if}
						</div>

						{#if item.image}
							<div class="spotlight-card__avatar-shell">
								<img
									src={item.image}
									alt={item.author}
									class="spotlight-card__avatar" />
							</div>
						{/if}
					</div>
				</div>
			</div>
		{/each}

		<div class="spotlight-carousel__ambient"></div>
	</div>
</div>

<style>
	.spotlight-carousel {
		position: relative;
		width: 100%;
		height: 500px;
		overflow: hidden;
		cursor: pointer;
	}

	.spotlight-carousel__stage {
		position: relative;
		width: 100%;
		height: 100%;
		perspective: 1500px;
		perspective-origin: center;
		transform-style: preserve-3d;
	}

	.spotlight-card {
		position: absolute;
		top: 50%;
		left: 50%;
		width: min(30vw, 460px);
		height: 460px;
		margin-left: calc(min(30vw, 460px) / -2);
		margin-top: -230px;
		overflow: hidden;
		border: 1px solid rgba(217, 184, 106, 0.18);
		border-radius: 28px;
		background:
			radial-gradient(circle at top left, rgba(217, 184, 106, 0.14), transparent 34%),
			radial-gradient(circle at 85% 18%, rgba(255, 255, 255, 0.05), transparent 22%),
			linear-gradient(
				145deg,
				rgba(30, 26, 21, 0.96),
				rgba(16, 18, 22, 0.97) 52%,
				rgba(11, 13, 17, 0.98)
			);
		box-shadow:
			0 0 0 1px rgba(255, 255, 255, 0.02) inset,
			0 18px 50px rgba(0, 0, 0, 0.34),
			0 0 42px rgba(217, 184, 106, 0.08);
		backface-visibility: hidden;
		will-change: transform, opacity, filter;
		transition:
			transform 1.9s cubic-bezier(0.25, 0.85, 0.35, 1),
			opacity 1.9s cubic-bezier(0.25, 0.85, 0.35, 1),
			filter 1.9s cubic-bezier(0.25, 0.85, 0.35, 1),
			box-shadow 0.45s ease,
			border-color 0.45s ease;
	}

	.spotlight-card--active {
		border-color: rgba(217, 184, 106, 0.26);
		box-shadow:
			0 0 0 1px rgba(255, 255, 255, 0.03) inset,
			0 26px 72px rgba(0, 0, 0, 0.44),
			0 0 56px rgba(217, 184, 106, 0.14);
	}

	.spotlight-card__inner {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
		padding: 1.9rem;
	}

	.spotlight-card__body {
		display: flex;
		flex: 1;
		flex-direction: column;
		min-height: 0;
	}

	.spotlight-card__quote-mark {
		margin-bottom: 1rem;
		font-size: 3.6rem;
		line-height: 0.9;
		font-weight: 700;
		color: #d9b86a;
		text-shadow: 0 0 24px rgba(217, 184, 106, 0.18);
	}

	.spotlight-card__quote-text {
		margin: 0;
		color: rgba(245, 236, 214, 0.84);
		font-size: 1.16rem;
		line-height: 1.62;
		letter-spacing: 0.005em;
	}

	.spotlight-card__footer {
		margin-top: 1.75rem;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 1rem;
	}

	.spotlight-card__author {
		color: rgba(245, 236, 214, 0.96);
		font-size: 1.125rem;
	}

	.spotlight-card__position {
		margin-top: 0.35rem;
		color: rgba(245, 236, 214, 0.6);
		font-size: 0.95rem;
	}

	.spotlight-card__avatar-shell {
		display: flex;
		padding: 0.35rem;
		border: 1px solid rgba(217, 184, 106, 0.2);
		border-radius: 9999px;
		background: rgba(15, 17, 21, 0.92);
	}

	.spotlight-card__avatar {
		width: 4.5rem;
		height: 4.5rem;
		border-radius: 9999px;
		object-fit: cover;
	}

	.spotlight-carousel__ambient {
		position: absolute;
		left: 50%;
		bottom: 1.25rem;
		width: 72%;
		height: 6rem;
		transform: translateX(-50%);
		border-radius: 9999px;
		background: linear-gradient(
			90deg,
			rgba(217, 184, 106, 0),
			rgba(217, 184, 106, 0.18),
			rgba(217, 184, 106, 0)
		);
		filter: blur(42px);
	}
</style>
