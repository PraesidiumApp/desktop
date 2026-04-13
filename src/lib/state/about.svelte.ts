import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import { localeState } from "./app.svelte";

export class AboutState {
	openLicenses() {
		new WebviewWindow(
			"software-licenses",
			{
				url: "/software-licenses.html",
				title: localeState.labels.about.softwarelicenses,
				width: 600,
				height: 700
			}
		)
	}
}