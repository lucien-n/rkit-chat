<script lang="ts">
	import { page } from '$app/stores';
	import { getPercentage } from '$helpers/helper';
	import { getAction } from '$lib/urls';
	import * as Form from '$shadcn/form';
	import messageRules from '$shared/modules/messages/message.rules';
	import {
		sendMessageSchema,
		type SendMessageSchema
	} from '$shared/modules/messages/schemas/send-message.schema';
	import DynamicTextarea from '$ui/chat/dynamic-textarea.svelte';
	import { PaperPlane } from 'radix-icons-svelte';
	import { fade } from 'svelte/transition';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data: SuperValidated<Infer<SendMessageSchema>>;

	const form = superForm(data, {
		validators: zodClient(sendMessageSchema),
		resetForm: true
	});

	const { form: formData, enhance, submit } = form;

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			submit();
		}
	};
</script>

<form
	action={getAction('sendMessage', { groupId: $page.params.groupId })}
	method="post"
	class="flex gap-1"
	use:enhance
>
	<Form.Field {form} name="content" class="w-full">
		<Form.Control let:attrs>
			<div class="relative">
				<DynamicTextarea
					{...attrs}
					bind:value={$formData.content}
					placeholder="Type your message..."
					class="min-h-0 w-full resize-none overflow-hidden"
					minlength={messageRules.field.content.min}
					maxlength={messageRules.field.content.max}
					on:keydown={handleKeyDown}
				/>

				{#if getPercentage($formData.content.length, messageRules.field.content.max) > 75}
					<div
						transition:fade={{ duration: 150 }}
						class="absolute bottom-0 right-1 select-none p-1 text-sm text-muted-foreground"
					>
						<p>{$formData.content.length}/{messageRules.field.content.max}</p>
					</div>
				{/if}
			</div>
		</Form.Control>
	</Form.Field>
	<br />
	<Form.Button size="icon" class="self-end">
		<PaperPlane />
	</Form.Button>
</form>
