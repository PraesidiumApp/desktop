<script lang="ts">
    import { appState } from "$lib/state/app.svelte";

	const labels = appState.settings.locale.labels;
</script>

{#if appState.vault.open}
<div>
	<h1>Dashboard vault open TODO</h1>
</div>
{:else}
<div class="flex flex-col h-full justify-center items-center text-4xl">
	<p>
		<button class="cursor-pointer font-bold underline">
			{labels.overview.unopened.create_vault}
		</button>
	</p>
	<p>
		{labels.overview.unopened.or}
	</p>
	<p>
		<button class="cursor-pointer font-bold underline">
			{labels.overview.unopened.open_vault}
		</button>
	</p>
</div>
{/if}