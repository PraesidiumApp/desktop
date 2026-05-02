<script lang="ts">
    import { localeState } from "$lib/state/locale.svelte";
    import { toasterState } from "$lib/state/toaster.svelte";
    import { openUrl } from "@tauri-apps/plugin-opener";

	async function openLicense() {
		await openUrl("https://github.com/PraesidiumApp/desktop/blob/master/LICENSE");
		toasterState.add("info", "license_opened");
	}
</script>

<div class="flex flex-col pt-40 w-full grow items-center justify-center pb-5 text-4xl gap-5">
	<p class="font-bold">
		{localeState.labels.pages.about.app_title}
	</p>
	<p>
		{localeState.labels.pages.about.by_author}
	</p>
	<p>
		{localeState.labels.pages.about.licensed_under}
		<button class="cursor-pointer rounded-2xl border-2 bg-(--dock-bg) dark:bg-(--dock-bg-dark) border-(--dock-border) dark:border-(--dock-border-dark) p-2" onclick={openLicense}>
			BSD-3-Clause
		</button>
	</p>
</div>