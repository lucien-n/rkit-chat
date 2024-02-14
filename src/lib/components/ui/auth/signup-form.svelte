<script lang="ts">
	import { type SignupSchema, signupSchema } from '$lib/schemas/signup.schema';
	import * as Form from '$shadcn/form';
	import type { SuperValidated } from 'sveltekit-superforms';

	export let form: SuperValidated<SignupSchema>;
</script>

<Form.Root {form} schema={signupSchema} let:config>
	<Form.Field {config} name="email">
		<Form.Item>
			<Form.Label>Email</Form.Label>
			<Form.Validation />
			<Form.Input type="email" placeholder="john.doe@mail.com" autocomplete="username" required />
		</Form.Item>
	</Form.Field>
	<br />
	<Form.Field {config} name="password">
		<Form.Item>
			<Form.Label>Password</Form.Label>
			<Form.Validation />
			<Form.Input type="password" placeholder="●●●●●●●●" autocomplete="current-password" required />
		</Form.Item>
	</Form.Field>
	<br />
	<Form.Button class="w-full">Sign Up</Form.Button>
</Form.Root>
