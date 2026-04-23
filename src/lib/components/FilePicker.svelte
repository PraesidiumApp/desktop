<script lang="ts">
    import { localeState } from "$lib/state/locale.svelte";
    import { themeState } from "$lib/state/theme.svelte";

	interface Props {
		pickerType: "new" | "open"
	}

	const { pickerType }: Props = $props();

	function getSelectLabel(): string {
		if (pickerType === "new") {
			return localeState.labels.components.file_picker.select_location_new_vault;
		} else {
			return localeState.labels.components.file_picker.select_location_existing_vault;
		}
	}

	let filePath = $state(getSelectLabel());
	let filePathTouched = $state(false);

	// The $derived.by() rune can't be applied on this case because we need to handle filePath staying the same if the locale changes but the user has touched it, with $derived.by() filePath would become undefined so the user's file path would be erased on locale change
	$effect(() => {
		if (!filePathTouched) {
			filePath = getSelectLabel();
		}
	});
</script>

<div class="flex flex-row rounded-2xl border-2 bg-(--dock-bg) dark:bg-(--dock-bg-dark) border-(--dock-border) dark:border-(--dock-border-dark) p-2 gap-5">
	<input bind:value={
		() => filePath,
		(path) => {
			filePathTouched = true;
			filePath = path;
		}
	} class="text-xl text-(--text-muted) dark:text-(--text-muted-dark) w-100">
	<button class="flex flex-row cursor-pointer h-10">
		<p class="flex flex-row font-bold justify-center items-center">
			{localeState.labels.components.file_picker.select}
		</p>
		<img alt="Folder icon" src="/imgs/folder-{themeState.theme}.svg" class="aspect-square h-full w-auto">
	</button>
</div>