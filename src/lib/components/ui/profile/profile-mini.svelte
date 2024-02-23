<script lang="ts">
	import { profileStore } from '$lib/stores/stores';
	import type { Profile } from '$shared/modules/profiles/profile.entity';
	import ProfileLink from './profile-link.svelte';
	import ProfileHovercard from './profile-hovercard.svelte';

	export let profile: Profile | null = $profileStore;
</script>

<ProfileHovercard>
	<svelte:fragment slot="trigger">
		<ProfileLink {profile} />
	</svelte:fragment>
</ProfileHovercard>
