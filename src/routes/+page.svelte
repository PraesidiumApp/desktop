<script lang="ts">
    import { localeState } from "$lib/state/locale.svelte";
	import FilePicker from "$lib/components/FilePicker.svelte";
    import { sessionState } from "$lib/state/session.svelte";
	import { invoke } from "@tauri-apps/api/core"
    import { toasterState } from "$lib/state/toaster.svelte";

	let filePickerReady = $state(false);
	let newOrOpenChoice: "new" | "open" = $state("new");

	async function closeSession() {
		await invoke("close");
		sessionState.active = false;
		toasterState.add("info", "session_closed");
	}

	let tempPayloadTouched = false;
	let tempPayload = "";
</script>

{#if sessionState.active}
	<div class="flex flex-col pt-40 w-full grow items-center">
		<div class="flex flex-col w-[95vw] max-w-300 text-4xl gap-5">
			<div class="flex flex-row justify-between">
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
				<button class="cursor-pointer rounded-2xl border-2 bg-(--dock-bg) dark:bg-(--dock-bg-dark) border-(--dock-border) dark:border-(--dock-border-dark) p-2">
					<p>
						{localeState.labels.pages.vault.create}
					</p>
				</button>
			</div>
			{#each sessionState.items as item (item.id)}
				<div class="flex flex-col rounded-2xl border-2 bg-(--dock-bg) dark:bg-(--dock-bg-dark) border-(--dock-border) dark:border-(--dock-border-dark) p-5 w-full">
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
						<textarea bind:value={
							() => item.payload,
							(payload) => {
								tempPayloadTouched = true;
								tempPayload = payload;
							}
						} class="w-full min-h-5"></textarea>
					</div>
					<div class="flex flex-row justify-between">
						<button class="cursor-pointer rounded-2xl border-2 bg-(--dock-bg) dark:bg-(--dock-bg-dark) border-(--dock-border) dark:border-(--dock-border-dark) p-2">
							<p>
								{localeState.labels.pages.vault.delete_item}
							</p>
						</button>
						<button class="cursor-pointer rounded-2xl border-2 bg-(--dock-bg) dark:bg-(--dock-bg-dark) border-(--dock-border) dark:border-(--dock-border-dark) p-2">
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