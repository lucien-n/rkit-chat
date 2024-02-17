<script lang="ts">
	import Navbar from '$lib/components/ui/nav/navbar.svelte';
	import '../app.pcss';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	$: ({ user } = data);
</script>

<Navbar {user} />

<slot />
