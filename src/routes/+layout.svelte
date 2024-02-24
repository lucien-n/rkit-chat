<script lang="ts">
	import '../app.pcss';
	import type { LayoutData } from './$types';
	import { userStore } from '$lib/stores/stores';
	import { browser } from '$app/environment';
	import { Toaster } from '$shadcn/sonner';
	import { ModeWatcher } from 'mode-watcher';
	import { Theme } from '$shared/modules/user-settings/enums/theme.enum';

	export let data: LayoutData;

	$: ({ user } = data);

	$: {
		if (browser) {
			userStore.set(user ?? null);
		}
	}
</script>

<ModeWatcher defaultMode={user?.settings?.theme ?? Theme.Dark} />
<Toaster richColors />

<slot />
