<script lang="ts">
	// Import Tailwind CSS, delegate to Vite
	import "../app.css";

	import Navbar from "$lib/components/Navbar.svelte";
    import Toaster from "$lib/components/Toaster.svelte";

	const { children } = $props();
</script>

<main class="bg-(--app-bg) dark:bg-(--app-bg-dark) text-(--text-main) dark:text-(--text-main-dark) font-[LeagueSpartan] flex flex-col min-h-screen transition-all duration-1000 ease-out">
	<Navbar></Navbar>
	{@render children()}
	<Toaster></Toaster>
</main>