<script lang="ts">
    import { appState, localeState } from "$lib/state/app.svelte";
	import { available } from "$lib/state/navigation.svelte";
</script>

{#if appState.session.active}
	<div class="flex flex-col h-full p-2 text-4xl">
		<div class="flex-1">
			{localeState.labels.overview.opened.summary} {appState.session.basename}
		</div>

		<div class="flex flex-row justify-between">
			<button onclick={() => 1 +1} class="cursor-pointer font-bold underline">
				{localeState.labels.overview.opened.close}
			</button>
			<a href={available.find((menuItem) => menuItem.name === "Vault")!.href} class="cursor-pointer font-bold underline">
				{localeState.labels.overview.opened.manage}
			</a>
		</div>
	</div>
{:else}
	<div class="flex flex-col h-full text-center items-center justify-center text-4xl p-2 gap-5">
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
			<p>
				{localeState.labels.overview.unopened.withpassword}
			</p>
			<input type="text" bind:value={appState.session.password} placeholder={localeState.labels.overview.unopened.writepasswordhere} class="text-center">
			<div class="flex flex-row gap-10 mt-10">
				<button onclick={() => appState.session.reset()} class="cursor-pointer font-bold underline">
					{localeState.labels.overview.unopened.cancel}
				</button>
				<button onclick={() => appState.session.saveToDialog()} class="cursor-pointer font-bold underline">
					{localeState.labels.overview.unopened.select}
				</button>
				<button onclick={() => appState.session.newSession()} class="cursor-pointer font-bold underline">
					{localeState.labels.overview.unopened.continue}
				</button>
			</div>
			{#if appState.session.loading}
				<p class="text-green-600">
					{localeState.labels.overview.unopened.creatingvault}
				</p>
			{/if}
			{#if appState.session.errorMessage}
				<p class="text-red-600">
					{appState.session.errorMessage}
				</p>
			{/if}
		{:else if appState.session.readyExisting}
			<p>
				{localeState.labels.overview.unopened.existingvaultpath}
			</p>
			<p class="text-xl">
				{appState.session.path}
			</p>
			<p>
				{localeState.labels.overview.unopened.withpassword}
			</p>
			<input type="text" bind:value={appState.session.password} placeholder={localeState.labels.overview.unopened.writepasswordhere} class="text-center">
			<div class="flex flex-row gap-10 mt-10">
				<button onclick={() => appState.session.reset()} class="cursor-pointer font-bold underline">
					{localeState.labels.overview.unopened.cancel}
				</button>
				<button onclick={() => appState.session.openDialog()} class="cursor-pointer font-bold underline">
					{localeState.labels.overview.unopened.select}
				</button>
				<button class="cursor-pointer font-bold underline">
					{localeState.labels.overview.unopened.continue}
				</button>
			</div>
			{#if appState.session.loading}
				<p class="text-green-600">
					{localeState.labels.overview.unopened.openingvault}
				</p>
			{/if}
			{#if appState.session.errorMessage}
				<p class="text-red-600">
					{appState.session.errorMessage}
				</p>
			{/if}
		{/if}
	</div>
{/if}