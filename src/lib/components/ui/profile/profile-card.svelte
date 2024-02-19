<script lang="ts">
	import * as Dropdown from '$shadcn/dropdown-menu';
	import urls from '$lib/urls';
	import { Exit } from 'radix-icons-svelte';
	import { enhance } from '$app/forms';
	import ProfileAvatar from './profile-avatar.svelte';
</script>

<Dropdown.Root>
	<Dropdown.Trigger>
		<ProfileAvatar />
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
