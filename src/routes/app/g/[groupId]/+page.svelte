<script lang="ts">
	import { setGroup } from '$lib/contexts/group';
	import GroupChat from '$ui/group/group-chat.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ group, messageForm } = data);

	$: setGroup(group);
</script>

<GroupChat {messageForm} />
