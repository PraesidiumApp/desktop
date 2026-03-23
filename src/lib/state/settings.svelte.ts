import { ThemeState } from "./settings/theme.svelte";
import { LocaleState } from "./settings/locale.svelte";

export class SettingsState {
	theme = new ThemeState();
	locale = new LocaleState();
}