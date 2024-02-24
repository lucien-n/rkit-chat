<script lang="ts">
	import * as Avatar from '$shadcn/avatar';
	import type { Group } from '$shared/modules/groups/group.entity';
	import * as HoverCard from '$shadcn/hover-card';
	import { Large } from '$typography';
	import urls from '$lib/urls';
	import { page } from '$app/stores';
	import { scale } from 'svelte/transition';
	import Muted from '$typography/muted.svelte';
	import { Person, Trash } from 'radix-icons-svelte';
	import { userStore } from '$lib/stores/stores';
	import { Badge } from '$shadcn/badge';
	import * as ContextMenu from '$shadcn/context-menu';
	import { GroupsController } from '$shared/modules/groups/groups.controller';
	import { toast } from 'svelte-sonner';
	import type { RemultError } from '$shared/helpers/types';

	export let group: Group;

	$: isCurrent = $page.params.groupId === group.id;
	$: isAdmin = $userStore?.id === group.adminId;

	const handleDeleteGroup = async () => {
		try {
			await GroupsController.delete(group.id);
			toast.success(`Group "${group.name}" deleted`);
		} catch (e) {
			const error = e as RemultError;
			toast.error(error.message);
		}
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
		<ContextMenu.Item class="space-x-1" on:click={handleDeleteGroup}>
			<Trash />
			<p>Delete</p>
		</ContextMenu.Item>
	</ContextMenu.Content>
</ContextMenu.Root>
