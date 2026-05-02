<script lang="ts">
    import { localeState } from "$lib/state/locale.svelte";
	import FilePicker from "$lib/components/FilePicker.svelte";
    import { sessionState, type RawSessionItem, type SessionItem } from "$lib/state/session.svelte";
	import { invoke } from "@tauri-apps/api/core"
    import { toasterState } from "$lib/state/toaster.svelte";
    import { slide } from "svelte/transition";

	let filePickerReady = $state(false);
	let newOrOpenChoice: "new" | "open" = $state("new");

	async function closeSession() {
		try {
			await invoke("close");
			newItem = resetNewItem();
			newItemActive = false;
			editItem = resetEditItem();
			editItemActive = false;
			sessionState.active = false;
			toasterState.add("info", "session_closed");
		} catch (backendError) {
			toasterState.add("error", "backend_error", backendError as string);
		}
	}

	function getNewItemLabelLabel(): string {
		return localeState.labels.pages.vault.label_for_new_item;
	}

	function getNewItemContentsLabel(): string {
		return localeState.labels.pages.vault.contents_for_new_item;
	}

	let newItemActive = $state(false);
	let newItemLabelTouched = $state(false);
	let newItemContentsTouched = $state(false);
	let newItem: SessionItem = $state({
		id: -1,
		label: getNewItemLabelLabel(),
		kind: "user-password",
		payload: getNewItemContentsLabel()
	});

	function resetNewItem(): SessionItem {
		return {
			id: -1,
			label: getNewItemLabelLabel(),
			kind: "user-password",
			payload: getNewItemContentsLabel()
		};
	}

	let editItemActive = $state(false);
	let editItem: SessionItem = $state({
		id: -1,
		label: "",
		kind: "",
		payload: ""
	})

	function resetEditItem(): SessionItem {
		return {
			id: -1,
			label: "",
			kind: "",
			payload: ""
		}
	}

	async function commitNewItem(item: SessionItem) {
		if (item.id < 1) {
			toasterState.add("warning", "new_item_id_below_1", `(${item.id})`);
			return;
		}
		try {
			if (await invoke("exists", {id: item.id} )) {
				toasterState.add("error", "new_item_id_exists", `(${item.id})`);
				return;
			}
		} catch (backendError) {
			toasterState.add("error", "backend_error", backendError as string);
			return;
		}
		try {
			let encoder = new TextEncoder();
			let rawItem: RawSessionItem = {
				...item,
				payload: [...encoder.encode(item.payload)]
			}
			await invoke("save_item", { newItem: rawItem });
			newItem = resetNewItem();
			newItemActive = false;
			newItemLabelTouched = false;
			newItemContentsTouched = false;
			await sessionState.fetchItems();
			toasterState.add("info", "new_item_added", `${item.id}`);
		} catch (backendError) {
			toasterState.add("error", "backend_error", backendError as string);
		}
	}

	async function commitEditItem(item: SessionItem) {
		try {
			let encoder = new TextEncoder();
			let rawItem: RawSessionItem = {
				...item,
				payload: [...encoder.encode(item.payload)]
			}
			await invoke("save_item", { newItem: rawItem });
			editItemActive = false;
			await sessionState.fetchItems();
			toasterState.add("info", "item_updated", `${item.id}`);
		} catch (backendError) {
			toasterState.add("error", "backend_error", backendError as string);
		}
	}

	async function dropItem(id: number) {
		try {
			await invoke("drop_item", { id: id });
			await sessionState.fetchItems();
			toasterState.add("info", "item_deleted", `${id}`);
		} catch (backendError) {
			toasterState.add("error", "backend_error", backendError as string);
		}
	}

	// The $derived.by() rune can't be applied on this case because we need to handle newItem[any] staying the same if the locale changes but the user has touched it, with $derived.by() newItem[any] would become undefined so the user's input would be erased on locale change
	$effect(() => {
		if (!newItemLabelTouched) {
			newItem.label = getNewItemLabelLabel();
		}
		if (!newItemContentsTouched) {
			newItem.payload = getNewItemContentsLabel();
		}
	});
</script>

