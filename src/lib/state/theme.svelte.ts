const ALLOWED_THEMES = ["light", "dark"] as const;
type AllowedTheme = typeof ALLOWED_THEMES[number];

class ThemeState {
	#theme = $state<AllowedTheme>("light");

	#isValidTheme(theme: string | null): theme is AllowedTheme {
		return !!(theme && (ALLOWED_THEMES as readonly string[]).includes(theme));
	}

	set theme(theme: string | null) {
		if (!(this.#isValidTheme(theme))) {
			return;
		}
		window.localStorage.setItem("praesidium-theme", theme);
		document.documentElement.classList.remove(...ALLOWED_THEMES);
		document.documentElement.classList.add(theme);
		this.#theme = theme as AllowedTheme;
	}

	get theme() {
		return this.#theme;
	}

	constructor() {
		const savedTheme = window.localStorage.getItem("praesidium-theme");
		this.theme = savedTheme;
	}
}

export const themeState = new ThemeState();
