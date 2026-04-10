<script lang="ts">
	import { appState, localeState } from "$lib/state/app.svelte";
</script>

<div class="flex flex-col h-full m-2 gap-2 justify-center items-center">
	<div class="bg-(--light-scheme-3) dark:bg-(--dark-scheme-3) 
	rounded-xl flex flex-row w-fit p-2 gap-2">
		<p>
			{localeState.labels.settings.colortheme.colortheme}
		</p>
		<select bind:value={appState.settings.theme.theme}>
			<option value="light">
				{localeState.labels.settings.colortheme.light}
			</option>
			<option value="dark">
				{localeState.labels.settings.colortheme.dark}
			</option>
		</select>
	</div>
	<div class="bg-(--light-scheme-3) dark:bg-(--dark-scheme-3) 
	rounded-xl flex flex-row w-fit p-2 gap-2">
		<p>
			{localeState.labels.settings.language.language}
		</p>
		<select bind:value={appState.settings.locale.locale}>
			<option value="en">
				{localeState.labels.settings.language.english}
			</option>
			<option value="es">
				{localeState.labels.settings.language.spanish}
			</option>
		</select>
	</div>
</div>