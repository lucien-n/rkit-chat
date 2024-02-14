<script lang="ts">
	import SigninForm from '$lib/components/ui/auth/signin-form.svelte';
	import AuthLayout from '$lib/components/layouts/auth-layout.svelte';
	import type { PageData } from './$types';
	import { Separator } from '$shadcn/separator';
	import { QuestionMarkCircled } from 'radix-icons-svelte';
	import { Button } from '$shadcn/button';
	import urls from '$lib/urls';

	export let data: PageData;

	$: ({ form } = data);
</script>

<AuthLayout>
	<svelte:fragment slot="header">Sign In</svelte:fragment>
	<SigninForm {form} />
	<svelte:fragment slot="footer">
		<div class="flex flex-col">
			<Separator class="my-3" />
			<div class="flex items-center gap-1 text-muted-foreground">
				<QuestionMarkCircled />
				Don't have an account yet?
				<Button variant="link" class="ml-1 p-0 text-base" href={urls.auth.signup}>Sign Up</Button>
			</div>
		</div>
	</svelte:fragment>
</AuthLayout>
