<script lang="ts">
	import { userStore } from '$lib/stores';
	import * as Avatar from '$shadcn/avatar';
	import * as Dropdown from '$shadcn/dropdown-menu';
	import { Large } from '$typography';
	import urls from '$lib/urls';
	import { Exit } from 'radix-icons-svelte';
	import { enhance } from '$app/forms';
</script>

<div class="grid h-full w-full grid-cols-4 gap-8 p-8">
	<div class="flex h-full flex-col gap-8">
		<div class="flex gap-3 rounded border px-5 py-3">
			<Dropdown.Root>
				<Dropdown.Trigger>
					<Avatar.Root class="h-12 w-12 ">
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
			<div class="self-center">
				<Large>{$userStore?.name ?? 'Unknown'}</Large>
			</div>
		</div>
		<div class="h-full w-full rounded-md border" />
	</div>
	<div class="col-span-3 h-full">
		<div class="h-full w-full rounded-md border" />
	</div>
</div>
