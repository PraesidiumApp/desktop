import { page } from "$app/state";

export const available = [
	{ name: "Overview", href: "/" },
	{ name: "Vault", href: "/vault" },
	{ name: "Generator", href: "/generator" },
	{ name: "Settings", href: "/settings" },
	{ name: "About", href: "/about" }
] as const;


export class NavigationState {
	current = $derived(
		available.find(menuItem => menuItem.href === page.url.pathname) !
	);
}