<script lang="ts">
	import { appState } from "$lib/state/app.svelte";

	// Receive child components to render from +layout.svelte
	const { children } = $props();
</script>

<div class="w-4/5 flex flex-col p-2">
	<!-- Top bar -->
	<header>
		<h1 class="text-center font-bold text-2xl">
			Praesidium Desktop - {appState.currentMenu.name}
		</h1>
	</header>
	<!-- Content area -->
	<main class="flex-1 bg-(--light-scheme-2) dark:bg-(--dark-scheme-2)">
		{@render children()}
	</main>
</div>