<script lang="ts">
	import { userStore } from '$lib/stores/stores';
	import * as Avatar from '$shadcn/avatar';
	import * as Dropdown from '$shadcn/dropdown-menu';
	import { Muted, Large } from '$typography';
	import urls from '$lib/urls';
	import { Exit } from 'radix-icons-svelte';
	import { enhance } from '$app/forms';
	import CreateMessageForm from '../ui/chat/create-message-form.svelte';
	import type { SuperValidated } from 'sveltekit-superforms';
	import type { CreateMessageSchema } from '$shared/modules/messages/schemas/create-message.schema';
	import { remultLive } from '$lib/stores/remultLive';
	import { remult } from 'remult';
	import { Message } from '$shared/modules/messages/message.entity';
	import { browser } from '$app/environment';

	export let form: SuperValidated<CreateMessageSchema>;

	const messages = remultLive(remult.repo(Message));

	$: browser &&
		messages.listen({
			orderBy: { createdAt: 'asc' },
			include: { author: true }
		});
</script>

<div class="grid h-full w-full grid-cols-4 gap-6 p-6">
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
	<div class="col-span-3 flex h-full flex-col gap-6">
		<div class="flex h-full w-full flex-col gap-6 overflow-y-scroll rounded-md border p-4">
			{#each $messages.reverse().slice(0, 5).reverse() as message}
				<div class="flex gap-2 rounded-md border p-2">
					<Avatar.Root class="self-center">
						<Avatar.Image src="https://avatars.githubusercontent.com/u/77048269?v=4" alt="avatar" />
						<Avatar.Fallback>UK</Avatar.Fallback>
					</Avatar.Root>
					<div class="flex flex-col">
						<Muted>{message.author?.username}</Muted>
						<p>{message.content}</p>
					</div>
				</div>
			{/each}
		</div>
		<CreateMessageForm {form} />
	</div>
</div>
