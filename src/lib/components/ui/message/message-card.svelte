<script lang="ts">
	import { contry } from '$helpers/contry';
	import CodeRenderer from '$marked/code-renderer.svelte';
	import CodespanRenderer from '$marked/codespan-renderer.svelte';
	import LinkRenderer from '$marked/link-renderer.svelte';
	import { getUserUrl } from '$lib/urls';
	import { Button } from '$shadcn/button';
	import { Message } from '$shared/modules/messages/message.entity';
	import { MessagesController } from '$shared/modules/messages/messages.controller';
	import { Large, Muted, Tiny } from '$typography';
	import DynamicTextarea from '$ui/chat/dynamic-textarea.svelte';
	import UserMini from '$ui/user/user-mini.svelte';
	import moment from 'moment';
	import { Cross2, Pencil1, Trash } from 'radix-icons-svelte';
	import SvelteMarkdown from 'svelte-markdown';
	import { toast } from 'svelte-sonner';
	import type { MenuItem } from '$custom/menu/types';
	import CustomContextMenu from '$custom/menu/custom-context-menu.svelte';
	import { userStore } from '$stores/stores';

	export let message: Message;

	let updatedMessageContent: string = message.content;
	let editing = false;

	const isAuthor = () => message.authorId === $userStore?.id;

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

	const menuItems: MenuItem[] = [
		{
			label: 'Edit',
			onClick: enterEditMode,
			icon: Pencil1,
			hidden: !isAuthor()
		},
		{ type: 'separator' },
		{
			label: 'Delete',
			onClick: handleDeleteMessage,
			icon: Trash,
			hidden: !isAuthor()
		}
	];
</script>

<CustomContextMenu items={menuItems}>
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
</CustomContextMenu>
