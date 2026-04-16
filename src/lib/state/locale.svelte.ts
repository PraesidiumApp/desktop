import en from "../locales/en.json";

type LocaleShape = typeof en;

const ALLOWED_LOCALES = ["en", "es"] as const;
type AllowedLocale = typeof ALLOWED_LOCALES[number];

class LocaleState {
	#locales: Record<string, LocaleShape> = {
		en
	};

	#locale = $state<AllowedLocale>("en");

	labels = $derived(this.#locales[this.#locale]);

	async set(locale: AllowedLocale) {
		if (!(locale in this.#locales)) {
			this.#locales[locale] = await import(`../locales/${locale}.json`);
		}
		window.localStorage.setItem("praesidium-locale", this.#locale);
		this.#locale = locale;
	}

	constructor() {
		const savedLocale = window.localStorage.getItem("praesidium-locale");
		if (ALLOWED_LOCALES.includes(savedLocale as AllowedLocale)) {
			this.set("es");
		}
	}
}

export const localeState = new LocaleState();
