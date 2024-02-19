<script lang="ts">
	import '../app.pcss';
	import type { LayoutData } from './$types';
	import { profileStore, userStore } from '$lib/stores/stores';
	import { browser } from '$app/environment';

	export let data: LayoutData;

	$: ({ user, profile } = data);

	$: {
		if (browser) {
			userStore.set(user ?? null);
			profileStore.set(profile ?? null);
		}
	}
</script>

<slot />
