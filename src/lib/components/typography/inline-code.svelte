<script lang="ts">
	import { cn } from '$cn';
	import type { HTMLAttributes } from 'svelte/elements';

	type $$Props = HTMLAttributes<HTMLDivElement>;

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<code
	class={cn(
		'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
		className
	)}
>
	<slot />
</code>
