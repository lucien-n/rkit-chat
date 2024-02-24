<script lang="ts">
	import * as Form from '$shadcn/form';
	import { Input } from '$shadcn/input';
	import {
		createMessageSchema,
		type CreateMessageSchema
	} from '$shared/modules/messages/schemas/create-message.schema';
	import { PaperPlane } from 'radix-icons-svelte';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data: SuperValidated<Infer<CreateMessageSchema>>;

	const form = superForm(data, {
		validators: zodClient(createMessageSchema)
	});

	const { form: formData, enhance, submitting } = form;
</script>

<form action="?/createMessage" method="post" class="flex gap-2" use:enhance>
	<Form.Field {form} name="content" class="w-full">
		<Form.Control let:attrs>
			<Input
				{...attrs}
				bind:value={$formData.content}
				type="text"
				placeholder="Type your message..."
				class="w-full"
				required
			/>
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>
	<br />
	<Form.Button class="mb-2 space-x-2 self-end" disabled={$submitting}>
		<PaperPlane />
		Send
	</Form.Button>
</form>
