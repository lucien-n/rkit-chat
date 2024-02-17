<script lang="ts">
	import { enhance } from '$app/forms';
	import urls from '$lib/urls';
	import { Button } from '$shadcn/button';
	import { Home, Enter, Exit } from 'radix-icons-svelte';
	import type { UserInfo } from 'remult';

	export let user: UserInfo | undefined;
</script>

<nav class="fixed left-0 top-0 flex w-full gap-3 p-3">
	<ul>
		<li><Button href={urls.home} class="flex gap-1"><Home /> Home</Button></li>
	</ul>
	{#if !user}
		<ul>
			<li><Button href={urls.auth.signin} class="flex gap-1"><Enter /> Sign In</Button></li>
		</ul>
		<ul>
			<li><Button href={urls.auth.signup} class="flex gap-1"><Enter /> Sign Up</Button></li>
		</ul>
	{:else}
		<ul>
			<li>
				<form action={urls.auth.signout} method="post" use:enhance>
					<Button type="submit" class="flex gap-1"><Exit /> Sign Out</Button>
				</form>
			</li>
		</ul>
	{/if}
</nav>
