<script lang="ts">
	import { appState, localeState } from "$lib/state/app.svelte";
</script>

<div class="m-2 text-center flex flex-col gap-2 items-center justify-center h-full text-3xl">
	<h1>
		Praesidium Desktop - {localeState.labels.metadata.version} {appState.metadata.version} - {localeState.labels.metadata.commit} {appState.metadata.commit}
	</h1>
	<button onclick={() => appState.about.openLicenses()} class="cursor-pointer font-bold underline">
		{localeState.labels.about.viewsoftwarelicenses}
	</button>
</div>
