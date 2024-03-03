<script lang="ts">
	import * as Card from '$shadcn/card';
	import type { User } from '$shared/modules/users/user.entity';
	import { Large } from '$typography';
	import UserMini from '$ui/user/user-mini.svelte';

	export let user: User;
</script>

<Card.Root class="flex items-center">
	<Card.Content class="flex items-center gap-3 p-3">
		<UserMini {user} />
		<Large>{user.username}</Large>
	</Card.Content>
</Card.Root>
