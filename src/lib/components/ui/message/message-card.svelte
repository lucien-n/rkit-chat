<script lang="ts">
	import { cn } from '$cn';
	import { userStore } from '$lib/stores/stores';
	import { Card } from '$shadcn/card';
	import type { Message } from '$shared/modules/messages/message.entity';
	import { Muted, Large } from '$typography';
	import UserMini from '$ui/user/user-mini.svelte';
	import moment from 'moment';

	export let message: Message;

	$: isSelf = $userStore?.id === message.author?.id;
</script>

<div
	class={cn(
		' relative flex w-fit min-w-48 gap-2 ',
		isSelf ? 'flex-row-reverse self-end border-blue-300' : ''
	)}
>
	<div class="self-start rounded-2xl border">
		<UserMini user={message.author} />
	</div>
	<Card class="flex flex-col p-2 px-3">
		<div class={cn('flex items-center gap-2', isSelf && 'flex-row-reverse')}>
			<Large>
				{message.author?.username}
			</Large>
			<Muted class="text-[.75rem]">
				{moment(message.createdAt).fromNow()}
			</Muted>
		</div>
		<p class={cn(isSelf && 'self-end')}>{message.content}</p>
	</Card>
</div>
