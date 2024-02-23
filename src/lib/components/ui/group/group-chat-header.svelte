<script lang="ts">
	import { userStore } from '$lib/stores/stores';
	import { Badge } from '$shadcn/badge';
	import type { Group } from '$shared/modules/groups/group.entity';
	import { H3, Muted } from '$typography';

	export let group: Group;
</script>

<div class="w-full self-start rounded-t-md border-b px-4 py-2">
	<div class="flex items-center gap-2">
		<H3>{group.name}</H3>
		{#if group.adminId === $userStore?.id}
			<Badge variant="outline">Admin</Badge>
		{/if}
	</div>
	<Muted>{group.profiles?.length ?? 0} user(s)</Muted>
</div>
