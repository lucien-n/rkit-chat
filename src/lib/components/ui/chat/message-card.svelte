<script lang="ts">
	import { cn } from '$cn';
	import { userStore } from '$lib/stores/stores';
	import type { Message } from '$shared/modules/messages/message.entity';
	import { Muted, Large } from '$typography';
	import ProfileAvatar from '$ui/profile/profile-avatar.svelte';
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
	<div class="avatar self-start rounded-2xl border">
		<ProfileAvatar profile={message.author} />
	</div>
	<div class="rounded-md border p-2">
		<div class="flex flex-col">
			<div class={cn('flex items-center gap-2', isSelf && 'flex-row-reverse')}>
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
</div>
