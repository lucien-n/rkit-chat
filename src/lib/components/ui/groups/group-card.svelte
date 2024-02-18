<script lang="ts">
	import { cn } from '$cn';
	import { userStore } from '$lib/stores/stores';
	import { Badge } from '$shadcn/badge';
	import type { Group } from '$shared/modules/groups/group.entity';
	import { Large } from '$typography';

	export let group: Group;
	export let selected: boolean = false;
</script>

<div class={cn('rounded-md border p-3', selected ? 'border-secondary-foreground' : '')}>
	<Large>{group.name}</Large>
	{#if group.adminId === $userStore?.id}
		<Badge>Admin</Badge>
	{/if}
</div>
