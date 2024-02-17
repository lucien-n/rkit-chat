<script lang="ts">
	import * as Card from '$shadcn/card';
</script>

<div class="container flex h-full items-center justify-center">
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
