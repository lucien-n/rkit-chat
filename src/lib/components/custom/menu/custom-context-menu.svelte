<script lang="ts">
	import { cn } from '$cn';
	import type { MenuItem } from '$custom/menu/types';
	import * as ContextMenu from '$shadcn/context-menu';
	import type { HTMLAttributes } from 'svelte/elements';

	type $$Props = HTMLAttributes<HTMLDivElement> & { items: MenuItem[] };

	const className: $$Props['class'] = undefined;
	export { className as class };

	export let items: MenuItem[];

	$: shownItems = items.filter(({ hidden }) => !hidden);
</script>

<ContextMenu.Root>
	<ContextMenu.Trigger>
		<slot />
	</ContextMenu.Trigger>
	{#if shownItems.filter(({ type }) => type !== 'separator').length}
		<ContextMenu.Content class={cn(className)}>
			{#each shownItems as item}
				{#if item.type === 'separator'}
					<ContextMenu.Separator class="mx-1" />
				{:else}
					{@const { label, onClick, icon } = item}

					<ContextMenu.Item class="space-x-1" on:click={onClick}>
						{#if icon}
							<svelte:component this={icon} />
						{/if}
						<p>{label}</p>
					</ContextMenu.Item>
				{/if}
			{/each}
		</ContextMenu.Content>
	{/if}
</ContextMenu.Root>
