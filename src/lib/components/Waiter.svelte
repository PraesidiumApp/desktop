<script lang="ts">
    import { themeState } from "$lib/state/theme.svelte";
    import { waiterState } from "$lib/state/waiter.svelte";
    import { fade } from "svelte/transition";
</script>

<div class="fixed top-0 left-0 min-h-screen min-w-screen flex flex-col justify-center items-center bg-(--dock-bg) dark:bg-(--dock-bg-dark) backdrop-blur-sm" in:fade out:fade>
	<img alt="Loading icon" src="/imgs/loading-{themeState.theme}.svg" class="aspect-square h-full w-auto">
	<p class="text-3xl">
		{waiterState.message}
	</p>
</div>