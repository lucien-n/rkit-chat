<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { remultLive } from '$lib/stores/remultLive';
	import type { Group } from '$shared/modules/groups/group.entity';
	import { Message } from '$shared/modules/messages/message.entity';
	import type { CreateMessageSchema } from '$shared/modules/messages/schemas/create-message.schema';
	import CreateMessageForm from '$ui/message/create-message-form.svelte';
	import MessageCard from '$ui/message/message-card.svelte';
	import { remult } from 'remult';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import GroupHeader from './group-chat-header.svelte';

	export let group: Group | null;
	export let messageForm: SuperValidated<Infer<CreateMessageSchema>>;

	const messages = remultLive(remult.repo(Message));

	$: browser &&
		messages.listen({
			orderBy: { createdAt: 'asc' },
			include: { author: true },
			where: { groupId: $page.params.groupId },
			limit: 25,
		});
</script>

{#if group}
	<GroupHeader {group} />
{/if}
<div class="flex h-full w-full flex-col gap-6 overflow-y-scroll p-3">
	{#each $messages as message}
		<MessageCard {message} />
	{/each}
</div>

{#if group}
	<div class="p-3">
		<CreateMessageForm data={messageForm} />
	</div>
{/if}
