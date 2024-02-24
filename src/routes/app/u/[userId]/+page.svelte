<script lang="ts">
	import { H1 } from '$typography';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ user } = data);
</script>

<div class="p-3">
	<H1>{user?.username}</H1>
</div>
