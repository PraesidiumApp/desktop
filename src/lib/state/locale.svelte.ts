import en from "../locales/en.json";

type LocaleShape = typeof en;

const ALLOWED_LOCALES = ["en", "es"] as const;
type AllowedLocale = typeof ALLOWED_LOCALES[number];

class LocaleState {
	#locales: Record<string, LocaleShape> = {
		en
	};

	#locale = $state<AllowedLocale>("en");

	#labels = $derived(this.#locales[this.#locale]);

	#isValidLocale(locale: string | null): locale is AllowedLocale {
		return !!(locale && (ALLOWED_LOCALES as readonly string[]).includes(locale));
	}

	get labels(): LocaleShape {
		return this.#labels;
	}

	async set(locale: string | null) {
		if (!(this.#isValidLocale(locale))) {
			return;
		}
		if (!(locale in this.#locales)) {
			this.#locales[locale] = await import(`../locales/${locale}.json`);
		}
		window.localStorage.setItem("praesidium-locale", locale);
		// Set the locale finally so the labels are ready to use at this point
		this.#locale = locale as AllowedLocale;
	}

	constructor() {
		const savedLocale = window.localStorage.getItem("praesidium-locale");
		this.set(savedLocale);
	}
}

export const localeState = new LocaleState();
