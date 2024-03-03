<script lang="ts">
	import { H1, H3 } from '$typography';
	import SendFriendRequestForm from '$ui/friend/forms/send-friend-request-form.svelte';
	import FriendCard from '$ui/friend/friend-card.svelte';
	import PendingFriend from '$ui/friend/pending-friend.svelte';
	import { toast } from 'svelte-sonner';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ user, friends, receivedFriendRequests, sentFriendRequests } = data);
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
				<FriendCard {user} />
			{/each}
		</div>
		<div class="flex flex-col gap-3">
			<H3>Friend requests</H3>
			{#each receivedFriendRequests as user}
				<PendingFriend {user} status="received" />
			{/each}
		</div>
		<div class="flex flex-col gap-3">
			<H3>Sent requests</H3>
			{#each sentFriendRequests as user}
				<PendingFriend {user} status="sent" />
			{/each}
		</div>
	</div>
</div>
