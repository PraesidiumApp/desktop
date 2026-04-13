<script lang="ts">
    import { appState, localeState } from "$lib/state/app.svelte";
</script>

<div class="flex flex-col h-full text-center items-center justify-center text-4xl p-2">
	{#if !appState.session.readyNew && !appState.session.readyExisting}
		<button onclick={() => appState.session.readyNew = true} class="font-bold cursor-pointer underline">
			{localeState.labels.overview.unopened.create_vault}
		</button>
		<p>
			{localeState.labels.overview.unopened.or}
		</p>
		<button onclick={() => appState.session.readyExisting = true} class="font-bold cursor-pointer underline">
			{localeState.labels.overview.unopened.open_vault}
		</button>
	{:else if appState.session.readyNew}
		<p>
			{localeState.labels.overview.unopened.newvaultpath}
		</p>
		<p class="text-xl">
			{appState.session.path}
		</p>
		<button onclick={() => appState.session.saveToDialog()} class="cursor-pointer font-bold underline">
			{localeState.labels.overview.unopened.select}
		</button>
		<button onclick={() => appState.session.reset()} class="cursor-pointer font-bold underline">
			{localeState.labels.overview.unopened.cancel}
		</button>
	{:else if appState.session.readyExisting}
		<p>
			{localeState.labels.overview.unopened.existingvaultpath}
		</p>
		<p class="text-xl">
			{appState.session.path}
		</p>
		<button onclick={() => appState.session.openDialog()} class="cursor-pointer font-bold underline">
			{localeState.labels.overview.unopened.select}
		</button>
		<button onclick={() => appState.session.reset()} class="cursor-pointer font-bold underline">
			{localeState.labels.overview.unopened.cancel}
		</button>
	{/if}
</div>
