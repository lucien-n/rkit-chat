<script lang="ts">
	import { H1 } from '$typography';
	import AddFriendForm from '$ui/friend/add-friend-form.svelte';
	import { toast } from 'svelte-sonner';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ user } = data);
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
</div>
