<script lang="ts">
	import { cn } from '$cn';
	import { userStore } from '$lib/stores/stores';
	import * as Avatar from '$shadcn/avatar';
	import type { Message } from '$shared/modules/messages/message.entity';
	import { Muted } from '$typography';
	import moment from 'moment';

	export let message: Message;

	$: isSelf = $userStore?.id === message.author?.id;
</script>

<div
	class={cn(
		'relative flex w-fit gap-2 rounded-md border p-2',
		isSelf ? 'flex-row-reverse self-end border-blue-300 pl-8' : ''
	)}
>
	<Avatar.Root class="self-center">
		<Avatar.Image src="https://avatars.githubusercontent.com/u/77048269?v=4" alt="avatar" />
		<Avatar.Fallback>UK</Avatar.Fallback>
	</Avatar.Root>
	<div class="flex flex-col">
		<Muted class={cn(isSelf && 'self-end')}>{message.author?.username}</Muted>
		<p>{message.content}</p>
	</div>
	<div class="absolute -bottom-6">
		<Muted>
			{moment(message.createdAt).fromNow()}
		</Muted>
	</div>
</div>
