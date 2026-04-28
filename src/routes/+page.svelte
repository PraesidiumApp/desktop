<script lang="ts">
    import { localeState } from "$lib/state/locale.svelte";
	import FilePicker from "$lib/components/FilePicker.svelte";
    import { sessionState } from "$lib/state/session.svelte";

	let filePickerReady = $state(false);
	let newOrOpenChoice: "new" | "open" = $state("new");
</script>

{#if sessionState.active}
	<div class="flex flex-col pt-40 grow text-4xl gap-5">
		<div>
			
		</div>
		<p>
			Active
		</p>
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