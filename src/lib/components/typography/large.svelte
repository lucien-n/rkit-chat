<script lang="ts">
	import { cn } from '$cn';
	import type { HTMLAttributes } from 'svelte/elements';

	type $$Props = HTMLAttributes<HTMLDivElement>;

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<div class={cn('text-lg font-semibold', className)}><slot /></div>
