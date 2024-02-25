<script lang="ts">
	import urls from '$lib/urls';
	import * as Avatar from '$shadcn/avatar';
	import * as HoverCard from '$shadcn/hover-card';
	import type { User } from '$shared/modules/users/user.entity';
	import { userStore } from '$stores/stores';
	import { Large, Muted } from '$typography';
	import moment from 'moment';

	export let user: User | null = $userStore;
</script>

<HoverCard.Root>
	<HoverCard.Trigger>
		<a href={urls.app.user.root + '/' + user?.id}>
			<Avatar.Root class="h-12 w-12">
				<Avatar.Image
					src={`https://api.dicebear.com/7.x/notionists-neutral/svg?seed=${user?.handle ?? 'default'}`}
					alt="avatar"
				/>
				<Avatar.Fallback>UK</Avatar.Fallback>
			</Avatar.Root>
		</a>
	</HoverCard.Trigger>
	<HoverCard.Content align="center" side="right" class="ml-2">
		<Large>@{user?.handle}</Large>
		<Muted><strong> {moment(user?.createdAt).format('MMMM DD YYYY')}</strong></Muted>
	</HoverCard.Content>
</HoverCard.Root>
