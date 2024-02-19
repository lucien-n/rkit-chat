<script lang="ts">
	import { cn } from '$cn';
	import * as Avatar from '$shadcn/avatar';
	import type { Group } from '$shared/modules/groups/group.entity';

	export let group: Group;
	export let selected: boolean = false;
</script>

<Avatar.Root class={cn('h-full w-full', selected && 'border border-2 border-primary')}>
	<Avatar.Image></Avatar.Image>
	<Avatar.Fallback>{group.name?.slice(0, 2)}</Avatar.Fallback>
</Avatar.Root>
