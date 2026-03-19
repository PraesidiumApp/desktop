<script lang="ts">
	import { appState } from "$lib/state/app.svelte";
</script>

<aside class="w-1/5 p-5 flex flex-col">
	<!-- App logo -->
	<div>
		<a href="/">
			<img alt="App logo"
				src={`/imgs/app/logo_
				${appState.theme === "light" ? "black" : "white"}.png`}
			>
		</a>
	</div>
	<!-- Menu -->
	<nav class="mt-5 flex flex-col flex-1">
		{#each appState.menu as item}
			<a href={item.href} class="text-center text-lg
				{appState.currentMenu === item ? "font-bold" : ""}
				"
			>
				{item.name}
			</a>
		{/each}
	</nav>
	<!-- Bottom icons -->
	<div class="flex flex-row">
		<a href="https://github.com/PraesidiumApp">
			<img alt="GitHub logo"
				src={`/imgs/github/GitHub_Invertocat_
				${appState.theme === "light" ? "Black" : "White"}.png`}
			>
		</a>
		<button onclick={() => appState.toggleTheme()} class="cursor-pointer">
			<img alt="Toggle theme" 
				src={`/imgs/theme/toggle-
				${appState.theme === "light" ? "black" : "white"}.png`}
			>
		</button>
	</div>
</aside>