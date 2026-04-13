import { invoke } from "@tauri-apps/api/core"
import { save } from "@tauri-apps/plugin-dialog"
import { open } from "@tauri-apps/plugin-dialog"

export class SessionState {
	path = $state("");
	readyNew = $state(false);
	readyExisting = $state(false);

	reset() {
		this.path = "";
		this.readyNew = false;
		this.readyExisting = false;
	}

	async saveToDialog() {
		const path = await save({
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

	async newSession(path: string, password: string) {
		try {
			await invoke("new_session")
		} catch (error) {
			console.error(error)
		}
	}
}