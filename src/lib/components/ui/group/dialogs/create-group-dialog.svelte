<script lang="ts">
	import { onFormFailure } from '$helpers/forms';
	import * as Dialog from '$shadcn/dialog';
	import type { CreateGroupSchema } from '$shared/modules/groups/schemas/create-group.schema';
	import { Plus } from 'radix-icons-svelte';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import CreateGroupForm from '../forms/create-group-form.svelte';

	export let form: SuperValidated<Infer<CreateGroupSchema>>;

	let open = false;
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger class="flex h-14 w-14 items-center justify-center rounded-2xl border">
		<Plus size={16} />
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>New group</Dialog.Title>
			<Dialog.Description>Create a chat group</Dialog.Description>
		</Dialog.Header>
		<CreateGroupForm data={form} on:success={() => (open = false)} on:failure={onFormFailure} />
	</Dialog.Content>
</Dialog.Root>
