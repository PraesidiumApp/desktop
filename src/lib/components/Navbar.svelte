<script lang="ts">
	import { localeState } from "$lib/state/locale.svelte";
	import { themeState } from "$lib/state/theme.svelte";
    import { toasterState } from "$lib/state/toaster.svelte";
	import { openUrl } from "@tauri-apps/plugin-opener";
	import { page } from "$app/state";

	function toggleTheme() {
		themeState.theme = themeState.theme === "light" ? "dark" : "light";
	}

	async function openGithub() {
		await openUrl("https://github.com/PraesidiumApp");
		toasterState.add("info", localeState.labels.components.toaster.github_opening);
	}

	function isActive(path: string): boolean {
		if (path === "/") {
			return page.url.pathname === "/";
		}
		return page.url.pathname.startsWith(path);
	}
</script>

<nav class="fixed top-5 left-0 w-full h-30 flex justify-center">
	<div class="h-full w-[95vw] max-w-300 p-5 bg-(--dock-bg) dark:bg-(--dock-bg-dark) border-(--dock-border) dark:border-(--dock-border-dark) shadow-(--dock-shadow) dark:shadow-(--dock-shadow-dark) rounded-2xl border-2 flex flex-row gap-10 items-center justify-between">
		<div class="h-full">
			<a href="/" class="h-full cursor-pointer">
				<img alt="Praesidium logo" src="/imgs/praesidium-{themeState.theme}.png" class="aspect-square h-full w-auto">
			</a>
		</div>
		<div>
			<ul class="flex flex-row gap-10 font-bold text-4xl">
				<li>
					<a href="/" class="{isActive("/") ? "underline" : "text-(--text-muted) dark:text-(--text-muted-dark)"} underline-offset-5 hover:scale-110 transition-all duration-1000 ease-out hover:drop-shadow-[0_0_20px_rgba(0,0,0,0.8)] dark:hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] block">
						{localeState.labels.components.navbar.vault}
					</a>
				</li>
				<li>
					<a href="/generator" class="{isActive("/generator") ? "underline" : "text-(--text-muted) dark:text-(--text-muted-dark)"} underline-offset-5 hover:scale-110 transition-all duration-1000 ease-out hover:drop-shadow-[0_0_20px_rgba(0,0,0,0.8)] dark:hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] block">
						{localeState.labels.components.navbar.generator}
					</a>
				</li>
				<li>
					<a href="/about" class="{isActive("/about") ? "underline" : "text-(--text-muted) dark:text-(--text-muted-dark)"} underline-offset-5 hover:scale-110 transition-all duration-1000 ease-out hover:drop-shadow-[0_0_20px_rgba(0,0,0,0.8)] dark:hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] block">
						{localeState.labels.components.navbar.about}
					</a>
				</li>
			</ul>
		</div>
		<div class="h-[70%] flex flex-row gap-5">
			<button title="Open Praesidium's GitHub" class="h-full cursor-pointer" onclick={openGithub}>
				<img alt="GitHub logo" src="/imgs/github-{themeState.theme}.svg" class="aspect-square h-full w-auto">
			</button>
			<button title="Toggle app theme" class="h-full cursor-pointer" onclick={toggleTheme}>
				<img alt="App theme toggler" src="/imgs/colortheme-{themeState.theme}.svg" class="aspect-square h-full w-auto">
			</button>
			<select bind:value={
				() => localeState.locale,
				(locale) => localeState.set(locale)
			} class="appearance-none p-3 border-(--dock-border) dark:border-(--dock-border-dark) rounded-xl border-2 text-center">
				<option value="en">
					{localeState.labels.components.navbar.english} 🇺🇸
				</option>
				<option value="es">
					{localeState.labels.components.navbar.spanish} 🇪🇸
				</option>
			</select>
		</div>
	</div>
</nav>
