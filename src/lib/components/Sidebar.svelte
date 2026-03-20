<script lang="ts">
	import { appState } from "$lib/state/app.svelte";
</script>

<aside class="w-1/5 p-2 flex flex-col">
	<!-- App logo -->
	<div class="aspect-square">
		<a href="/">
			<img alt="App logo"
				src={`/imgs/app/logo_
				${appState.theme === "light" ? "black" : "white"}.png`}
			>
		</a>
	</div>
	<!-- Menu -->
	<nav class="flex flex-col flex-1 gap-2 justify-center my-5">
		{#each appState.menu as item}
			<a href={item.href} class="text-center text-2xl
				{appState.currentMenu === item ? "font-bold" : ""}
				"
			>
				{item.name}
			</a>
		{/each}
	</nav>
	<!-- App version and commit -->
	<div class="mb-5">
		<p class="text-center font-bold text-lg">
			Version {appState.version}<br>
			Commit {appState.commit}
		</p>
	</div>
	<!-- Bottom icons -->
	<div class="flex flex-row gap-5">
		<button onclick={() => appState.openGithub()} class="cursor-pointer flex-1 aspect-square">
			<img alt="GitHub logo"
				src={`/imgs/github/GitHub_Invertocat_
				${appState.theme === "light" ? "Black" : "White"}.png`}
			>
		</button>
		<button onclick={() => appState.showInfo()} class="cursor-pointer flex-1 aspect-square">
			<img alt="About"
				src={`/imgs/info/info-
				${appState.theme === "light" ? "black" : "white"}.png`}
			>
		</button>
		<button onclick={() => appState.toggleTheme()} class="cursor-pointer flex-1 aspect-square">
			<img alt="Toggle theme" 
				src={`/imgs/theme/toggle-
				${appState.theme === "light" ? "black" : "white"}.png`}
			>
		</button>
	</div>
</aside>