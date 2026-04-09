export class ThemeState {
	// Default to light theme
	_current = $state<"light" | "dark">("light");

	constructor() {
		const preferredTheme = window.localStorage.getItem("preferred-theme") as "light" | "dark";
		if (preferredTheme == "light" || preferredTheme == "dark") {
			this.theme = preferredTheme;
		}
	}

	set theme(theme: "light" | "dark") {
		this._current = theme;
		window.localStorage.setItem("preferred-theme", this._current);
		document.documentElement.classList.remove("light", "dark");
		document.documentElement.classList.add(this._current);
	}

	get theme(): "light" | "dark" {
		return this._current;
	}
}