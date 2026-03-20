<script lang="ts">
  import { getPortfolioTranslations } from "../../../i18n/translations/portfolio";
  import { DEFAULT_LOCALE } from "../../../i18n";

  export let locale = DEFAULT_LOCALE;
  $: t = getPortfolioTranslations(locale);
</script>

<div class="w-full flex flex-col items-center mt-20 mb-12">
  <div class="flex flex-col items-center text-center max-w-[650px] px-6 space-y-4">
    <p class="tracking-[0.25em] text-xs">
      <span class="text-primary-coralRed">[</span>
      <span class="text-primary-beige mx-1">{t.label}</span>
      <span class="text-primary-coralRed">]</span>
    </p>

    <h2
      class="font-light text-primary-beige leading-tight
      text-4xl sm:text-5xl md:text-[56px] md:leading-[1.10]"
    >
      {t.heading1}
      <span class="text-primary-coralRed"> {t.highlight}</span>.
      <br />
      {t.heading2}
    </h2>
  </div>
</div>