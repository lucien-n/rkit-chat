<script lang="ts">
	import { contry } from '$helpers/contry';
	import { Button } from '$shadcn/button';
	import { Card } from '$shadcn/card';
	import { FriendRequestsController } from '$shared/modules/friend-requests/friend-requests.controller';
	import type { User } from '$shared/modules/users/user.entity';
	import { H1, H3, Large } from '$typography';
	import SendFriendRequestForm from '$ui/friend/send-friend-request-form.svelte';
	import UserMini from '$ui/user/user-mini.svelte';
	import { toast } from 'svelte-sonner';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ user, friends, receivedFriendRequests, sentFriendRequests } = data);

	const handleAcceptFriendRequest = async (sender: User) => {
		contry(
			async () => {
				await FriendRequestsController.accept(sender.id);
			},
			() => toast.success(`${sender.handle} is now your friend`),
			() => toast.error(`Could not accept friend request from ${sender.handle}`)
		);
	};
</script>

<div class="p-3">
	<H1>{user?.username}</H1>
	<div class="w-fit">
		<SendFriendRequestForm
			data={data.sendFriendRequestForm}
			on:failure={({ detail }) => {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				const { message } = detail.data;
				if (!message) return;
				toast.error(message);
			}}
			on:success={() => {
				toast.success('Friend request sent');
			}}
		/>
	</div>

	<div class="grid w-full grid-cols-3 gap-8">
		<div class="flex flex-col gap-3">
			<H3>Friends</H3>
			{#each friends as user}
				<Card class="flex items-center gap-5 px-5 py-3">
					<UserMini {user} />
					<Large>{user.username}</Large>
				</Card>
			{/each}
		</div>
		<div class="flex flex-col gap-3">
			<H3>Friend requests</H3>
			{#each receivedFriendRequests as user}
				<Card class="flex items-center gap-5 px-5 py-3">
					<UserMini {user} />
					<div class="flex flex-col">
						From
						<Large>{user.username}</Large>
					</div>
					<!-- TODO: Decline received friend request -->
					<!-- <Button on:click={() => handleDeclineFriendRequest(user)}>Decline</Button> -->
					<Button class="ml-auto" on:click={() => handleAcceptFriendRequest(user)}>Accept</Button>
				</Card>
			{/each}
		</div>
		<div class="flex flex-col gap-3">
			<H3>Sent requests</H3>
			{#each sentFriendRequests as user}
				<Card class="flex items-center gap-5 px-5 py-3">
					<UserMini {user} />
					<div class="flex flex-col">
						To
						<Large>{user.username}</Large>
					</div>
					<!-- TODO: Cancel sent friend request -->
					<!-- <Button on:click={() => handleCancelFriendRequest(user)}>Cancel</Button> -->
				</Card>
			{/each}
		</div>
	</div>
</div>
