export class ThemeState {
	constructor() {
		this.getTheme();
		this.updateTheme();
	}

	current = $state<"light" | "dark">("light");

	getTheme() {
		const preferredTheme = window.localStorage.getItem("preferred-theme") as "light" | "dark";
		if (preferredTheme === "light" || preferredTheme === "dark") {
			this.current = preferredTheme;
		}
	}

	toggleTheme(theme: "light" | "dark") {
		this.current = theme;
		this.saveTheme();
		this.updateTheme();
	}

	saveTheme() {
		window.localStorage.setItem("preferred-theme", this.current);
	}

	updateTheme() {
		document.documentElement.classList.remove("light", "dark");
		document.documentElement.classList.add(this.current);
	}
}