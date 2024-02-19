<script lang="ts">
	import * as Avatar from '$shadcn/avatar';
	import * as Dropdown from '$shadcn/dropdown-menu';
	import urls from '$lib/urls';
	import { Exit } from 'radix-icons-svelte';
	import { enhance } from '$app/forms';
</script>

<Dropdown.Root>
	<Dropdown.Trigger class="avatar">
		<Avatar.Root class="h-full w-full">
			<Avatar.Image src="https://avatars.githubusercontent.com/u/77048269?v=4" alt="avatar" />
			<Avatar.Fallback>UK</Avatar.Fallback>
		</Avatar.Root>
	</Dropdown.Trigger>
	<Dropdown.Content>
		<Dropdown.Group>
			<Dropdown.Label>My Account</Dropdown.Label>
			<form method="post" action={urls.auth.signout} use:enhance>
				<button type="submit" class="flex items-center gap-2 px-2 py-1">
					<Exit /> Sign Out
				</button>
			</form>
		</Dropdown.Group>
	</Dropdown.Content>
</Dropdown.Root>
