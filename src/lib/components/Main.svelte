<script lang="ts">
	import { appState } from "$lib/state/app.svelte";

	// Receive child components to render from +layout.svelte
	const { children } = $props();
</script>

<div class="w-4/5 flex flex-col bg-(--light-scheme-2) dark:bg-(--dark-scheme-2)">
	<!-- Top bar -->
	<header class="bg-(--light-scheme-1) dark:bg-(--dark-scheme-1)">
		<h1 class="text-center font-bold text-xl">
			Praesidium Desktop {appState.currentMenu.name}
		</h1>
	</header>
	<!-- Content area -->
	<main class="flex-1">
		{@render children()}
	</main>
	<!-- Footer -->
	<footer class="text-center font-bold text-lg">
		Version {appState.version} | Commit {appState.commit}
	</footer>
</div>