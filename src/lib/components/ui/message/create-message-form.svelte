<script lang="ts">
	import { enhance } from '$app/forms';
	import * as Form from '$shadcn/form';
	import {
		createMessageSchema,
		type CreateMessageSchema
	} from '$shared/modules/messages/schemas/create-message.schema';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { PaperPlane } from 'radix-icons-svelte';
	import type { SuperValidated } from 'sveltekit-superforms';

	export let form: SuperValidated<CreateMessageSchema>;

	let formElement: HTMLFormElement;
	let loading = false;

	const handleSubmit: SubmitFunction = () => {
		loading = true;

		return async () => {
			loading = false;
		};
	};

	const handleKeydown = (event: KeyboardEvent) => {
		if (event.key === 'Enter') {
			formElement.submit();
		}
	};
</script>

<Form.Root {form} schema={createMessageSchema} let:config>
	<form
		action="?/createMessage"
		class="flex items-end gap-2"
		bind:this={formElement}
		use:enhance={handleSubmit}
	>
		<Form.Field {config} name="content">
			<Form.Item class="w-full">
				<Form.Validation />
				<Form.Input
					type="text"
					placeholder="Type your message..."
					class="w-full"
					required
					on:keydown={handleKeydown}
				/>
			</Form.Item>
		</Form.Field>
		<br />
		<Form.Button class="flex gap-2" disabled={loading}>
			<PaperPlane />
			Send
		</Form.Button>
	</form>
</Form.Root>
