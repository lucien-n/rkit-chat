<script lang="ts">
	import { setGroup } from '$contexts/group';
	import GroupChat from '$ui/group/group-chat.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ group, sendMessageForm } = data);

	$: setGroup(group);
</script>

<GroupChat {sendMessageForm} />
