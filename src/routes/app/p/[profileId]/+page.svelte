<script lang="ts">
	import ChatLayout from '$layouts/chat-layout.svelte';
	import type { PageData } from './$types';
	import Toolbar from '$ui/chat/toolbar.svelte';

	export let data: PageData;

	$: ({ groups } = data);
</script>

<ChatLayout>
	<svelte:fragment slot="toolbar">
		<Toolbar {groups} />
	</svelte:fragment>
	<svelte:fragment slot="content"></svelte:fragment>
</ChatLayout>
