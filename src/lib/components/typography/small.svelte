<script lang="ts">
	import { cn } from '$cn';
	import type { HTMLAttributes } from 'svelte/elements';

	type $$Props = HTMLAttributes<HTMLDivElement>;

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<small class={cn('text-sm font-medium leading-none', className)}><slot /></small>
