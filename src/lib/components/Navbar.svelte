<script lang="ts">
	import { localeState } from "$lib/state/locale.svelte";
</script>

<nav>
	<img alt="Praesidium logo" src="">
	<ul>
		<li>
			{localeState.labels.components.navbar.vault}
		</li>
		<li>
			{localeState.labels.components.navbar.generator}
		</li>
		<li>
			{localeState.labels.components.navbar.about}
		</li>
	</ul>
</nav>