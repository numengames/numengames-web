<script lang="ts">
  import { getPortfolioTranslations } from "../../../i18n/translations/portfolio";
  import { DEFAULT_LOCALE } from "../../../i18n";

  export let locale = DEFAULT_LOCALE;
  $: t = getPortfolioTranslations(locale);
  $: items = t.cards;
  $: ui = t.ui;

  function difficultyToLevel(raw: string): number {
    const s = (raw ?? "").trim();
    const plus = (s.match(/\+/g) ?? []).length;
    const star = (s.match(/\*/g) ?? []).length;
    const level = Math.max(plus, star);
    return Math.max(1, Math.min(5, level || 1));
  }

  let expandedDesc: boolean[] = Array(5).fill(false);
  let expandedPricing: boolean[] = Array(5).fill(false);

  function toggleDesc(i: number) {
    expandedDesc[i] = !expandedDesc[i];
    expandedDesc = expandedDesc;
  }

  function togglePricing(i: number) {
    expandedPricing[i] = !expandedPricing[i];
    expandedPricing = expandedPricing;
  }

  function openExplore(url: string) {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function onCardClick(event: MouseEvent, url: string) {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const interactive = target.closest(
      "button, a, input, textarea, select, [role='button'], .form-toggle-button"
    );
    if (interactive) return;

    openExplore(url);
  }

  function onCardKeydown(event: KeyboardEvent, url: string) {
    const key = event.key;
    if (key !== "Enter" && key !== " ") return;
    event.preventDefault();
    openExplore(url);
  }
</script>

<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 w-full mt-10 px-4">
  {#each items as item, idx}
    {@const level = difficultyToLevel(item.difficulty)}

    <div
      class="card-base"
      role="link"
      tabindex="0"
      aria-label={`Explore: ${item.title}`}
      on:click={(e) => onCardClick(e, item.href)}
      on:keydown={(e) => onCardKeydown(e, item.href)}
    >
      <div>
        <div class="card-click-indicator" aria-hidden="true">↗</div>

        <div class="image-wrap mb-6">
          <img src={item.imageSrc} alt={item.imageAlt} loading="lazy" class="image" />
        </div>

        <h3 class="text-2xl font-semibold text-primary-beige mb-3">
          {item.title}
        </h3>

        <p class:line-clamp-6={!expandedDesc[idx]} class="text-primary-beige/70 text-sm leading-relaxed mb-3">
          {item.description}
        </p>

        <div class="flex items-center justify-between gap-4">
          <button
            type="button"
            class="more-link"
            aria-expanded={expandedDesc[idx]}
            on:click={() => toggleDesc(idx)}
          >
            {expandedDesc[idx] ? ui.less : ui.more}
          </button>

          <button
            type="button"
            class="pricing-link"
            aria-expanded={expandedPricing[idx]}
            on:click={() => togglePricing(idx)}
          >
            {ui.pricing}
            <span class={"chev " + (expandedPricing[idx] ? "rotated" : "")}>›</span>
          </button>
        </div>

        {#if expandedPricing[idx]}
          <div class="pricing-block" role="region" aria-label={`Pricing details for ${item.title}`}>
            <div class="pricing-line">
              <span class="pricing-label">{ui.startingAt}</span>
              <span class="pricing-value">{item.pricingValue}</span>
            </div>
            <div class="scope-line">
              <span class="scope-label">{ui.estimatedScope}:</span>
              <span class="scope-value">{item.scopeValue}</span>
            </div>
          </div>
        {/if}

        <div class="mt-6 mb-6 flex flex-col gap-2 text-sm text-primary-beige/70">
          <div>
            <span class="uppercase tracking-wider text-primary-beige/60 mr-2">{ui.time}</span>
            <span class="font-medium text-primary-beige/80">{item.time}</span>
          </div>

          <div>
            <span class="uppercase tracking-wider text-primary-beige/60 mr-2">{ui.type}</span>
            <span>{item.type}</span>
          </div>

          <div>
            <span class="uppercase tracking-wider text-primary-beige/60 mr-2">{ui.loot}</span>
            <span>{item.loot}</span>
          </div>

          <div>
            <span class="uppercase tracking-wider text-primary-beige/60 mr-2">{ui.official}</span>
            <a class="official-link" href={item.officialHref} target="_blank" rel="noopener noreferrer">
              {item.officialLabel}
            </a>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <span class="text-xs tracking-[0.25em] text-primary-beige/70">{ui.difficulty}</span>
          <div class="flex items-center gap-1" aria-label={`Difficulty ${level}/5`}>
            {#each Array(5) as _, p}
              <span class={"diff-pip " + (p < level ? "filled" : "")}></span>
            {/each}
          </div>
        </div>
      </div>

      <div class="mt-8">
        <button
          type="button"
          class="contact-btn form-toggle-button"
          aria-label={`Contact about: ${item.title}`}
        >
          <span class="contact-text">{ui.contact}</span>
          <span class="contact-icon" aria-hidden="true">›</span>
        </button>
      </div>
    </div>
  {/each}
</div>

<style>
  .card-base {
    position: relative;
    cursor: pointer;

    @apply flex flex-col justify-between rounded-xl
      bg-[#1F1F1F] border border-[#2A2A2A]
      p-8 transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.35)];
  }

  .card-base:hover {
    box-shadow:
      0 0 25px 4px rgba(217, 184, 106, 0.45),
      0 0 10px rgba(217, 184, 106, 0.25),
      0 0 4px rgba(217, 184, 106, 0.15);
    transform: translateY(-2px);
    border-color: rgba(217, 184, 106, 0.35);
  }

  .card-click-indicator {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 34px;
    height: 34px;
    border-radius: 9999px;
    display: grid;
    place-items: center;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.72);
    border: 1px solid rgba(255, 255, 255, 0.10);
    background: rgba(255, 255, 255, 0.04);
    pointer-events: none;
  }

  .more-link {
    @apply inline-flex items-center gap-2 text-sm font-medium;
    color: rgba(217, 184, 106, 0.95);
    background: transparent;
    border: 0;
    cursor: pointer;
  }

  .more-link:hover {
    text-decoration: underline;
  }

  .pricing-link {
    @apply inline-flex items-center gap-2 text-sm font-medium;
    color: rgba(255, 255, 255, 0.72);
    background: transparent;
    border: 0;
    cursor: pointer;
  }

  .pricing-link:hover {
    color: rgba(217, 184, 106, 0.95);
    text-decoration: underline;
  }

  .chev {
    display: inline-block;
    transition: transform 180ms ease;
    opacity: 0.85;
    transform: rotate(90deg);
  }

  .chev.rotated {
    transform: rotate(-90deg);
  }

  .official-link {
    color: rgba(255, 255, 255, 0.75);
    text-decoration: none;
  }

  .official-link:hover {
    color: rgba(217, 184, 106, 0.95);
    text-decoration: underline;
  }

  .image-wrap {
    width: 100%;
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.03);
    aspect-ratio: 16 / 9;
  }

  .image {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    object-position: center;
  }

  .diff-pip {
    width: 10px;
    height: 10px;
    border-radius: 9999px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    background: rgba(255, 255, 255, 0.05);
    display: inline-block;
  }

  .diff-pip.filled {
    background: rgba(217, 184, 106, 0.85);
    border-color: rgba(217, 184, 106, 0.55);
    box-shadow: 0 0 8px 2px rgba(217, 184, 106, 0.25);
  }

  .pricing-block {
    margin-top: 14px;
    padding-top: 14px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }

  .pricing-line {
    display: flex;
    align-items: baseline;
    gap: 10px;
  }

  .pricing-label {
    font-size: 12px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.55);
  }

  .pricing-value {
    font-size: 18px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.88);
  }

  .scope-line {
    margin-top: 6px;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.62);
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }

  .scope-label {
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.55);
  }

  .scope-value {
    color: rgba(255, 255, 255, 0.70);
  }

  .contact-btn {
    width: 100%;

    @apply py-3 px-6 rounded-xl flex items-center justify-center gap-2 text-sm font-medium;

    color: rgba(255, 255, 255, 0.92);
    background: #1A1A1A;
    border: 1px solid #2A2A2A;
    box-shadow: 0 0 20px 3px rgba(217, 184, 106, 0.35);
    transition: all 0.3s;
    cursor: pointer;
  }

  .contact-btn:hover {
    box-shadow: 0 0 30px 6px rgba(217, 184, 106, 0.75);
  }

  .contact-text,
  .contact-icon {
    position: relative;
    z-index: 1;
  }

  .contact-icon {
    font-size: 16px;
    line-height: 1;
    opacity: 0.9;
  }
</style>
