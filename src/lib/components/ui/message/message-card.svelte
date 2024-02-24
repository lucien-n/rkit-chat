<script lang="ts">
	import urls from '$lib/urls';
	import { Button } from '$shadcn/button';
	import { Message } from '$shared/modules/messages/message.entity';
	import { Large, Muted } from '$typography';
	import UserMini from '$ui/user/user-mini.svelte';
	import moment from 'moment';
	import * as ContextMenu from '$shadcn/context-menu';
	import { Trash } from 'radix-icons-svelte';
	import { MessagesController } from '$shared/modules/messages/messages.controller';
	import { contry } from '$lib/contry';
	import { toast } from 'svelte-sonner';

	export let message: Message;

	const handleDeleteMessage = () =>
		contry(
			async () => {
				await MessagesController.deleteMessage(message.id);
			},
			() => toast.success('Message deleted!'),
			() => toast.error('Failed to dedeleteMessagee')
		);
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
					</Muted>
				</div>
				<p>{message.content}</p>
			</div>
		</div>
	</ContextMenu.Trigger>
	<ContextMenu.Content>
		<ContextMenu.Item class="space-x-1" on:click={handleDeleteMessage}>
			<Trash />
			<p>Delete</p>
		</ContextMenu.Item>
	</ContextMenu.Content>
</ContextMenu.Root>
