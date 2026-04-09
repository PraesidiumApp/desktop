<script lang="ts">
    import { appState, localeState } from "$lib/state/app.svelte";
</script>

<div class="flex flex-col h-full justify-center items-center text-4xl">
	<p>
		<button class="cursor-pointer font-bold underline">
			{localeState.labels.overview.unopened.create_vault}
		</button>
	</p>
	<p>
		{localeState.labels.overview.unopened.or}
	</p>
	<p>
		<button class="cursor-pointer font-bold underline">
			{localeState.labels.overview.unopened.open_vault}
		</button>
	</p>
</div>
