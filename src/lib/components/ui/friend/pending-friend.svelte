<script lang="ts">
	import { contry } from '$helpers/contry';
	import * as Card from '$shadcn/card';
	import { FriendRequestsController } from '$shared/modules/friend-requests/friend-requests.controller';
	import type { User } from '$shared/modules/users/user.entity';
	import { Large } from '$typography';
	import UserMini from '$ui/user/user-mini.svelte';
	import { toast } from 'svelte-sonner';
	import { Button } from '$shadcn/button';

	export let user: User;
	export let status: 'received' | 'sent';

	const handleAcceptFriendRequest = async (sender: User) => {
		contry(
			async () => {
				await FriendRequestsController.accept(sender.id);
			},
			() => toast.success(`${sender.handle} is now your friend`),
			() => toast.error(`Could not accept friend request from ${sender.handle}`)
		);
	};

	const handleDeclineFriendRequest = async (sender: User) => {
		contry(
			async () => {
				await FriendRequestsController.decline(sender.id);
			},
			undefined,
			() => toast.error(`Could not decline friend request from ${sender.handle}`)
		);
	};

	const handleCancelFriendRequest = async (receiver: User) => {
		console.log(receiver);
	};
</script>

<Card.Root class="flex items-center">
	<Card.Content class="flex w-full items-center gap-5 px-5 py-3">
		<UserMini {user} />
		<div class="flex flex-col">
			{status === 'received' ? 'From' : 'To'}
			<Large>{user.username}</Large>
		</div>
		<div class="ml-auto flex gap-3">
			{#if status === 'received'}
				<Button variant="secondary" on:click={() => handleDeclineFriendRequest(user)}
					>Decline</Button
				>
				<Button on:click={() => handleAcceptFriendRequest(user)}>Accept</Button>
			{:else}
				<Button on:click={() => handleCancelFriendRequest(user)}>Accept</Button>
			{/if}
		</div>
	</Card.Content>
</Card.Root>
