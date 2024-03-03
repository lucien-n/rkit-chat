<script lang="ts">
	import { browser } from '$app/environment';
	import { getGroup } from '$contexts/group';
	import { remultLive } from '$helpers/remultLive';
	import { Message } from '$shared/modules/messages/message.entity';
	import type { SendMessageSchema } from '$shared/modules/messages/schemas/send-message.schema';
	import SendMessageForm from '$ui/message/send-message-form.svelte';
	import MessageCard from '$ui/message/message-card.svelte';
	import { remult } from 'remult';
	import { afterUpdate, onMount } from 'svelte';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import GroupHeader from './group-chat-header.svelte';

	export let sendMessageForm: SuperValidated<Infer<SendMessageSchema>>;

	const messages = remultLive(remult.repo(Message));

	let container: HTMLDivElement;
	let group = getGroup();

	$: browser &&
		$group &&
		messages.listen({
			orderBy: { createdAt: 'asc' },
			include: { author: true },
			where: { groupId: $group.id },
			limit: 25
		});

	function scrollToBottom() {
		container.scrollTop = container.scrollHeight;
	}

	onMount(scrollToBottom);
	afterUpdate(scrollToBottom);
</script>

{#if $group}
	<GroupHeader />
{/if}
<div
	class="scroll flex h-full w-full flex-col overflow-y-scroll p-3 scrollbar-thin scrollbar-track-background scrollbar-thumb-primary"
	bind:this={container}
>
	{#each $messages as message}
		<MessageCard {message} />
	{/each}
</div>

{#if group}
	<div class="p-3">
		<SendMessageForm data={sendMessageForm} />
	</div>
{/if}