{#if sessionState.active}
	<div class="flex flex-col pt-40 w-full grow items-center pb-5">
		<div class="flex flex-col w-[95vw] max-w-300 text-4xl gap-5">
			<div class="flex flex-row justify-between items-center">
				<button class="cursor-pointer rounded-2xl border-2 bg-(--dock-bg) dark:bg-(--dock-bg-dark) border-(--dock-border) dark:border-(--dock-border-dark) p-2" onclick={async () => await closeSession()}>
					<p>
						{localeState.labels.pages.vault.close}
					</p>
				</button>
				<p>
					<span class="text-(--text-muted) dark:text-(--text-muted-dark)">
						{localeState.labels.pages.vault.vault}
					</span>
					<span>
						{sessionState.vaultName}
					</span>
				</p>
				<button class="cursor-pointer rounded-2xl border-2 bg-(--dock-bg) dark:bg-(--dock-bg-dark) border-(--dock-border) dark:border-(--dock-border-dark) p-2" onclick={() => newItemActive = true}>
					<p>
						{localeState.labels.pages.vault.create}
					</p>
				</button>
			</div>
			{#if newItemActive}
				<div class="flex flex-col rounded-2xl border-2 bg-(--dock-bg) dark:bg-(--dock-bg-dark) border-green-700 p-5 w-full" in:slide out:slide>
					<div class="flex flex-row justify-between items-center">
						<input bind:value={
							() => newItem.label,
							(newLabel) => {
								newItemLabelTouched = true;
								newItem.label = newLabel;
							}
						} class="font-bold p-2 border-(--dock-border) dark:border-(--dock-border-dark) rounded-xl border-2" type="text">
						<p class="flex flex-row items-center gap-5">
							<span class="text-(--text-muted) dark:text-(--text-muted-dark)">
								{localeState.labels.pages.vault.item_type}
							</span>
							<select bind:value={
								() => newItem.kind,
								(newType) => newItem.kind = newType
							} class="appearance-none p-2 border-(--dock-border) dark:border-(--dock-border-dark) rounded-xl border-2 text-center">
								<option value="user-password">
									{localeState.labels.pages.vault.password_type}
								</option>
								<option value="openssh-key">
									{localeState.labels.pages.vault.openssh_key_type}
								</option>
							</select>
							<span class="text-(--text-muted) dark:text-(--text-muted-dark) h-full">
								{localeState.labels.pages.vault.item_id}
							</span>
							<input bind:value={
								() => newItem.id,
								(newId) => newItem.id = newId
							} class="font-bold w-30 border-(--dock-border) dark:border-(--dock-border-dark) rounded-xl border-2 p-2" type="number">
						</p>
					</div>
					<div class="py-5">
						<textarea bind:value={
							() => newItem.payload,
							(newContents) => {
								newItemContentsTouched = true;
								newItem.payload = newContents;
							}
						} class="w-full min-h-5"></textarea>
					</div>
					<div class="flex flex-row justify-between">
						<button class="cursor-pointer rounded-2xl border-2 bg-(--dock-bg) dark:bg-(--dock-bg-dark) border-(--dock-border) dark:border-(--dock-border-dark) p-2" onclick={() => newItemActive = false}>
							<p>
								{localeState.labels.pages.vault.cancel}
							</p>
						</button>
						<button class="cursor-pointer rounded-2xl border-2 bg-(--dock-bg) dark:bg-(--dock-bg-dark) border-(--dock-border) dark:border-(--dock-border-dark) p-2" onclick={async () => await commitNewItem(newItem)}>
							<p>
								{localeState.labels.pages.vault.update_item}
							</p>
						</button>
					</div>
				</div>
			{/if}
			{#if editItemActive}
				<div class="flex flex-col rounded-2xl border-2 bg-(--dock-bg) dark:bg-(--dock-bg-dark) border-amber-700 p-5 w-full" in:slide out:slide>
					<div class="flex flex-row justify-between items-center">
						<input bind:value={editItem.label} class="font-bold p-2 border-(--dock-border) dark:border-(--dock-border-dark) rounded-xl border-2" type="text">
						<p class="flex flex-row items-center gap-5">
							<span class="text-(--text-muted) dark:text-(--text-muted-dark)">
								{localeState.labels.pages.vault.item_type}
							</span>
							<select bind:value={editItem.kind} class="appearance-none p-2 border-(--dock-border) dark:border-(--dock-border-dark) rounded-xl border-2 text-center">
								<option value="user-password">
									{localeState.labels.pages.vault.password_type}
								</option>
								<option value="openssh-key">
									{localeState.labels.pages.vault.openssh_key_type}
								</option>
							</select>
							<span class="font-bold">
								|
							</span>
							<span class="text-(--text-muted) dark:text-(--text-muted-dark) h-full">
								{localeState.labels.pages.vault.item_id}
							</span>
							<span>
								#{editItem.id}
							</span>
						</p>
					</div>
					<div class="py-5">
						<textarea bind:value={editItem.payload} class="w-full min-h-5"></textarea>
					</div>
					<div class="flex flex-row justify-between">
						<button class="cursor-pointer rounded-2xl border-2 bg-(--dock-bg) dark:bg-(--dock-bg-dark) border-(--dock-border) dark:border-(--dock-border-dark) p-2" onclick={() => editItemActive = false}>
							<p>
								{localeState.labels.pages.vault.cancel}
							</p>
						</button>
						<button class="cursor-pointer rounded-2xl border-2 bg-(--dock-bg) dark:bg-(--dock-bg-dark) border-(--dock-border) dark:border-(--dock-border-dark) p-2" onclick={async () => await commitEditItem(editItem)}>
							<p>
								{localeState.labels.pages.vault.update_item}
							</p>
						</button>
					</div>
				</div>
			{/if}
			{#each sessionState.items as item (item.id)}
				<div class="flex flex-col rounded-2xl border-2 bg-(--dock-bg) dark:bg-(--dock-bg-dark) border-(--dock-border) dark:border-(--dock-border-dark) p-5 w-full" in:slide out:slide>
					<div class="flex flex-row justify-between">
						<p class="font-bold">
							{item.label}
						</p>
						<p>
							<span class="text-(--text-muted) dark:text-(--text-muted-dark)">
								{localeState.labels.pages.vault.item_type}
							</span>
							<span>
								{item.kind}
							</span>
							<span class="font-bold">
								|
							</span>
							<span class="text-(--text-muted) dark:text-(--text-muted-dark)">
								{localeState.labels.pages.vault.item_id}
							</span>
							<span>
								#{item.id}
							</span>
						</p>
					</div>
					<div class="py-5">
						<p>
							{item.payload}
						</p>
					</div>
					<div class="flex flex-row justify-between">
						<button class="cursor-pointer rounded-2xl border-2 bg-(--dock-bg) dark:bg-(--dock-bg-dark) border-(--dock-border) dark:border-(--dock-border-dark) p-2" onclick={async () => await dropItem(item.id)}>
							<p>
								{localeState.labels.pages.vault.delete_item}
							</p>
						</button>
						<button class="cursor-pointer rounded-2xl border-2 bg-(--dock-bg) dark:bg-(--dock-bg-dark) border-(--dock-border) dark:border-(--dock-border-dark) p-2" onclick={() => {
							editItem = { ...item };
							editItemActive = true;
						}}>
							<p>
								{localeState.labels.pages.vault.update_item}
							</p>
						</button>
					</div>
				</div>
			{/each}
		</div>
	</div>
{:else}
	<div class="flex flex-col justify-center items-center pt-40 grow text-4xl gap-5">
		<div class="flex flex-col text-center gap-1">
			<p>
				{localeState.labels.pages.vault.do_you_want_to}
			</p>
			<p>
				<button class="cursor-pointer font-bold rounded-2xl border-2 bg-(--dock-bg) dark:bg-(--dock-bg-dark) border-(--dock-border) dark:border-(--dock-border-dark) p-2" onclick={() => {
					newOrOpenChoice = "new";
					filePickerReady = true;
				}}>
					{localeState.labels.pages.vault.create}
				</button>
				{localeState.labels.pages.vault.or}
				<button class="cursor-pointer font-bold rounded-2xl border-2 bg-(--dock-bg) dark:bg-(--dock-bg-dark) border-(--dock-border) dark:border-(--dock-border-dark) p-2" onclick={() => {
					newOrOpenChoice = "open";
					filePickerReady = true;
				}}>
					{localeState.labels.pages.vault.open}
				</button>
			</p>
			<p>
				{localeState.labels.pages.vault.a_vault}
			</p>
		</div>
		{#if filePickerReady}
			<FilePicker pickerType={newOrOpenChoice}></FilePicker>
		{/if}
	</div>
{/if}