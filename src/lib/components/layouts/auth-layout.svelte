<script lang="ts">
	import urls from '$lib/urls';
	import { Button } from '$shadcn/button';
	import * as Card from '$shadcn/card';
	import { CaretLeft } from 'radix-icons-svelte';
</script>

<div class="container flex h-full items-center justify-center">
	<Button variant="link" class="fixed left-0 top-0" href={urls.home.root}>
		<CaretLeft />
		Home
	</Button>
	<Card.Root>
		<Card.Header>
			<div class="text-4xl font-bold tracking-tight">
				<slot name="header" />
			</div>
		</Card.Header>
		<Card.Content>
			<slot />
		</Card.Content>
		<Card.Footer>
			<slot name="footer" />
		</Card.Footer>
	</Card.Root>
</div>
