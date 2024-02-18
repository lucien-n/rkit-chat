<script lang="ts">
	import { cn } from '$cn';
	import { userStore } from '$lib/stores/stores';
	import * as Avatar from '$shadcn/avatar';
	import type { Message } from '$shared/modules/messages/message.entity';
	import { Muted } from '$typography';

	export let message: Message;
</script>

<div
	class={cn(
		'flex gap-2 rounded-md border p-2 ',
		$userStore?.id === message.authorId ? 'flex-wrap-reverse border-blue-300' : ''
	)}
>
	<Avatar.Root class="self-center">
		<Avatar.Image src="https://avatars.githubusercontent.com/u/77048269?v=4" alt="avatar" />
		<Avatar.Fallback>UK</Avatar.Fallback>
	</Avatar.Root>
	<div class="flex flex-col">
		<Muted>{message.author?.username}</Muted>
		<p>{message.content}</p>
	</div>
</div>
