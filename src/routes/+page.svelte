<script lang="ts">
    import { localeState } from "$lib/state/locale.svelte";
	import FilePicker from "$lib/components/FilePicker.svelte";

	let filePickerReady = $state(false);
	let newOrOpenChoice: "new" | "open" = $state("new");
</script>

<div class="flex flex-col justify-center items-center pt-40 grow text-4xl gap-5">
	<div class="flex flex-col text-center gap-1">
		<p>
			{localeState.labels.pages.vault.do_you_want_to}
		</p>
		<p>
			<button class="cursor-pointer font-bold" onclick={() => {
				newOrOpenChoice = "new";
				filePickerReady = true;
			}}>
				{localeState.labels.pages.vault.create}
			</button>
			{localeState.labels.pages.vault.or}
			<button class="cursor-pointer font-bold" onclick={() => {
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