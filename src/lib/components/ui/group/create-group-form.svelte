<script lang="ts">
	import * as Form from '$shadcn/form';
	import {
		createGroupSchema,
		type CreateGroupSchema
	} from '$shared/modules/groups/schemas/create-group.schema';
	import { Plus } from 'radix-icons-svelte';
	import type { SuperValidated } from 'sveltekit-superforms';

	export let form: SuperValidated<CreateGroupSchema>;

	$: console.log('create-group-form', form);
</script>

<Form.Root {form} schema={createGroupSchema} let:config>
	<form action="?/createGroup" method="post" class="flex items-end gap-2">
		<Form.Field {config} name="name">
			<Form.Item class="w-full">
				<Form.Validation />
				<Form.Input type="text" placeholder="Group name" class="w-full" required />
			</Form.Item>
		</Form.Field>
		<br />
		<Form.Button class="flex gap-2">
			<Plus />
			Create
		</Form.Button>
	</form>
</Form.Root>
