<script lang="ts">
	import * as HoverCard from '$shadcn/hover-card';
	import { userStore } from '$lib/stores/stores';
	import type { User } from '$shared/modules/users/user.entity';
	import { Large, Muted } from '$typography';
	import moment from 'moment';

	export let user: User | null = $userStore;
</script>

<HoverCard.Root>
	<HoverCard.Trigger>
		<slot name="trigger" />
	</HoverCard.Trigger>
	<HoverCard.Content>
		<Large>{user?.username}</Large>
		<Muted><strong> {moment(user?.createdAt).format('MMMM DD YYYY')}</strong></Muted>
	</HoverCard.Content>
</HoverCard.Root>
