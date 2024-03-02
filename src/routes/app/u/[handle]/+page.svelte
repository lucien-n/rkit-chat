<script lang="ts">
	import { H1, H3, Large } from '$typography';
	import AddFriendForm from '$ui/friend/add-friend-form.svelte';
	import { toast } from 'svelte-sonner';
	import type { PageData } from './$types';
	import { Button } from '$shadcn/button';
	import { contry } from '$helpers/contry';
	import { FriendRequestsController } from '$shared/modules/friend-requests/friend-requests.controller';
	import type { User } from '$shared/modules/users/user.entity';
	import { Card } from '$shadcn/card';
	import { Separator } from '$shadcn/separator';

	export let data: PageData;

	$: ({ user, receivedFriendRequests } = data);

	const handleAcceptFriendRequest = async (sender: User) => {
		contry(
			async () => {
				await FriendRequestsController.acceptFriendRequest(sender.id);
			},
			() => toast.success(`${sender.handle} is now your friend`),
			() => toast.error(`Could not accept friend request from ${sender.handle}`)
		);
	};
</script>

<div class="p-3">
	<H1>{user?.username}</H1>
	<div class="w-fit">
		<AddFriendForm
			data={data.addFriendForm}
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

	<div class="flex flex-col gap-3">
		<H3>Friend requests</H3>
		{#each receivedFriendRequests as user}
			<Card class="flex w-fit items-center gap-5 px-5 py-3">
				<div class="flex flex-col">
					From
					<Large>{user.username}</Large>
				</div>
				<Separator orientation="vertical" class="h-12" />
				<Button on:click={() => handleAcceptFriendRequest(user)}>Accept</Button>
			</Card>
		{/each}
	</div>
</div>
