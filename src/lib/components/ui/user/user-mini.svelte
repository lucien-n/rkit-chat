<script lang="ts">
	import { userStore } from '$lib/stores/stores';
	import type { User } from '$shared/modules/users/user.entity';
	import UserLink from './user-link.svelte';
	import UserHovercard from './user-hovercard.svelte';

	export let user: User | null = $userStore;
</script>

<UserHovercard>
	<svelte:fragment slot="trigger">
		<UserLink {user} />
	</svelte:fragment>
</UserHovercard>
