import { localeState } from "./locale.svelte";

type ToastKind = "info" | "warning" | "error";
type ValidMessageNode = keyof typeof localeState.labels.components.toaster;
type UUID = `${string}-${string}-${string}-${string}-${string}`;

class Toast {
	id: UUID;
	kind: ToastKind;
	#messageNode: ValidMessageNode;
	message: string;
	extra = "";

	constructor(id: UUID, kind: ToastKind, messageNode: ValidMessageNode, extra?: string) {
		this.id = id;
		this.kind = kind;
		this.#messageNode = messageNode;
		this.message = $derived(localeState.labels.components.toaster[this.#messageNode]);
		if (extra) {
			this.extra = extra;
		}
	}
}

class ToasterState {
	#queue = $state<Toast[]>([]);

	get queue(): Toast[] {
		return this.#queue;
	}

	add(kind: ToastKind, messageNode: ValidMessageNode, extra?: string) {
		const newToastId = crypto.randomUUID();
		if (extra) {
			this.queue.push(new Toast(newToastId, kind, messageNode, extra));
		} else {
			this.queue.push(new Toast(newToastId, kind, messageNode));
		}
		setTimeout(() => this.remove(newToastId), 10000);
	}

	remove(id: UUID) {
		const index = this.queue.findIndex((toast) => toast.id === id);
		if (index !== -1) {
			this.queue.splice(index, 1);
		}
	}
}

export const toasterState = new ToasterState();
