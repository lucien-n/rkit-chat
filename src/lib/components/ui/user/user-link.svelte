<script lang="ts">
	import * as Avatar from '$shadcn/avatar';
	import { userStore } from '$lib/stores/stores';
	import type { User } from '$shared/modules/users/user.entity';
	import urls from '$lib/urls';

	export let user: User | null = $userStore;
</script>

<a href={urls.app.user.root + '/' + user?.id}>
	<Avatar.Root>
		<Avatar.Image
			src={`https://api.dicebear.com/7.x/notionists-neutral/svg?seed=${user?.username ?? 'default'}`}
			alt="avatar"
		/>
		<Avatar.Fallback>UK</Avatar.Fallback>
	</Avatar.Root>
</a>
