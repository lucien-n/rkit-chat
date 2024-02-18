<script lang="ts">
	import { cn } from '$cn';
	import type { HTMLAttributes } from 'svelte/elements';

	type $$Props = HTMLAttributes<HTMLDivElement>;

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<h4 class={cn('scroll-m-20 text-xl font-semibold tracking-tight', className)}>
	<slot />
</h4>
