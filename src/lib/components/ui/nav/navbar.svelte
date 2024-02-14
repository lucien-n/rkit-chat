<script lang="ts">
	import urls from '$lib/urls';
	import { Button } from '$shadcn/button';
	import { Home, Enter, Exit } from 'radix-icons-svelte';
</script>

<nav class="fixed left-0 top-0 flex w-full gap-3 p-3">
	<ul>
		<li><Button href={urls.home} class="flex gap-1"><Home /> Home</Button></li>
	</ul>
	<ul>
		<li><Button href={urls.auth.signin} class="flex gap-1"><Enter /> Sign In</Button></li>
	</ul>
	<ul>
		<li><Button href={urls.auth.signup} class="flex gap-1"><Enter /> Sign Up</Button></li>
	</ul>
	<ul>
		<li><Button href={urls.auth.signout} class="flex gap-1"><Exit /> Sign Out</Button></li>
	</ul>
</nav>
