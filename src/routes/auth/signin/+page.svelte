<script lang="ts">
	import AuthLayout from '$layouts/auth-layout.svelte';
	import SigninForm from '$lib/components/ui/auth/signin-form.svelte';
	import urls from '$lib/urls';
	import { Button } from '$shadcn/button';
	import { Separator } from '$shadcn/separator';
	import { QuestionMarkCircled } from 'radix-icons-svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<AuthLayout>
	<svelte:fragment slot="header">Sign In</svelte:fragment>
	<SigninForm data={data.form} />
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
