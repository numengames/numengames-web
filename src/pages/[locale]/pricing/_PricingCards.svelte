<script>
  import { getPricingTranslations } from "../../../i18n/translations/pricing";
  import { DEFAULT_LOCALE } from "../../../i18n";

  export let locale = DEFAULT_LOCALE;

  const priceValues = ["3.895€", "7.895€", "14.895€"];

  $: t = getPricingTranslations(locale);
  $: plans = t.plans.map((plan, i) => ({ ...plan, priceValue: priceValues[i] }));
</script>

<!-- GRID -->
<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 w-full mt-20 px-4">

  {#each plans as plan}
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
        {#each plan.features as feat}
          <li class="flex items-start gap-2">
            <span class="text-primary-coralRed text-xl leading-none">✓</span>
            <span>{feat}</span>
          </li>
        {/each}
      </ul>

      <!-- CTA BUTTON -->
      <button class="btn-contact form-toggle-button">
        {plan.cta}
        <span class="text-white text-lg leading-none">›</span>
      </button>

    </div>
  {/each}

</div>

<style>
  .card-base {
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

  .btn-contact {
    @apply w-full py-3 px-6 rounded-xl bg-[#1A1A1A]
    text-white flex items-center justify-center gap-2
    border border-[#2A2A2A]
    transition-all duration-300;
    box-shadow: 0 0 20px 3px rgba(217, 184, 106, 0.35);
  }

  .btn-contact:hover {
    box-shadow: 0 0 30px 6px rgba(217, 184, 106, 0.75);
  }
</style>
