<script lang="ts">
	import { page } from '$app/stores';
	import { Separator } from '$shadcn/separator';
	import type { Group } from '$shared/modules/groups/group.entity';
	import type { CreateGroupSchema } from '$shared/modules/groups/schemas/create-group.schema';
	import CreateGroupDialog from '$ui/group/dialogs/create-group-dialog.svelte';
	import GroupMini from '$ui/group/group-mini.svelte';
	import UserMini from '$ui/user/user-mini.svelte';
	import { backOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';

	export let groups: Group[];
	export let groupForm: SuperValidated<Infer<CreateGroupSchema>>;

	const [send, receive] = crossfade({
		duration: 300,
		easing: backOut
	});
	const key = 'toolbar-current-group';
</script>

<div class="flex h-full flex-col items-center gap-4 rounded-md border p-3">
	<UserMini />
	<Separator />
	<div class="flex h-full flex-col justify-between">
		<div class="flex flex-col gap-3">
			{#each groups as group}
				{@const current = $page.params.groupId === group.id}
				<div class="relative flex">
					{#if current}
						<div
							in:receive={{ key }}
							out:send={{ key }}
							class="absolute -left-3 z-10 h-12 w-[.35rem] self-center rounded-r bg-primary"
						/>
					{/if}
					<GroupMini {group} />
				</div>
			{/each}
		</div>
		<!-- TODO: create group dialog directly using remult and not sveltekit forms OR find a cleaner way to use forms (endpoints) -->
		<CreateGroupDialog form={groupForm} />
	</div>
</div>
