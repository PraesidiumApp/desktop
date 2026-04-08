<script lang="ts">
	// Import Tailwind CSS, delegate to Vite
	import "../app.css";

    import Sidebar from "$lib/components/Sidebar.svelte";
    import Main from "$lib/components/Main.svelte";

	// Get child components (+page.svelte)
	const { children } = $props();

	/* Disable default context menu
	const preventDefaultContextMenu = (event: MouseEvent) => {
		event.preventDefault();
	};
	
	window.addEventListener("contextmenu", preventDefaultContextMenu);
	*/
</script>

<div class="flex flex-row min-h-screen font-[LeagueSpartan]
	text-black dark:text-white
	bg-(--light-scheme-1) dark:bg-(--dark-scheme-1)
	overflow-auto
	"
>
	<!-- 20% horizontal width -->
	<Sidebar />
	<!-- 80% horizontal width -->
	<Main {children} />
</div>