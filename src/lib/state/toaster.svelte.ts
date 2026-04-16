type ToastKind = "info" | "warning" | "error";

type Toast = {
	id: string,
	kind: ToastKind,
	message: string
}

class ToasterState {
	queue = $state<Toast[]>([]);

	add(kind: ToastKind, message: string) {
		const id = crypto.randomUUID();
		this.queue.push({ id, kind, message });
		setTimeout(() => this.remove(id), 5000);
	}

	remove(id: string) {
		const index = this.queue.findIndex((toast) => toast.id === id);
		if (index !== -1) {
			this.queue.splice(index, 1);
		}
	}
}

export const toasterState = new ToasterState();
