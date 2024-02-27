<script lang="ts">
	import { Button } from '$shadcn/button';
	import { ClipboardCopy } from 'radix-icons-svelte';

	export let text: string;

	const handleCopy = () => {};
</script>

<div class="inline-block w-fit rounded-lg border">
	<p class="inline-block py-1 pl-2 font-mono">
		{text}
	</p>
	<Button
		variant="ghost"
		class="mr-1 inline-block h-6 w-6 self-center p-1 align-middle"
		on:click={handleCopy}
	>
		<ClipboardCopy />
	</Button>
</div>
