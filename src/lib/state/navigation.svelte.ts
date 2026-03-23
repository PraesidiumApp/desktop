import { page } from "$app/state";

export class NavigationState {
	available = [
		{ name: "Overview", href: "/" },
		{ name: "Vault", href: "/vault" },
		{ name: "Generator", href: "/generator" },
		{ name: "Settings", href: "/settings" },
		{ name: "About", href: "/about" }
	] as const;

	current = $derived(
		this.available.find(menuItem => menuItem.href === page.url.pathname) !
	);
}