<script lang="ts">
    import { themeState } from "$lib/state/theme.svelte";
    import { toasterState } from "$lib/state/toaster.svelte";
    import { slide } from "svelte/transition";

	const borderColors = {
		info: "border-blue-700",
		warning: "border-amber-700",
		error: "border-red-700",
	};
</script>

<div class="fixed bottom-5 right-5 flex flex-col-reverse gap-2 max-w-[30vw]">
	{#each toasterState.queue as toast}
		<div class="flex flex-row items-center justify-center {borderColors[toast.kind]} border-2 rounded-2xl p-10 relative" transition:slide>
			<p class="text-xl text-center">
				{toast.message}
			</p>
			<button title="Dismiss" onclick={() => toasterState.remove(toast.id)} class="h-8 cursor-pointer absolute top-2 right-2">
				<img alt="Close icon" src="/imgs/close-{themeState.theme}.svg" class="aspect-square h-full w-auto">
			</button>
		</div>
	{/each}
</div>
