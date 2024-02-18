<script lang="ts">
	import SignupForm from '$ui/auth/signup-form.svelte';
	import AuthLayout from '$layouts/auth-layout.svelte';
	import type { PageData } from './$types';
	import urls from '$lib/urls';
	import { Button } from '$shadcn/button';
	import { Separator } from '$shadcn/separator';
	import { QuestionMarkCircled } from 'radix-icons-svelte';

	export let data: PageData;

	$: ({ form } = data);
</script>

<AuthLayout>
	<svelte:fragment slot="header">Sign Up</svelte:fragment>
	<SignupForm {form} />
	<svelte:fragment slot="footer">
		<div class="flex flex-col">
			<Separator class="my-3" />
			<div class="flex items-center gap-1 text-muted-foreground">
				<QuestionMarkCircled />
				Already have an account?
				<Button variant="link" class="ml-1 p-0 text-base" href={urls.auth.signin}>Sign In</Button>
			</div>
		</div>
	</svelte:fragment>
</AuthLayout>
