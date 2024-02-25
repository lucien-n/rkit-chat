<script lang="ts">
	import { cn } from '$cn';
	import * as AlertDialog from '$shadcn/alert-dialog';
	import { buttonVariants } from '$shadcn/button';
	import type { Group } from '$shared/modules/groups/group.entity';
	import { Trash } from 'radix-icons-svelte';
	import { createEventDispatcher } from 'svelte';

	export let open = false;
	export let group: Group;

	const dispatch = createEventDispatcher();
</script>

<AlertDialog.Root bind:open>
	<AlertDialog.Content>
		<AlertDialog.Title>Delete <strong>{group.name}</strong>?</AlertDialog.Title>
		<AlertDialog.Description>
			This action cannot be undone. This will permanently delete <strong>{group.name}</strong>.
		</AlertDialog.Description>
		<AlertDialog.Footer>
			<AlertDialog.Cancel on:click={() => dispatch('cancel')}>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action
				on:click={() => dispatch('confirm')}
				class={cn(buttonVariants({ variant: 'destructive' }), 'space-x-1')}
			>
				<Trash />
				<p>Delete</p>
			</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
