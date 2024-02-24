<script lang="ts">
	import { profileStore } from '$lib/stores/stores';
	import type { User } from '$shared/modules/profiles/profile.entity';
	import ProfileLink from './profile-link.svelte';
	import ProfileHovercard from './profile-hovercard.svelte';

	export let profile: User | null = $profileStore;
</script>

<ProfileHovercard>
	<svelte:fragment slot="trigger">
		<ProfileLink {profile} />
	</svelte:fragment>
</ProfileHovercard>
