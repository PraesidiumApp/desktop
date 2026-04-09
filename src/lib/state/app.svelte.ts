import { SettingsState } from "./settings.svelte";
import { NavigationState } from "./navigation.svelte";

class AppState {
	metadata = {
		version: "0.1.0-dev",
		commit: "0f13d53"
	} as const;

	settings = new SettingsState();

	navigation = new NavigationState();

	/*
	openGithub() {
		const choice = window.confirm(`
			Do you want to open the Praesidium GitHub page?
			(It will open with your system's default web browser)
		`);
		
		if (choice) {
			openUrl("https://github.com/PraesidiumApp");
		}
	}

	showInfo() {
		window.alert(`
			Praesidium Desktop - Version ${this.version}
			By Germán (https://github.com/itsgerliz)
			Made with Tauri and SvelteKit
			Released under the MIT license
		`)
	}
*/
}

export const appState = new AppState();

// This is a shortcut variable to avoid writing these three repetitive separators on each labels read
export const localeState = appState.settings.locale;
