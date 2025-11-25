<script>
  export let plans = [
    {
      title: "Starter 3D web",
      price: "€4,000 – €8,000",
      features: [
        "Navigable mini-universe",
        "Basic 2D -> 3D conversion",
        "Adapted visual identity",
        "Fast delivery",
        "Ideal for testing the metaverse"
      ],
      cta: "Contact"
    },
    {
      title: "Custom 3D Experience",
      price: "€8,000 – €20,000",
      highlight: true,
      features: [
        "100% custom design",
        "Narrative + art + interaction",
        "Multimedia integration",
        "Full immersive experience",
        "Ideal for brands seeking differentiation"
      ],
      cta: "Contact"
    },
    {
      title: "Full Metaverse Integration",
      price: "€20,000 – €50,000",
      features: [
        "Persistent and scalable world",
        "Gamification",
        "Events, rooms and missions",
        "Custom visual identity and architecture",
        "Ideal for brands wanting their own world"
      ],
      cta: "Contact"
    }
  ];
</script>

<!-- GRID -->
<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 w-full mt-20 px-4">

  {#each plans as plan}
    <div
      class={`flex flex-col justify-between rounded-xl 
      bg-[#1F1F1F] 
      border border-[#2A2A2A] 
      p-8 shadow-[0_0_30px_rgba(0,0,0,0.35)] 
      transition 
      ${plan.highlight ? "shadow-[0_0_45px_rgba(218,52,64,0.35)] border-primary-coralRed" : ""}`}
    >

      <!-- TITLE -->
      <h3 class="text-2xl font-semibold text-primary-beige mb-3">
        {plan.title}
      </h3>

      <!-- PRICE -->
      <div class="text-primary-beige mb-6">
        <span class="text-3xl font-light">{plan.price}</span>
      </div>

      <!-- FEATURES -->
      <ul class="flex flex-col gap-2 text-primary-beige/70 text-base mb-8 leading-relaxed">
        {#each plan.features as feat}
          <li class="flex items-start gap-2">
            <span class="text-primary-coralRed text-xl leading-none">✓</span>
            <span>{feat}</span>
          </li>
        {/each}
      </ul>

      <!-- CTA BUTTON — now opens the global contact form -->
      <button
        class={`form-toggle-button w-full py-3 px-6 rounded-xl bg-[#1A1A1A] text-white flex items-center justify-center gap-2
        shadow-[0_0_20px_3px_rgba(218,52,64,0.35)]
        hover:shadow-[0_0_25px_5px_rgba(218,52,64,0.55)]
        transition-all duration-300 border border-[#2A2A2A]`}
      >
        {plan.cta}
        <span class="text-white text-lg leading-none">›</span>
      </button>

    </div>
  {/each}

</div>
