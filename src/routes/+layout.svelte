<script lang="ts">
	// Import Tailwind CSS
	import "../app.css";

	// App menu
	const menuItems = [
		{ name: "Dashboard", href: "/" },
		{ name: "Vault", href: "/vault" },
		{ name: "Close", href: "/close" },
		{ name: "About", href: "/about" },
	]

	// Get current page
	import { page } from "$app/state";
	const currentMenu = $derived(
		menuItems.find(item => item.href === page.url.pathname) !
	);

	let { children } = $props();
</script>

<div class="flex h-screen">
	<!-- Sidebar 20% horizontal width -->
	<aside class="w-1/5 p-10">
		<div>
			<a href="/">
				<img src="/imgs/logo_whitebg_cropped_1610x1610.png" alt="Praesidium logo">
			</a>
		</div>
		<nav class="mt-5 flex flex-col">
			{#each menuItems as item}
				<a href={item.href} class="text-center">
					{item.name}
				</a>
			{/each}
		</nav>
	</aside>
	<!-- Main area 80% horizontal width -->
	<div class="w-4/5">
		<!-- Top bar -->
		<header>
			<h1>Praesidium Desktop - {currentMenu.name}</h1>
		</header>
		<!-- Content area -->
		<main>
			{@render children()}
		</main>
		<!-- Footer -->
		<footer>

		</footer>
	</div>
</div>