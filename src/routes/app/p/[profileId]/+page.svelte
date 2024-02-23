<script lang="ts">
	import { H1 } from '$typography';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ profile } = data);
</script>

<div class="p-3">
	<H1>{profile?.username}</H1>
</div>
