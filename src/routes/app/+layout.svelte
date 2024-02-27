<script lang="ts">
	import Toolbar from '$ui/chat/toolbar.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	$: ({ groups, groupForm } = data);
</script>

<div class="flex h-full w-full gap-6 p-6">
	<Toolbar {groups} {groupForm} />
	<div class="flex h-full w-full flex-col gap-4 rounded-lg border">
		<slot />
	</div>
</div>
