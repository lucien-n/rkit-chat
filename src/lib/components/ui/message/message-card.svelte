<script lang="ts">
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
			<Large>
				{message.author?.username}
			</Large>
			<Muted class="text-[.75rem]">
				{moment(message.createdAt).fromNow()}
			</Muted>
		</div>
		<p>{message.content}</p>
	</div>
</div>
