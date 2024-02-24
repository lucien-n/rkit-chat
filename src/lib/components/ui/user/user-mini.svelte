<script lang="ts">
	import { userStore } from '$lib/stores/stores';
	import * as HoverCard from '$shadcn/hover-card';
	import * as Avatar from '$shadcn/avatar';
	import type { User } from '$shared/modules/users/user.entity';
	import { Large, Muted } from '$typography';
	import moment from 'moment';
	import urls from '$lib/urls';

	export let user: User | null = $userStore;
</script>

<HoverCard.Root>
	<HoverCard.Trigger>
		<a href={urls.app.user.root + '/' + user?.id}>
			<Avatar.Root class="h-12 w-12">
				<Avatar.Image
					src={`https://api.dicebear.com/7.x/notionists-neutral/svg?seed=${user?.username ?? 'default'}`}
					alt="avatar"
				/>
				<Avatar.Fallback>UK</Avatar.Fallback>
			</Avatar.Root>
		</a>
	</HoverCard.Trigger>
	<HoverCard.Content>
		<Large>{user?.username}</Large>
		<Muted><strong> {moment(user?.createdAt).format('MMMM DD YYYY')}</strong></Muted>
	</HoverCard.Content>
</HoverCard.Root>
