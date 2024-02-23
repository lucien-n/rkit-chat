<script lang="ts">
	import { Button } from '$shadcn/button';
	import { Input } from '$shadcn/input';
	import type { Group } from '$shared/modules/groups/group.entity';
	import { MessagesController } from '$shared/modules/messages/messages.controller';
	import {
		createMessageSchema,
		type CreateMessageInput
	} from '$shared/modules/messages/schemas/create-message.schema';
	import { PaperPlane } from 'radix-icons-svelte';

	export let group: Group;

	let content: string = '';

	const createMessage = async (inputs: CreateMessageInput) => {
		const message = await MessagesController.create(inputs, group.id);
		console.log(message);
	};

	const handleSubmit = () => {
		try {
			const inputs = createMessageSchema.parse({ content });
			createMessage(inputs);
		} catch (e) {
			console.error(e);
		}
	};

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key !== 'Enter') return;
		handleSubmit();
	};
</script>

<div class="flex gap-1 divide-x-2">
	<Input
		bind:value={content}
		on:keydown={handleKeyDown}
		placeholder="Send a message to {group.name}"
	/>
	<Button class="flex gap-2" on:click={handleSubmit}>
		<PaperPlane />
		Send
	</Button>
</div>
