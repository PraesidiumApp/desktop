import en from "../../locales/en.json";

export class LocaleState {
	available = [
		"en",
		"es"
	] as const;

	labels = $state(en);

	async setLocale(locale: typeof this.available[number]) {
		this.labels = await import(`../../locales/${locale}.json`);
	}
}