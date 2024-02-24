<script lang="ts">
	import type { PageData } from './$types';
	import GroupChat from '$ui/group/group-chat.svelte';

	export let data: PageData;

	$: ({ currentGroup, messageForm } = data);
</script>

<GroupChat group={currentGroup} {messageForm} />
