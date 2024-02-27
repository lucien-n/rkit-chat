<script lang="ts">
	import { contry } from '$helpers/contry';
	import CodeRenderer from '$lib/components/marked/code-renderer.svelte';
	import CodespanRenderer from '$lib/components/marked/codespan-renderer.svelte';
	import LinkRenderer from '$lib/components/marked/link-renderer.svelte';
	import { getUserUrl } from '$lib/urls';
	import { Button } from '$shadcn/button';
	import * as ContextMenu from '$shadcn/context-menu';
	import { Message } from '$shared/modules/messages/message.entity';
	import { MessagesController } from '$shared/modules/messages/messages.controller';
	import { userStore } from '$stores/stores';
	import { Large, Muted, Tiny } from '$typography';
	import DynamicTextarea from '$ui/chat/dynamic-textarea.svelte';
	import UserMini from '$ui/user/user-mini.svelte';
	import moment from 'moment';
	import { Cross2, Pencil1, Trash } from 'radix-icons-svelte';
	import SvelteMarkdown from 'svelte-markdown';
	import { toast } from 'svelte-sonner';

	export let message: Message;

	let updatedMessageContent: string = message.content;
	let editing = false;

	const handleDeleteMessage = () =>
		contry(
			async () => {
				await MessagesController.deleteMessage(message.id);
			},
			() => toast.success('Message deleted!'),
			() => toast.success('An error occured')
		);

	const enterEditMode = () => {
		editing = true;
		updatedMessageContent = message.content;
	};

	const exitEditMode = () => {
		editing = false;
	};

	const handleSaveMessage = () =>
		contry(async () => {
			await MessagesController.updateMessage(message.id, updatedMessageContent);
		});

	const handleKeyDown = (event: KeyboardEvent) => {
		switch (event.key) {
			case 'Enter':
				if (event.shiftKey) break;
				editing = false;
				handleSaveMessage();
				break;
			case 'Escape':
				editing = false;
				break;
		}
	};
</script>

<ContextMenu.Root>
	<ContextMenu.Trigger>
		<div
			class="duration-50 my-1 flex w-full gap-3 rounded-lg px-2 py-1 transition-all ease-in-out hover:bg-muted/10"
		>
			<div class="mt-2 self-start">
				<UserMini user={message.author} />
			</div>
			<div class="w-full flex-col">
				<div class="flex items-center gap-2">
					<Button variant="link" href={getUserUrl(message.author)} class="px-0">
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
				<div class="w-full">
					{#if editing}
						<div class="my-2 flex gap-2">
							<DynamicTextarea
								bind:value={updatedMessageContent}
								on:keydown={handleKeyDown}
								class="w-full border-0 bg-muted/20 text-base"
							/>
							<Button size="icon" variant="ghost" on:click={exitEditMode}>
								<Cross2 />
							</Button>
						</div>
					{:else}
						<SvelteMarkdown
							source={message.content}
							renderers={{ link: LinkRenderer, code: CodeRenderer, codespan: CodespanRenderer }}
						/>
					{/if}
				</div>
			</div>
		</div>
	</ContextMenu.Trigger>
	{#if message.authorId === $userStore?.id}
		<ContextMenu.Content>
			<ContextMenu.Item class="space-x-1" on:click={enterEditMode}>
				<Pencil1 />
				<p>Edit</p>
			</ContextMenu.Item>
			<ContextMenu.Separator class="mx-1" />
			<ContextMenu.Item class="space-x-1" on:click={handleDeleteMessage}>
				<Trash />
				<p>Delete</p>
			</ContextMenu.Item>
		</ContextMenu.Content>
	{/if}
</ContextMenu.Root>
