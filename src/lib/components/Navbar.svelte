<script lang="ts">
	import { localeState } from "$lib/state/locale.svelte";
	import { themeState } from "$lib/state/theme.svelte";
</script>

<nav class="fixed top-5 left-0 w-full h-[15vh] flex justify-center">
	<div class="h-full p-5 max-w-7xl bg-(--dock-bg) dark:bg-(--dock-bg-dark) border-(--dock-border) dark:border-(--dock-border-dark) backdrop-blur-lg shadow-(--dock-shadow) dark:shadow-(--dock-shadow) rounded-2xl flex gap-5 items-center">
		<div class="h-full">
			<img alt="Praesidium logo" src="/imgs/praesidium-{themeState.theme}.png" class="aspect-square h-full w-auto">
		</div>
		<ul class="flex flex-row gap-5 items-center">
			<li>
				<a href="/vault">
					{localeState.labels.components.navbar.vault}
				</a>
			</li>
			<li>
				<a href="/generator">
					{localeState.labels.components.navbar.generator}
				</a>
			</li>
			<li>
				<a href="/about">
					{localeState.labels.components.navbar.about}
				</a>
			</li>
		</ul>
		<div class="h-full flex gap-2">
			<button title="Open Praesidium's GitHub" class="h-full">
				<img alt="GitHub logo" src="/imgs/github-{themeState.theme}.svg" class="aspect-square h-full w-auto">
			</button>
			<button title="Toggle app theme" class="h-full">
				<img alt="App theme toggler" src="/imgs/colortheme-{themeState.theme}.svg" class="aspect-square h-full w-auto">
			</button>
		</div>
	</div>
</nav>