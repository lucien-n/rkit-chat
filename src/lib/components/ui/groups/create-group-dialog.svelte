<script lang="ts">
	import * as Dialog from '$shadcn/dialog';
	import type { SuperValidated } from 'sveltekit-superforms';
	import CreateGroupForm from './create-group-form.svelte';
	import type { CreateGroupSchema } from '$shared/modules/groups/schemas/create-group.schema';
	import { Plus } from 'radix-icons-svelte';

	export let form: SuperValidated<CreateGroupSchema>;
</script>

<Dialog.Root>
	<Dialog.Trigger class="flex items-center justify-center rounded-full border">
		<Plus size={16} />
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>New group</Dialog.Title>
			<Dialog.Description>Create a chat group</Dialog.Description>
		</Dialog.Header>
		<CreateGroupForm {form} />
	</Dialog.Content>
</Dialog.Root>
