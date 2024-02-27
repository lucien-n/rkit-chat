<script lang="ts">
	import { SITE_NAME } from '$lib/settings';
	import { Button } from '$shadcn/button';
	import * as Dialog from '$shadcn/dialog';
	import { Link2 } from 'radix-icons-svelte';

	export let href: string;
	export let text: string;

	let open = false;
	let target: '_self' | '_blank' = '_self';

	const handleOpenDialog = () => (open = true);
	const handleCloseDialog = () => (open = false);

	const handleMouseDown = (e: MouseEvent) => {
		if (e.button == 1) {
			target = '_blank';
			handleOpenDialog();
		}
	};
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger>
		<button
			class="w-fit border-b border-b-transparent font-semibold hover:border-foreground"
			on:mousedown={handleMouseDown}
		>
			<div class="inline-block">
				<Link2 />
			</div>
			<p class="inline-block">{text}</p>
		</button>
	</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Title>You are about to leave {SITE_NAME}</Dialog.Title>
		<Dialog.Description>This is a link to 3rd party content</Dialog.Description>
		<Dialog.Footer>
			<Button variant="secondary" on:click={handleCloseDialog}>Cancel</Button>
			<Button {href} {target} on:click={handleCloseDialog}>Continue</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
