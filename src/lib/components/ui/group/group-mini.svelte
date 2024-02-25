<script lang="ts">
	import { page } from '$app/stores';
	import urls from '$lib/urls';
	import * as Avatar from '$shadcn/avatar';
	import { Badge } from '$shadcn/badge';
	import * as ContextMenu from '$shadcn/context-menu';
	import * as HoverCard from '$shadcn/hover-card';
	import type { RemultError } from '$shared/helpers/types';
	import type { Group } from '$shared/modules/groups/group.entity';
	import { GroupsController } from '$shared/modules/groups/groups.controller';
	import { userStore } from '$stores/stores';
	import { Large } from '$typography';
	import Muted from '$typography/muted.svelte';
	import { Person, Trash } from 'radix-icons-svelte';
	import { toast } from 'svelte-sonner';
	import { scale } from 'svelte/transition';
	import ConfirmDeleteGroupDialog from './confirm-delete-group-dialog.svelte';

	export let group: Group;

	$: isCurrent = $page.params.groupId === group.id;
	$: isAdmin = $userStore?.id === group.adminId;

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
</script>

<ContextMenu.Root>
	<ContextMenu.Trigger>
		<HoverCard.Root openDelay={50} closeDelay={50}>
			<HoverCard.Trigger class="relative flex" href={urls.app.groups.root + '/' + group.id}>
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
			<HoverCard.Content align="end" sideOffset={-72} alignOffset={64}>
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
	</ContextMenu.Trigger>
	<ContextMenu.Content class="w-64">
		<ContextMenu.Item class="space-x-1" on:click={handleDeleteClick}>
			<Trash />
			<p>Delete</p>
		</ContextMenu.Item>
	</ContextMenu.Content>
</ContextMenu.Root>

<ConfirmDeleteGroupDialog {group} bind:open={openDeleteDialog} on:confirm={handleDeleteGroup} />
