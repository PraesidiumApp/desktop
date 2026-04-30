import { invoke } from "@tauri-apps/api/core";
import { toasterState } from "./toaster.svelte";

interface RawSessionItem {
    id: number;
    label: string;
    kind: string;
    payload: number[];
}

interface SessionItem {
    id: number;
    label: string;
    kind: string;
    payload: string;
}

class SessionState {
	active = $state(false);

	items: SessionItem[] = $state([]);

	async fetchItems() {
		if (!this.active) return;
		try {
			let rawItems: RawSessionItem[] = await invoke("get_items");
			let decoder = new TextDecoder();
			this.items = rawItems.map((item) => {
				return {
					...item,
					payload: decoder.decode(new Uint8Array(item.payload))
				};
			})
		} catch (backendError) {
			toasterState.add("error", "backend_error", backendError as string);
		}
	}
}

export const sessionState = new SessionState();