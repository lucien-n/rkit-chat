<script lang="ts">
	import { getGroup } from '$contexts/group';
	import { Badge } from '$shadcn/badge';
	import Separator from '$shadcn/separator/separator.svelte';
	import { userStore } from '$stores/stores';
	import { H3, Muted } from '$typography';

	let group = getGroup();
</script>

{#if $group}
	<div class="w-full self-start rounded-t-md px-4 py-2">
		<div class="flex items-center gap-2">
			<H3>{$group.name}</H3>
			{#if $group.adminId === $userStore?.id}
				<Badge variant="outline">Admin</Badge>
			{/if}
		</div>
		<Muted>{$group.userCount} user(s)</Muted>
		<Separator class="mt-2" />
	</div>
{/if}
