<script lang="ts">
	import type { ProfileSocials } from "@app-types/components";

	export let name: string;
	export let imgPath: string;
	export let socials: ProfileSocials;
	export let subtitle: string;
	export let className: string;
</script>

<div class={`relative bg-cover mx-3 rounded-lg ${className}`} style="background-image: url({imgPath});">
	<div class="absolute bottom-2 w-full">
		<div class="h-full mx-5 rounded-lg backdrop-filter backdrop-blur-[50px] p-4">
			<h4 class="text-2xl">{name}</h4>
			<h4 class="text-lg">{subtitle}</h4>
			<div class="flex space-x-3 mt-2">
				{#if socials.discordUrl}
					<a href={socials.discordUrl} target="_blank" rel="noopener noreferrer">
						<img src="/icons/discord-logo.svg" alt="Discord" class="w-10 h-10 bg-primary-coralRed p-1 rounded-full" />
					</a>
				{/if}
				{#if socials.linkedinUrl}
					<a href={socials.linkedinUrl} target="_blank" rel="noopener noreferrer">
						<img src="/icons/linkedin-logo.svg" alt="LinkedIn" class="w-10 h-10 bg-primary-coralRed p-1 rounded-full" />
					</a>
				{/if}
				{#if socials.xUrl}
					<a href={socials.xUrl} target="_blank" rel="noopener noreferrer">
						<img src="/icons/x.svg" alt="X" class="w-10 h-10 bg-primary-coralRed p-1 rounded-full" />
					</a>
				{/if}
				{#if socials.hyperfySpaceUrl}
					<a href={socials.hyperfySpaceUrl} target="_blank" rel="noopener noreferrer">
						<img src="/icons/hyperfy.svg" alt="Hyperfy" class="w-10 h-10 bg-primary-coralRed p-1 rounded-full" />
					</a>
				{/if}
			</div>
		</div>
	</div>
</div>
