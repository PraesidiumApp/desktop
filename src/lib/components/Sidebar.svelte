<script lang="ts">
	import { appState } from "$lib/state/app.svelte";

	const labels = appState.settings.locale.labels;
</script>

<aside class="w-1/5 p-2 flex flex-col">
	<!-- App logo -->
	<div class="aspect-square">
		<a href="/">
			<img alt="App logo"
				src={`/imgs/app/logo_
				${appState.settings.theme.current === "light" ? "black" : "white"}.png`}
			>
		</a>
	</div>
	<!-- Menu -->
	<nav class="flex flex-col flex-1 gap-2 justify-center my-5">
		{#each appState.navigation.available as item}
			<a href={item.href} class="text-center text-2xl
				{appState.navigation.current === item ? "font-bold" : ""}
				"
			>
				{labels.navigation[item.name.toLowerCase() as keyof typeof labels.navigation]}
			</a>
		{/each}
	</nav>
	<!-- App version and commit -->
	<div>
		<p class="text-center font-bold text-2xl">
			{labels.metadata.version} {appState.metadata.version}
		</p>
	</div>
</aside>