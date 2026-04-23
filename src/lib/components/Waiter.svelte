<script lang="ts">
    import { themeState } from "$lib/state/theme.svelte";
</script>

<div class="fixed top-0 left-0 min-h-screen min-w-screen flex flex-col justify-center items-center bg-(--dock-bg) dark:bg-(--dock-bg-dark) backdrop-blur-sm">
	<img alt="Loading icon" src="/imgs/loading-{themeState.theme}.svg" class="aspect-square h-full w-auto">
</div>