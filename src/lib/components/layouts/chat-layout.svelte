<script lang="ts">
	import CreateMessageForm from '$ui/chat/create-message-form.svelte';
	import { remultLive } from '$lib/stores/remultLive';
	import { remult } from 'remult';
	import { Message } from '$shared/modules/messages/message.entity';
	import { browser } from '$app/environment';
	import CreateGroupDialog from '$ui/groups/create-group-dialog.svelte';
	import { Group } from '$shared/modules/groups/group.entity';
	import MessageCard from '$ui/chat/message-card.svelte';
	import ProfileAvatar from '$ui/profile/profile-card.svelte';
	import urls from '$lib/urls';
	import { page } from '$app/stores';
	import { Large, Muted } from '$typography';
	import { Badge } from '$shadcn/badge';
	import { userStore } from '$lib/stores/stores';
	import GroupAvatar from '$ui/groups/group-avatar.svelte';
	import { Separator } from '$shadcn/separator';

	const messages = remultLive(remult.repo(Message));
	const groups = remultLive(remult.repo(Group));

	$: browser &&
		messages.listen({
			orderBy: { createdAt: 'asc' },
			include: { author: true },
			where: { groupId: $page.params.groupId }
		});

	$: browser &&
		groups.listen({
			orderBy: { createdAt: 'asc' },
			include: { profiles: true }
		});

	$: currentGroup = $groups.find(({ id }) => id === $page.params.groupId) ?? null;
</script>

<div class=" flex h-full w-full gap-6 p-6">
	<div class="flex h-full flex-col items-center gap-4 rounded-md border p-3">
		<ProfileAvatar />
		<Separator />
		<div class="flex h-full flex-col justify-between">
			<div class="flex flex-col gap-3">
				{#each $groups as group}
					<a class="avatar" href={urls.groups + '/' + group.id}>
						<GroupAvatar {group} selected={$page.params.groupId === group.id} />
					</a>
				{/each}
			</div>
			<CreateGroupDialog form={$page.data.groupForm} />
		</div>
	</div>
	<div class="flex h-full w-full flex-col gap-4">
		<div class="flex h-full w-full flex-col rounded-md border">
			{#if currentGroup}
				<div class="w-full self-start rounded-t-md border-b px-4 py-2">
					<div class="flex items-center gap-2">
						<Large>{currentGroup.name}</Large>
						{#if currentGroup.adminId === $userStore?.id}
							<Badge variant="outline">Admin</Badge>
						{/if}
					</div>
					<Muted>{currentGroup.profiles?.length ?? 0} user(s)</Muted>
				</div>
			{/if}
			<div class="flex h-full w-full flex-col gap-6 overflow-y-scroll p-3">
				{#each $messages.reverse().slice(0, 5).reverse() as message}
					<MessageCard {message} />
				{/each}
			</div>
		</div>
		<CreateMessageForm form={$page.data.messageForm} />
	</div>
</div>
