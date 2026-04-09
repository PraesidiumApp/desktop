const available = [
	"light",
	"dark"
] as const;

type ThemeOption = typeof available[number];

export class ThemeState {
	// Default to light theme
	_current = $state<ThemeOption>("light");

	constructor() {
		const preferredTheme = window.localStorage.getItem("preferred-theme") as ThemeOption;
		if (preferredTheme in available) {
			this.theme = preferredTheme;
		}
	}

	set theme(theme: ThemeOption) {
		this._current = theme;
		window.localStorage.setItem("preferred-theme", this._current);
		document.documentElement.classList.remove("light", "dark");
		document.documentElement.classList.add(this._current);
	}

	get theme(): ThemeOption {
		return this._current;
	}
}