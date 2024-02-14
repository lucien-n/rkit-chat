<script lang="ts">
	import urls from '$lib/urls';
	import { Button } from '$shadcn/button';
</script>

<nav class="flex gap-3 p-3">
	<ul>
		<li><Button href={urls.auth.signin}>Sign In</Button></li>
	</ul>
	<ul>
		<li><Button href={urls.auth.signup}>Sign Up</Button></li>
	</ul>
	<ul>
		<li><Button href={urls.auth.signout}>Sign Out</Button></li>
	</ul>
</nav>
