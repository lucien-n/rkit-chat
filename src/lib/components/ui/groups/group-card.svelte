<script lang="ts">
	import { userStore } from '$lib/stores/stores';
	import { Badge } from '$shadcn/badge';
	import type { Group } from '$shared/modules/groups/group.entity';
	import { Large } from '$typography';

	export let group: Group;
</script>

<div class="rounded-md border p-3">
	<Large>{group.name}</Large>
	{#if group.adminId === $userStore?.id}
		<Badge>Admin</Badge>
	{/if}
</div>
