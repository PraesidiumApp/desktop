import { page } from "$app/state";
import { openUrl } from "@tauri-apps/plugin-opener";

class AppState {
	constructor() {
		// Get user theme preference or default to "light"
		this.getTheme();
	}

	// App metadata
	version = "0.1.0-dev";
	
	commit = "0f13d59";
	
	// Menu options and current menu
	menu = [
		{ name: "Dashboard", href: "/" },
		{ name: "Vault", href: "/vault" },
		{ name: "Close", href: "/close" },
	];

	currentMenu = $derived(
		this.menu.find(item => item.href === page.url.pathname) !
	);

	// Open GitHub page
	openGithub() {
		window.alert("The Praesidium GitHub page will open with the system's default browser");
		openUrl("https://github.com/PraesidiumApp");
	}

	// App theme management
	theme = $state<"light" | "dark">("light");

	private getTheme() {
		const userPreference = window.localStorage.getItem("preferred-theme") as "light" | "dark";

		// Only update this.theme if preferred-theme is "dark"
		// if "light" or null theme it is already defaulted to "light"
		if (userPreference === "dark") {
			this.theme = userPreference;
			this.updateTheme();
		}
	}

	private updateTheme() {
		document.documentElement.classList.remove("light", "dark");
		document.documentElement.classList.add(this.theme);
	}

	toggleTheme() {
		this.theme = this.theme === "light" ? "dark" : "light";
		window.localStorage.setItem("preferred-theme", this.theme);
		this.updateTheme();
	}

	// Vault management
	vault = $state({
		isOpen: false
	});
}

export const appState = new AppState();