<script lang="ts">
	import urls from '$lib/urls';
	import { Button } from '$shadcn/button';
	import { Message } from '$shared/modules/messages/message.entity';
	import { Large, Muted, Tiny } from '$typography';
	import UserMini from '$ui/user/user-mini.svelte';
	import moment from 'moment';
	import * as ContextMenu from '$shadcn/context-menu';
	import { Pencil1, Trash } from 'radix-icons-svelte';
	import { MessagesController } from '$shared/modules/messages/messages.controller';
	import { contry } from '$lib/contry';
	import { toast } from 'svelte-sonner';
	import { Input } from '$shadcn/input';

	export let message: Message;

	let editing = false;

	const handleDeleteMessage = () =>
		contry(
			async () => {
				await MessagesController.deleteMessage(message.id);
			},
			() => toast.success('Message deleted!')
		);

	const handleSaveMessage = () =>
		contry(
			async () => {
				await MessagesController.updateMessage(message.id, message.content);
			},
			() => {
				editing = false;
			}
		);

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Enter') {
			handleSaveMessage();
		}
	};
</script>

<ContextMenu.Root>
	<ContextMenu.Trigger>
		<div
			class="duration-50 my-1 flex w-full gap-3 rounded-2xl px-2 py-1 transition-all ease-in-out hover:bg-muted/30"
		>
			<div class="self-center">
				<UserMini user={message.author} />
			</div>
			<div class="flex-col">
				<div class="flex items-center gap-2">
					<Button variant="link" href={urls.app.user.root + '/' + message.author?.id} class="px-0">
						<Large>
							{message.author?.username}
						</Large>
					</Button>
					<Muted class="text-[.75rem]">
						{moment(message.createdAt).fromNow()}
						{#if message.edited}
							<Tiny class="italic">(edited)</Tiny>
						{/if}
					</Muted>
				</div>
				{#if editing}
					<Input bind:value={message.content} on:keydown={handleKeyDown} class="w-full" />
				{:else}
					<p>{message.content}</p>
				{/if}
			</div>
		</div>
	</ContextMenu.Trigger>
	<ContextMenu.Content>
		<ContextMenu.Item class="space-x-1" on:click={() => (editing = !editing)}>
			<Pencil1 />
			<p>Edit</p>
		</ContextMenu.Item>
		<ContextMenu.Separator class="mx-1" />
		<ContextMenu.Item class="space-x-1" on:click={handleDeleteMessage}>
			<Trash />
			<p>Delete</p>
		</ContextMenu.Item>
	</ContextMenu.Content>
</ContextMenu.Root>
