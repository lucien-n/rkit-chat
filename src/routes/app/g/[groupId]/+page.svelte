<script lang="ts">
	import ChatLayout from '$layouts/chat-layout.svelte';
	import type { PageData } from './$types';
	import GroupChat from '$ui/group/group-chat.svelte';
	import Toolbar from '$ui/chat/toolbar.svelte';

	export let data: PageData;

	$: ({ groups, currentGroup } = data);
</script>

<ChatLayout>
	<svelte:fragment slot="toolbar">
		<Toolbar {groups} />
	</svelte:fragment>
	<svelte:fragment slot="content">
		<GroupChat group={currentGroup} />
	</svelte:fragment>
</ChatLayout>
