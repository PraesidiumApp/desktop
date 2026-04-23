<script lang="ts">
    import { themeState } from "$lib/state/theme.svelte";
    import { toasterState } from "$lib/state/toaster.svelte";
    import { fade, slide } from "svelte/transition";

	const borderColors = {
		info: "border-blue-700",
		warning: "border-amber-700",
		error: "border-red-700",
	};
</script>

<div class="fixed bottom-5 right-5 flex flex-col gap-2 max-w-[30vw]">
	{#each toasterState.queue as toast (toast.id)}
		<div class="flex flex-col items-center justify-center bg-(--dock-bg) dark:bg-(--dock-bg-dark) {borderColors[toast.kind]} border-2 rounded-2xl p-10 relative backdrop-blur-sm" in:slide out:fade>
			<p class="text-xl text-center">
				{toast.message}
			</p>
			<p class="text-xl text-center">
				{toast.extra}
			</p>
			<button title="Dismiss" onclick={() => toasterState.remove(toast.id)} class="h-8 cursor-pointer absolute top-2 right-2">
				<img alt="Close icon" src="/imgs/close-{themeState.theme}.svg" class="aspect-square h-full w-auto">
			</button>
		</div>
	{/each}
</div>
