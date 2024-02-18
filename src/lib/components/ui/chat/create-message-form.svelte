<script lang="ts">
	import * as Form from '$shadcn/form';
	import {
		createMessageSchema,
		type CreateMessageSchema
	} from '$shared/modules/messages/schemas/create-message.schema';
	import { PaperPlane } from 'radix-icons-svelte';
	import type { SuperValidated } from 'sveltekit-superforms';

	export let form: SuperValidated<CreateMessageSchema>;

	$: console.log(form.message);
</script>

<Form.Root {form} schema={createMessageSchema} let:config class="flex items-end gap-2">
	<Form.Field {config} name="content">
		<Form.Item class="w-full">
			<Form.Validation />
			<Form.Input type="text" placeholder="Type your message..." class="w-full" required />
		</Form.Item>
	</Form.Field>
	<br />
	<Form.Button class="flex gap-2">
		<PaperPlane />
		Send
	</Form.Button>
</Form.Root>
