<script lang="ts">
	import { Textarea } from '$shadcn/textarea';
	import type { HTMLTextareaAttributes } from 'svelte/elements';
	import { cn } from '$lib/shadcn/utils';

	type $$Props = HTMLTextareaAttributes;

	let className: $$Props['class'] = undefined;
	export let value: $$Props['value'] = undefined;
	export { className as class };

	export let rows: $$Props['rows'] = undefined;
	$: rows =
		(typeof value === 'number'
			? 1
			: typeof value === 'object'
				? value?.length
				: value?.split('\n').length) ?? 0;
</script>

<Textarea
	class={cn('min-h-0 w-full resize-none overflow-hidden', className)}
	bind:value
	on:blur
	on:change
	on:click
	on:focus
	on:keydown
	on:keypress
	on:keyup
	on:mouseover
	on:mouseenter
	on:mouseleave
	on:paste
	on:input
	{...$$restProps}
	{rows}
/>
