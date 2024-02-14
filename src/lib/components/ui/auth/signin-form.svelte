<script lang="ts">
	import { signinSchema, type SigninSchema } from '$lib/schemas/signin.schema';
	import * as Form from '$shadcn/form';
	import type { SuperValidated } from 'sveltekit-superforms';

	export let form: SuperValidated<SigninSchema>;
</script>

<Form.Root {form} schema={signinSchema} let:config>
	<Form.Field {config} name="email">
		<Form.Item>
			<Form.Label>Email</Form.Label>
			<Form.Validation />
			<Form.Input type="email" placeholder="john.doe@mail.com" required />
		</Form.Item>
	</Form.Field>
	<br />
	<Form.Field {config} name="password">
		<Form.Item>
			<Form.Label>Password</Form.Label>
			<Form.Validation />
			<Form.Input type="password" placeholder="●●●●●●●●" required />
		</Form.Item>
	</Form.Field>
	<br />
	<Form.Button class="w-full">Sign In</Form.Button>
</Form.Root>
