import en from "../../locales/en.json";

export class LocaleState {
	available = [
		"en",
		"es"
	] as const;

	current = $state<typeof this.available[number]>("en");
	labels = en;

	async setLocale(locale: typeof this.available[number]) {
		this.current = locale;
		this.labels = await import(`../../locales/${locale}.json`);
	}
}