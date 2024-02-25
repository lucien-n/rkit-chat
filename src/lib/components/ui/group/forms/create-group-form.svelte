<script lang="ts">
	import * as Form from '$shadcn/form';
	import { Input } from '$shadcn/input';
	import {
		createGroupSchema,
		type CreateGroupSchema
	} from '$shared/modules/groups/schemas/create-group.schema';
	import { Plus } from 'radix-icons-svelte';
	import { createEventDispatcher } from 'svelte';
	import { superForm, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient, type Infer } from 'sveltekit-superforms/adapters';

	export let data: SuperValidated<Infer<CreateGroupSchema>>;

	const dispatch = createEventDispatcher();

	const form = superForm(data, {
		validators: zodClient(createGroupSchema),
		onResult: ({ result }) => {
			dispatch(result.type, result);
		}
	});

	const { form: formData, enhance, submitting } = form;
</script>

<form action="?/createGroup" method="post" class="flex gap-2" use:enhance>
	<Form.Field {form} name="name" class="w-full">
		<Form.Control let:attrs>
			<Form.Label>Name</Form.Label>
			<Input
				{...attrs}
				bind:value={$formData.name}
				type="text"
				placeholder="Group name"
				class="w-full"
				required
			/>
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>
	<br />
	<Form.Button class="mb-2 flex gap-2 self-end" disabled={$submitting}>
		<Plus />
		Create
	</Form.Button>
</form>
