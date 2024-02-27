<script lang="ts">
	import * as Form from '$shadcn/form';
	import { Input } from '$shadcn/input';
	import { signinSchema, type SigninSchema } from '$shared/modules/auth/schemas/signin.schema';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data: SuperValidated<Infer<SigninSchema>>;

	const form = superForm(data, {
		validators: zodClient(signinSchema)
	});

	const { form: formData, enhance, submitting } = form;
</script>

<form method="post" use:enhance>
	<Form.Field {form} name="email" class="w-full">
		<Form.Control let:attrs>
			<Form.Label>Email</Form.Label>
			<Input
				{...attrs}
				bind:value={$formData.email}
				type="email"
				placeholder="john.doe@mail.com"
				class="w-full"
				autocomplete="username"
				required
			/>
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>
	<br />
	<Form.Field {form} name="password" class="w-full">
		<Form.Control let:attrs>
			<Form.Label>Password</Form.Label>
			<Input
				{...attrs}
				bind:value={$formData.password}
				type="password"
				placeholder="●●●●●●●●"
				class="w-full"
				autocomplete="current-password"
				required
			/>
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>
	<br />
	<Form.Button class="w-full">{$submitting ? 'Signing In...' : 'Sign In'}</Form.Button>
</form>
