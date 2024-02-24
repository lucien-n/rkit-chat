<script lang="ts">
	import '../app.pcss';
	import type { LayoutData } from './$types';
	import { userStore } from '$lib/stores/stores';
	import { browser } from '$app/environment';

	export let data: LayoutData;

	$: ({ user } = data);

	$: {
		if (browser) {
			userStore.set(user ?? null);
		}
	}
</script>

<slot />
