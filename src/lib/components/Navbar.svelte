<script lang="ts">
	import { localeState } from "$lib/state/locale.svelte";
	import { themeState } from "$lib/state/theme.svelte";
	import { openUrl } from "@tauri-apps/plugin-opener";

	function toggleTheme() {
		themeState.theme === "light" ? themeState.theme = "dark" : themeState.theme = "light";
	}

	function openGithub() {
		openUrl("https://github.com/PraesidiumApp");
	}
</script>

<nav class="fixed top-5 left-0 w-full h-30 flex justify-center">
	<div class="h-full w-[80vw] p-5 bg-(--dock-bg) dark:bg-(--dock-bg-dark) border-(--dock-border) dark:border-(--dock-border-dark) backdrop-blur-lg shadow-(--dock-shadow) dark:shadow-(--dock-shadow-dark) rounded-2xl border-2 flex flex-row gap-10 items-center justify-between">
		<div class="h-full">
			<a href="/" class="h-full cursor-pointer">
				<img alt="Praesidium logo" src="/imgs/praesidium-{themeState.theme}.png" class="aspect-square h-full w-auto">
			</a>
		</div>
		<div>
			<ul class="flex flex-row gap-10 font-bold text-4xl">
				<li>
					<a href="/">
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
		</div>
		<div class="h-1/2 flex flex-row gap-5">
			<button title="Open Praesidium's GitHub" class="h-full cursor-pointer" onclick={openGithub}>
				<img alt="GitHub logo" src="/imgs/github-{themeState.theme}.svg" class="aspect-square h-full w-auto">
			</button>
			<button title="Toggle app theme" class="h-full cursor-pointer" onclick={toggleTheme}>
				<img alt="App theme toggler" src="/imgs/colortheme-{themeState.theme}.svg" class="aspect-square h-full w-auto">
			</button>
		</div>
	</div>
</nav>
