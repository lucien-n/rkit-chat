<script lang="ts">
	import urls from '$lib/urls';
	import { Button } from '$shadcn/button';
	import { Message } from '$shared/modules/messages/message.entity';
	import { Large, Muted } from '$typography';
	import UserMini from '$ui/user/user-mini.svelte';
	import moment from 'moment';

	export let message: Message;
</script>

<div class="flex w-full gap-3 py-1">
	<div class="self-center">
		<UserMini user={message.author} />
	</div>
	<div class="flex-col">
		<div class="flex items-center gap-2">
			<Button variant="link" href={urls.app.user.root + '/' + message.author?.id} class="px-0">
				<Large>
					{message.author?.username}
				</Large>
			</Button>
			<Muted class="text-[.75rem]">
				{moment(message.createdAt).fromNow()}
			</Muted>
		</div>
		<p>{message.content}</p>
	</div>
</div>
