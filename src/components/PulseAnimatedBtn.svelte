<script lang="ts">
	export let link: string = "";
	export let text: string = "";
	export let icon: string = "";
	export let className: string = "";
</script>

{#if link}
	<a href={link} target="_blank" rel="noopener noreferrer">
		<button class={`btn-base flex items-center justify-center text-white ${className}`}>
			{text}
			{#if icon}
				<img src={icon} alt="icon" class="ml-2 inline-block w-4 h-4" />
			{/if}
		</button>
	</a>
{:else}
	<button class={`btn-base flex items-center justify-center text-white ${className}`}>
		{text}
		{#if icon !== ""}
			<img src={icon} alt="icon" class="ml-2 inline-block w-4 h-4" />
		{/if}
	</button>
{/if}

<style>
	.btn-base {
		background: #1A1A1A;
		border: 1px solid #2A2A2A;
		border-radius: 0.75rem;
		padding: 0.75rem 1.5rem;
		font-size: 0.75rem;
		box-shadow: 0 0 20px 3px rgba(217, 184, 106, 0.35);
		transition: all 0.3s;
		cursor: pointer;
	}

	.btn-base:hover {
		box-shadow: 0 0 30px 6px rgba(217, 184, 106, 0.75);
	}
</style>
