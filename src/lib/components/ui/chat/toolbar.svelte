<script lang="ts">
	import { Separator } from '$shadcn/separator';
	import type { Group } from '$shared/modules/groups/group.entity';
	import type { CreateGroupSchema } from '$shared/modules/groups/schemas/create-group.schema';
	import CreateGroupDialog from '$ui/group/create-group-dialog.svelte';
	import GroupAvatar from '$ui/group/group-avatar.svelte';
	import ProfileMini from '$ui/profile/profile-mini.svelte';
	import type { SuperValidated } from 'sveltekit-superforms';

	export let groups: Group[];
	export let groupForm: SuperValidated<CreateGroupSchema>;
</script>

<div class="flex h-full flex-col items-center gap-4 rounded-md border p-3">
	<ProfileMini />
	<Separator />
	<div class="flex h-full flex-col justify-between">
		<div class="flex flex-col gap-3">
			{#each groups as group}
				<GroupAvatar {group} />
			{/each}
		</div>
		<!-- TODO: create group dialog directly using remult and not sveltekit forms OR find a cleaner way to use forms (endpoints) -->
		<CreateGroupDialog form={groupForm} />
	</div>
</div>
