<script lang="ts">
    import { appState } from "$lib/state/app.svelte";
</script>

{#if !appState.vault.isOpen}
<div class="flex flex-col h-full justify-center items-center text-4xl">
	<p>
		<button class="cursor-pointer font-bold underline">
			Open
		</button>
		a vault to get started
	</p>
	<p>
		OR
	</p>
	<p>
		<button class="cursor-pointer font-bold underline">
			Create
		</button>
		a new one
	</p>
</div>
{/if}