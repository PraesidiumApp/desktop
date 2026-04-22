<script lang="ts">
	// Import Tailwind CSS, delegate to Vite
	import "../app.css";

	import Navbar from "$lib/components/Navbar.svelte";
    import Toaster from "$lib/components/Toaster.svelte";

	const { children } = $props();
</script>

<div class="min-h-screen bg-(--app-bg) dark:bg-(--app-bg-dark) text-(--text-main) dark:text-(--text-main-dark) font-[LeagueSpartan] transition-all duration-1000 ease-out">
	<Navbar></Navbar>
	{@render children()}
	<Toaster></Toaster>
</div>