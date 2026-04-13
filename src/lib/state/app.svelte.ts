import { SettingsState } from "./settings.svelte";
import { NavigationState } from "./navigation.svelte";
import { AboutState } from "./about.svelte";
import { SessionState } from "./session.svelte";

class AppState {
	metadata = {
		version: "0.1.0-dev",
		commit: "0f13d53"
	} as const;

	settings = new SettingsState();

	navigation = new NavigationState();

	about = new AboutState();

	session = new SessionState();
}

export const appState = new AppState();

// This is a shortcut variable to avoid writing these three repetitive separators on each labels read
export const localeState = appState.settings.locale;
