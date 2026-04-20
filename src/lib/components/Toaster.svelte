<script lang="ts">
    import { toasterState } from "$lib/state/toaster.svelte";

	const colors = {
		info: "bg-blue-500 border-blue-700",
		warning: "bg-amber-500 border-amber-700",
		error: "bg-red-500 border-red-700 dark:bg-zinc-800 dark:border-zinc-700",
	};
</script>

<div class="fixed bottom-5 right-5 flex flex-col-reverse">
	{#each toasterState.queue as toast}
		<div class="{colors[toast.kind]}">
			<p>
				{toast.message}
			</p>
			<button title="Dismiss" onclick={() => toasterState.remove(toast.id)}>
			</button>
		</div>
	{/each}
</div>
