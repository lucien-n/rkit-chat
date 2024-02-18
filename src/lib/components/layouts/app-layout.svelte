<script lang="ts">
	import CreateMessageForm from '../ui/chat/create-message-form.svelte';
	import type { SuperValidated } from 'sveltekit-superforms';
	import type { CreateMessageSchema } from '$shared/modules/messages/schemas/create-message.schema';
	import { remultLive } from '$lib/stores/remultLive';
	import { remult } from 'remult';
	import { Message } from '$shared/modules/messages/message.entity';
	import { browser } from '$app/environment';
	import CreateGroupDialog from '../ui/groups/create-group-dialog.svelte';
	import type { CreateGroupSchema } from '$shared/modules/groups/schemas/create-group.schema';
	import { Group } from '$shared/modules/groups/group.entity';
	import MessageCard from '../ui/chat/message-card.svelte';
	import ProfileCard from '../ui/profile/profile-card.svelte';
	import GroupCard from '../ui/groups/group-card.svelte';

	export let messageForm: SuperValidated<CreateMessageSchema>;
	export let groupForm: SuperValidated<CreateGroupSchema>;

	const messages = remultLive(remult.repo(Message));
	const groups = remultLive(remult.repo(Group));

	$: browser &&
		messages.listen({
			orderBy: { createdAt: 'asc' },
			include: { author: true }
		});

	$: browser &&
		groups.listen({
			orderBy: { createdAt: 'asc' },
			include: { profiles: true }
		});
</script>

<div class="grid h-full w-full grid-cols-4 gap-6 p-6">
	<div class="flex h-full flex-col gap-8">
		<ProfileCard />
		<div class="flex h-full w-full flex-col justify-between rounded-md border">
			<div class="flex flex-col gap-3 p-3">
				{#each $groups as group}
					<GroupCard {group} />
				{/each}
			</div>
			<CreateGroupDialog form={groupForm} />
		</div>
	</div>
	<div class="col-span-3 flex h-full flex-col gap-6">
		<div class="flex h-full w-full flex-col gap-6 overflow-y-scroll rounded-md border p-4">
			{#each $messages.reverse().slice(0, 5).reverse() as message}
				<MessageCard {message} />
			{/each}
		</div>
		<CreateMessageForm form={messageForm} />
	</div>
</div>
