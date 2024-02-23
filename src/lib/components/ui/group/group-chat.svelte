<script lang="ts">
	import type { Group } from '$shared/modules/groups/group.entity';
	import MessageCard from '$ui/message/message-card.svelte';
	import MessageInput from '$ui/message/message-input.svelte';
	import { remult } from 'remult';
	import GroupHeader from './group-chat-header.svelte';
	import { remultLive } from '$lib/stores/remultLive';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { Message } from '$shared/modules/messages/message.entity';

	export let group: Group | null;

	const messages = remultLive(remult.repo(Message));

	$: browser &&
		messages.listen({
			orderBy: { createdAt: 'asc' },
			include: { author: true },
			where: { groupId: $page.params.groupId }
		});
</script>

<div class="flex h-full w-full flex-col rounded-md border">
	{#if group}
		<GroupHeader {group} />
	{/if}
	<div class="flex h-full w-full flex-col gap-6 overflow-y-scroll p-3">
		{#each $messages.reverse().slice(0, 5).reverse() as message}
			<MessageCard {message} />
		{/each}
	</div>
</div>

{#if group}
	<MessageInput {group} />
{/if}
