<script lang="ts">
	import { page } from '$app/stores';
	import CustomContextMenu from '$custom/menu/custom-context-menu.svelte';
	import { getGroupUrl } from '$lib/urls';
	import * as Avatar from '$shadcn/avatar';
	import { Badge } from '$shadcn/badge';
	import * as HoverCard from '$shadcn/hover-card';
	import type { RemultError } from '$shared/helpers/types';
	import type { Group } from '$shared/modules/groups/group.entity';
	import { GroupsController } from '$shared/modules/groups/groups.controller';
	import { userStore } from '$stores/stores';
	import { Large } from '$typography';
	import Muted from '$typography/muted.svelte';
	import { Exit, Person, Trash } from 'radix-icons-svelte';
	import { toast } from 'svelte-sonner';
	import { scale } from 'svelte/transition';
	import ConfirmDeleteGroupDialog from './dialogs/confirm-delete-group-dialog.svelte';
	import type { MenuItem } from '$custom/menu/types';
	import { contry } from '$helpers/contry';

	export let group: Group;

	$: isCurrent = $page.params.groupId === group.id;
	const isAdmin = $userStore?.id === group.adminId;

	let openDeleteDialog = false;

	const handleDeleteGroup = async () => {
		try {
			await GroupsController.delete(group.id);
			toast.success(`Group "${group.name}" deleted`);
		} catch (e) {
			const error = e as RemultError;
			toast.error(error.message);
		}
	};

	const handleDeleteClick = () => {
		openDeleteDialog = true;
	};

	const handleLeaveClick = async () =>
		await contry(
			async () => {
				await GroupsController.leave(group.id);
			},
			() => toast.success(`Left "${group.name}"`),
			(error) => toast.error(error.message)
		);

	const menuItems: MenuItem[] = [
		{ label: 'Leave', icon: Exit, onClick: handleLeaveClick, hidden: isAdmin },
		{ type: 'separator', hidden: !isAdmin },
		{ label: 'Delete', icon: Trash, onClick: handleDeleteClick, hidden: !isAdmin }
	];
</script>

<CustomContextMenu items={menuItems}>
	<HoverCard.Root openDelay={50} closeDelay={50}>
		<HoverCard.Trigger class="relative flex" href={getGroupUrl(group)}>
			{#if isCurrent}
				<div
					class="absolute -left-3 h-5/6 w-[.4rem] self-center rounded-r-md bg-primary"
					transition:scale
				/>
			{/if}
			<Avatar.Root>
				<Avatar.Image />
				<Avatar.Fallback>{group.name?.slice(0, 2)}</Avatar.Fallback>
			</Avatar.Root>
		</HoverCard.Trigger>
		<HoverCard.Content align="center" side="right" class="ml-2">
			<div class="flex gap-2">
				<Large>{group.name}</Large>
				{#if isAdmin}
					<Badge>Admin</Badge>
				{/if}
			</div>
			<div class="flex items-center gap-1">
				<Person />
				<Muted>{group.userCount}</Muted>
			</div>
		</HoverCard.Content>
	</HoverCard.Root>
</CustomContextMenu>

<ConfirmDeleteGroupDialog {group} bind:open={openDeleteDialog} on:confirm={handleDeleteGroup} />
