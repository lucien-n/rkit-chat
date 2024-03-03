<script lang="ts">
	import type { DispatchActionResult } from '$lib/types';
	import { getAction } from '$lib/urls';
	import * as Form from '$shadcn/form';
	import { Input } from '$shadcn/input';
	import {
		addFriendSchema,
		type AddFriendSchema
	} from '$shared/modules/friend-requests/schemas/add-friend.schema';
	import { PaperPlane } from 'radix-icons-svelte';
	import { createEventDispatcher } from 'svelte';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data: SuperValidated<Infer<AddFriendSchema>>;

	const dispatch = createEventDispatcher<DispatchActionResult>();

	const form = superForm(data, {
		validators: zodClient(addFriendSchema),
		onResult: ({ result }) => {
			dispatch(result.type, result);
		}
	});

	const { form: formData, enhance } = form;
</script>

<form action={getAction('addFriend')} method="post" class="flex gap-1" use:enhance>
	<Form.Field {form} name="handle" class="w-full">
		<Form.Control let:attrs>
			<Input {...attrs} bind:value={$formData.handle} placeholder="Handle" />
		</Form.Control>
	</Form.Field>
	<br />
	<Form.Button size="icon" class="self-end">
		<PaperPlane />
	</Form.Button>
</form>
