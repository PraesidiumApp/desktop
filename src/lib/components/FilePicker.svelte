<script lang="ts">
    import { localeState } from "$lib/state/locale.svelte";
    import { themeState } from "$lib/state/theme.svelte";
    import { waiterState } from "$lib/state/waiter.svelte";
	import { open, save } from "@tauri-apps/plugin-dialog";
	import { invoke } from "@tauri-apps/api/core";
    import { slide } from "svelte/transition";
    import { toasterState } from "$lib/state/toaster.svelte";
    import { sessionState } from "$lib/state/session.svelte";

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

	async function pathDialog(): Promise<string | null> {
		if (pickerType === "new") {
			return await save({
				defaultPath: ".prsd",
				filters: [
					{
						extensions: ["prsd"],
						name: localeState.labels.components.file_picker.dialog_filter_name
					}
				],
				title: localeState.labels.components.file_picker.dialog_window_title_create
			});
		} else {
			return await open({
				defaultPath: ".prsd",
				directory: false,
				filters: [
					{
						extensions: ["prsd"],
						name: localeState.labels.components.file_picker.dialog_filter_name
					}
				],
				multiple: false,
				title: localeState.labels.components.file_picker.dialog_window_title_open
			});
		}
	}

	async function selectPath() {
		// Block the UI while the dialog is active
		waiterState.message = localeState.labels.components.waiter.file_dialog;
		waiterState.active = true;
		let dialogPath = await pathDialog();
		waiterState.active = false;
		if (dialogPath) {
			filePathTouched = true;
			filePath = dialogPath;
		}
	}

	async function newSession() {
		// Block the UI while the session is created
		waiterState.message = localeState.labels.components.waiter.new_session;
		waiterState.active = true;
		try {
			await invoke("new_session");
			waiterState.active = false;
			sessionState.active = true;
		} catch (backendError) {
			waiterState.active = false;
			toasterState.add("error", "backend_error", backendError as string)
		}
	}

	let password = $state(localeState.labels.components.file_picker.write_password);
	let passwordTouched = $state(false);
	// The $derived.by() rune can't be applied on this case because we need to handle password staying the same if the locale changes but the user has touched it, with $derived.by() password would become undefined so the user's master password would be erased on locale change
	$effect(() => {
		if (!passwordTouched) {
			password = localeState.labels.components.file_picker.write_password;
		}
	});
</script>

<div class="flex flex-col gap-5 items-center w-180" in:slide>
	<div class="flex flex-row rounded-2xl border-2 bg-(--dock-bg) dark:bg-(--dock-bg-dark) border-(--dock-border) dark:border-(--dock-border-dark) p-2 gap-5 w-full">
		<input bind:value={
			() => filePath,
			(path) => {
				filePathTouched = true;
				filePath = path;
			}
		} class="text-xl text-(--text-muted) dark:text-(--text-muted-dark) grow" type="text">
		<button class="flex flex-row justify-center items-center cursor-pointer h-10 gap-2" onclick={() => selectPath()}>
			<p class="font-bold text-3xl">
				{localeState.labels.components.file_picker.select}
			</p>
			<img alt="Folder icon" src="/imgs/folder-{themeState.theme}.svg" class="aspect-square h-full w-auto">
		</button>
	</div>
	<div class="flex flex-row rounded-2xl border-2 bg-(--dock-bg) dark:bg-(--dock-bg-dark) border-(--dock-border) dark:border-(--dock-border-dark) p-2 gap-5 w-full h-15">
		<input bind:value={
			() => password,
			(passwd) => {
				passwordTouched = true;
				password = passwd;
			}
		} class="text-xl text-(--text-muted) dark:text-(--text-muted-dark) w-full" type="text">
	</div>
	<button class="flex flex-row justify-center items-center h-15 w-fit cursor-pointer gap-2" onclick={() => newSession()}>
		<p class="font-bold text-4xl">
			{localeState.labels.components.file_picker.continue}
		</p>
		<img alt="Continue icon" src="/imgs/continue-{themeState.theme}.svg" class="aspect-square h-full w-auto">
	</button>
</div>