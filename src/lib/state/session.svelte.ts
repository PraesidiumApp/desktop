import { invoke } from "@tauri-apps/api/core"
import { save } from "@tauri-apps/plugin-dialog"
import { open } from "@tauri-apps/plugin-dialog"
import { localeState } from "./app.svelte";

export class SessionState {
	_path = $state("");
	basename = $state("");
	password = $state("");
	errorMessage = $state("");
	loading = $state(false);
	readyNew = $state(false);
	readyExisting = $state(false);
	active = $state(false);

	set path(newPath: string) {
		this._path = newPath;
		if (this._path) {
			const parts = newPath.split(/[\\/]/).filter((segment) => segment);
			this.basename = parts.pop() !;
		} else {
			this.basename = "";
		}
	}

	get path(): string {
		return this._path;
	}

	reset() {
		this.path = "";
		this.password = "";
		this.errorMessage = "";
		this.readyNew = false;
		this.readyExisting = false;
	}

	async saveToDialog() {
		const path = await save({
			title: localeState.labels.overview.unopened.create_vault,
			defaultPath: ".prsd",
			filters: [
				{
					name: "Praesidium vault",
					extensions: ["prsd"]
				}
			]
		});

		if (path) {
			this.path = path
		}
	}

	async openDialog() {
		const path = await open({
			multiple: false,
			directory: false,
			title: localeState.labels.overview.unopened.open_vault,
			defaultPath: ".prsd",
			filters: [
				{
					name: "Praesidium vault",
					extensions: ["prsd"]
				}
			]
		});

		if (path) {
			this.path = path
		}
	}

	async newSession() {
		if (!this.path || !this.password) {
			this.errorMessage = localeState.labels.overview.unopened.cantlaunchempty;
			return;
		}
		try {
			this.loading = true;

			await invoke("new_session", 
				{
					path: this.path,
					password: this.password
				}
			)

			this.password = "";
			this.loading = false;
			this.active = true;
		} catch (error) {
			this.errorMessage = String(error);
		}
	}
}