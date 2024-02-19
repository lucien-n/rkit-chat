<script lang="ts">
	import * as Avatar from '$shadcn/avatar';
	import { profileStore } from '$lib/stores/stores';
	import type { Profile } from '$shared/modules/profiles/profile.entity';

	export let profile: Profile | null = $profileStore;
</script>

<Avatar.Root class="h-full w-full">
	<Avatar.Image
		src={`https://api.dicebear.com/7.x/notionists-neutral/svg?seed=${profile?.username ?? 'default'}`}
		alt="avatar"
	/>
	<Avatar.Fallback>UK</Avatar.Fallback>
</Avatar.Root>
