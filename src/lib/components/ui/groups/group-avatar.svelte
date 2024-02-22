<script lang="ts">
	import * as Avatar from '$shadcn/avatar';
	import type { Group } from '$shared/modules/groups/group.entity';
	import * as HoverCard from '$shadcn/hover-card';
	import { Large } from '$typography';
	import urls from '$lib/urls';
	import { page } from '$app/stores';
	import { scale } from 'svelte/transition';
	import Muted from '$typography/muted.svelte';
	import { Person } from 'radix-icons-svelte';
	import { userStore } from '$lib/stores/stores';
	import { Badge } from '$shadcn/badge';

	export let group: Group;

	$: isCurrent = $page.params.groupId === group.id;
	$: isAdmin = $userStore?.id === group.adminId;
</script>

<HoverCard.Root openDelay={50} closeDelay={50}>
	<HoverCard.Trigger class="relative flex" href={urls.groups + '/' + group.id}>
		{#if isCurrent}
			<div
				class="absolute -left-3 h-5/6 w-2 self-center rounded-r-md bg-primary"
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
			<Muted>{group.profiles?.length}</Muted>
		</div>
	</HoverCard.Content>
</HoverCard.Root>
