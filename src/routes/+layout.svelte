<script lang="ts">
	// Import Tailwind CSS, delegate to Vite
	import "../app.css";

	import Navbar from "$lib/components/Navbar.svelte";

	import { localeState } from "$lib/state/locale.svelte";

	const { children } = $props();
</script>

<div>
	<Navbar></Navbar>
	{@render children()}
</div>