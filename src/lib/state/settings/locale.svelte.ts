import en from "../../locales/en.json";
import es from "../../locales/es.json";

const available = {
	en,
	es
};

type LocaleKey = keyof typeof available;

export class LocaleState {
	// Default to english locale
	_current: LocaleKey = $state("en");
	labels = $derived(available[this._current]);

	constructor() {
		const preferredLocale = window.localStorage.getItem("preferred-locale") as LocaleKey;
		if (preferredLocale in available) {
			this.locale = preferredLocale;
		}
	}

	set locale(locale: LocaleKey) {
		this._current = locale;
		window.localStorage.setItem("preferred-locale", this._current);
	}

	get locale(): LocaleKey {
		return this._current;
	}
}