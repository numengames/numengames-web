<script lang="ts">
  type PortfolioCard = {
    title: string;
    description: string;
    time: string;
    difficulty: string;
    type: string;
    loot: string;
    href: string;
    imageSrc: string;
    imageAlt: string;
    officialHref: string;
    officialLabel: string;

    pricingLabel: string;
    pricingValue: string;
    scopeLabel: string;
    scopeValue: string;
  };

  function difficultyToLevel(raw: string): number {
    const s = (raw ?? "").trim();
    const plus = (s.match(/\+/g) ?? []).length;
    const star = (s.match(/\*/g) ?? []).length;
    const level = Math.max(plus, star);
    return Math.max(1, Math.min(5, level || 1));
  }

  const items: PortfolioCard[] = [
    {
      title: "AII SYMPOSIUM 2025",
      description:
        "The Active Inference Institute (AII) is an international organization dedicated to researching and advancing the framework of Active Inference, a scientific model that explains how intelligent systems — biological or artificial — perceive, act, and learn. Its annual Symposium brings together researchers and practitioners from around the world to share theoretical developments and practical applications. For the 2025 edition, Numen Games designed a gamified 3D environment that served as an immersive, fantastical setting for the event. Within this space, participants could access all Symposium information while engaging in an escape-room-style adventure that experientially introduced the core foundations of the Active Inference map: the four states of mind and their dynamic interrelations. An example of how complex knowledge can become a meaningful and immersive game experience.",
      time: "25’",
      difficulty: "+++++",
      type: "Conceptual Matching",
      loot: "Collectible and commemorative POAP",
      href: "https://pre.experience.numen.games/",
      imageSrc: "/assets/active_2.png",
      imageAlt: "AII Symposium 2025",
      officialHref: "https://www.activeinference.institute/symposium",
      officialLabel: "activeinference.institute/symposium",
      pricingLabel: "Starting at",
      pricingValue: "18.000€",
      scopeLabel: "Estimated scope",
      scopeValue: "6–8 weeks production"
    },
    {
      title: "NERDEARLA 2025",
      description:
        "Nerdearla is the largest free technology and digital culture event in the Spanish-speaking world. Founded in Argentina in 2014 as a gathering “by nerds, for nerds,” it has become a leading international reference point for talks, workshops, and community-driven activities around software development, infrastructure, AI, data science, design, and open-source culture — both onsite and via global streaming. For the Nerdearla 2025 edition, held in Madrid and streamed globally, Numen Games — in collaboration with Arcasiles, the event organizers — designed a 3D space conceived as a fantastical digital twin of the event. This environment allowed visitors to explore what Nerdearla is and discover its content, areas, and dynamics through an interactive format. Rather than functioning as a simple virtual and immersive replica, the space transformed the visit into a playable experience, integrating information, exploration, and game mechanics into a single immersive journey.",
      time: "12’",
      difficulty: "++",
      type: "Treasure Hunt",
      loot: "Collectible and commemorative POAP",
      href: "https://pre.multiplex.numinia.xyz/",
      imageSrc: "/assets/Nerdearla_1.png",
      imageAlt: "Nerdearla 2025",
      officialHref: "https://nerdearla.es/",
      officialLabel: "nerdearla.es",
      pricingLabel: "Starting at",
      pricingValue: "9.000€",
      scopeLabel: "Estimated scope",
      scopeValue: "3–5 weeks production"
    },
    {
      title: "MERGE 2025",
      description:
        "Merge is an international conference focused on Web3, blockchain, and digital assets that acts as a strategic bridge between the technological and financial ecosystems of Europe and Latin America. The event brings together startups, corporations, regulators, and investors to foster collaboration and drive development within the decentralized digital economy. For Merge 2025, Numen Games creates a digital twin of the event venue, enhanced with fantastical elements that symbolize this transatlantic encounter. The environment functions as an immersive virtual version of the event, offering structured access to information about sponsors and partners. It also incorporates an interactive enigma that allows visitors to understand what Merge represents and how it connects innovation, regulation, and technological development. The result is a digital experience that combines representation, symbolism, and gameplay, expanding the event into an immersive territory aligned with its international vocation.",
      time: "15’",
      difficulty: "+++",
      type: "Conceptual Matching",
      loot: "Collectible and commemorative POAP",
      href: "https://mmerge.numen.games/",
      imageSrc: "/assets/merge1.png",
      imageAlt: "Merge 2025",
      officialHref: "https://www.mmerge.io/es",
      officialLabel: "mmerge.io/es",
      pricingLabel: "Starting at",
      pricingValue: "12.000€",
      scopeLabel: "Estimated scope",
      scopeValue: "4–6 weeks production"
    },
    {
      title: "MYSTERY AT THE PRINTING HOUSE",
      description:
        "Public Domain is one of the core cultural principles that shape Numen Games’ vision. Each January 1st, new works enter the public domain, marking an important milestone that we celebrate as an affirmation of open and shared knowledge — in coherence with our commitment to open-source code and public domain production. In 2026, Numen Games develops a 3D space that embodies this celebration through a playable adventure set in a fictional printing press that merges antiquity and futurism. Within this symbolic environment, players explore the history of Copyright and Public Domain through an interactive experience that transforms learning into exploration. The result is an immersive proposal that turns a cultural principle into a living experience, articulating historical memory, contemporary reflection, and gameplay mechanics within a single space.",
      time: "18’",
      difficulty: "***",
      type: "Cipher Decryption",
      loot: "Collectible and commemorative POAP",
      href: "https://pre.house-of-riddles.numinia.xyz/",
      imageSrc: "/assets/publicdo.png",
      imageAlt: "Mystery at the Printing House",
      officialHref: "https://www.pdinfo.com/",
      officialLabel: "pdinfo.com",
      pricingLabel: "Starting at",
      pricingValue: "11.000€",
      scopeLabel: "Estimated scope",
      scopeValue: "4–6 weeks production"
    },
    {
      title: "THE ADVENTURE OF CURIOSITY",
      description:
        "The Active Inference Institute (AII) is an international organization dedicated to researching and advancing the scientific framework of Active Inference, a model that explains how intelligent systems — biological or artificial — perceive, act, and learn by minimizing uncertainty through interaction with their environment. This approach integrates perception, action, and world into a single dynamic process of continuous inference. To represent Numen Games’ collaboration with the AII, a 3D space is developed as a playable adventure designed to communicate this principle through direct experience. The proposal uses the perception of music as a guiding thread, creating an immersive journey that moves through the four states of the model — from internal brain states to the external world. The result is an environment that translates a complex scientific framework into an interactive experience, articulating conceptual rigor and gameplay mechanics within a coherent digital space.",
      time: "20’",
      difficulty: "++++",
      type: "Logic Problem",
      loot: "Collectible and commemorative POAP",
      href: "https://pre.lemuria-academy.numinia.xyz/",
      imageSrc: "/assets/active_1.png",
      imageAlt: "The Adventure of Curiosity",
      officialHref: "https://www.activeinference.institute/",
      officialLabel: "activeinference.institute",
      pricingLabel: "Starting at",
      pricingValue: "15.000€",
      scopeLabel: "Estimated scope",
      scopeValue: "5–7 weeks production"
    }
  ];

  let expandedDesc: boolean[] = Array(items.length).fill(false);
  let expandedPricing: boolean[] = Array(items.length).fill(false);

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
            {expandedDesc[idx] ? "Less" : "More"}
          </button>

          <button
            type="button"
            class="pricing-link"
            aria-expanded={expandedPricing[idx]}
            on:click={() => togglePricing(idx)}
          >
            Pricing
            <span class={"chev " + (expandedPricing[idx] ? "rotated" : "")}>›</span>
          </button>
        </div>

        {#if expandedPricing[idx]}
          <div class="pricing-block" role="region" aria-label={`Pricing details for ${item.title}`}>
            <div class="pricing-line">
              <span class="pricing-label">{item.pricingLabel}</span>
              <span class="pricing-value">{item.pricingValue}</span>
            </div>
            <div class="scope-line">
              <span class="scope-label">{item.scopeLabel}:</span>
              <span class="scope-value">{item.scopeValue}</span>
            </div>
          </div>
        {/if}

        <div class="mt-6 mb-6 flex flex-col gap-2 text-sm text-primary-beige/70">
          <div>
            <span class="uppercase tracking-wider text-primary-beige/60 mr-2">Time</span>
            <span class="font-medium text-primary-beige/80">{item.time}</span>
          </div>

          <div>
            <span class="uppercase tracking-wider text-primary-beige/60 mr-2">Type</span>
            <span>{item.type}</span>
          </div>

          <div>
            <span class="uppercase tracking-wider text-primary-beige/60 mr-2">Loot</span>
            <span>{item.loot}</span>
          </div>

          <div>
            <span class="uppercase tracking-wider text-primary-beige/60 mr-2">Official</span>
            <a class="official-link" href={item.officialHref} target="_blank" rel="noopener noreferrer">
              {item.officialLabel}
            </a>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <span class="text-xs tracking-[0.25em] text-primary-beige/70">DIFFICULTY</span>
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
          <span class="contact-text">Contact</span>
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

    /* recorta cualquier cosa que salga fuera de la card (incluye las ondas del botón) */
    overflow: hidden;

    @apply flex flex-col justify-between rounded-xl
      bg-[#1F1F1F] border border-[#2A2A2A]
      p-8 transition-colors duration-200 shadow-[0_0_30px_rgba(0,0,0,0.35)];
  }

  .card-base:hover {
    border-color: rgba(255, 255, 255, 0.14);
    background: rgba(31, 31, 31, 0.98);
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
    color: rgba(218, 52, 64, 0.95);
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
    color: rgba(218, 52, 64, 0.95);
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
    color: rgba(218, 52, 64, 0.95);
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
    background: rgba(218, 52, 64, 0.85);
    border-color: rgba(218, 52, 64, 0.55);
    box-shadow: 0 0 8px 2px rgba(218, 52, 64, 0.25);
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

  /* Contact button: ondas como Help Center, visibles (sin recorte en el botón) */
  .contact-btn {
    width: 100%;
    position: relative;

    @apply py-3 px-6 rounded-xl flex items-center justify-center gap-2 text-sm font-medium;

    color: rgba(255, 255, 255, 0.92);
    background: transparent;

    border: 1px solid rgba(243, 80, 88, 0.25);
    box-shadow: 0 0 20px 0 rgba(243, 80, 89, 0.60);
    cursor: pointer;
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

  .contact-btn::before,
  .contact-btn::after {
    content: "";
    position: absolute;
    /* permite que el borde animado se “separe” un poco del botón */
    inset: -2px;
    border-radius: 0.75rem;

    border: 1px solid rgba(243, 80, 88, 0.5);
    transform: scale(1);
    animation: pulse 6s infinite;
    opacity: 0.55;
    pointer-events: none;
  }

  .contact-btn::before {
    animation-delay: 3s;
  }

  @keyframes pulse {
    0% {
      transform: scale3d(1.05, 1.15, 1.05);
      opacity: 0.55;
    }
    100% {
      transform: scale3d(1.3, 1.45, 1.3);
      opacity: 0;
    }
  }
</style>