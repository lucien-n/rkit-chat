<script lang="ts">
	import * as HoverCard from '$shadcn/hover-card';
	import { profileStore } from '$lib/stores/stores';
	import type { User } from '$shared/modules/profiles/profile.entity';
	import { Large, Muted } from '$typography';
	import moment from 'moment';

	export let profile: User | null = $profileStore;
</script>

<HoverCard.Root>
	<HoverCard.Trigger>
		<slot name="trigger" />
	</HoverCard.Trigger>
	<HoverCard.Content>
		<Large>{profile?.username}</Large>
		<Muted><strong> {moment(profile?.createdAt).format('MMMM DD YYYY')}</strong></Muted>
	</HoverCard.Content>
</HoverCard.Root>
