import { page } from "$app/state";

class AppState {
	constructor() {
		// Get user theme preference or default to "light"
		this.getTheme();
	}

	version = "0.1.0-dev";
	
	commit = "0f13d59";
	
	menu = [
		{ name: "Dashboard", href: "/" },
		{ name: "Vault", href: "/vault" },
		{ name: "Close", href: "/close" },
		{ name: "About", href: "/about" },
	];

	currentMenu = $derived(
		this.menu.find(item => item.href === page.url.pathname) !
	);

	theme = $state<"light" | "dark">("light");

	private getTheme() {
		const userPreference = window.localStorage.getItem("preferred-theme") as "light" | "dark";

		// Only update this.theme if preferred-theme is "dark"
		// if "light" or null theme is already defaulted to "light"
		if (userPreference === "dark") {
			this.theme = userPreference;
			this.updateTheme();
		}
	}

	updateTheme() {
		document.documentElement.classList.remove("light", "dark");
		document.documentElement.classList.add(this.theme);
	}

	toggleTheme() {
		this.theme = this.theme === "light" ? "dark" : "light";
		window.localStorage.setItem("preferred-theme", this.theme);
		this.updateTheme();
	}
}

export const appState = new AppState();