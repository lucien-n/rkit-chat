<script lang="ts">
	import AppLayout from '$lib/components/layouts/app-layout.svelte';
	import { userStore } from '$lib/stores';
	import urls from '$lib/urls';
	import { Button } from '$shadcn/button';
	import * as Card from '$shadcn/card';
	import { H3, Large } from '$typography';
	import { Enter } from 'radix-icons-svelte';
</script>

<AppLayout />

{#if !$userStore}
	<div
		class="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-30"
	>
		<Card.Root>
			<Card.Header>
				<H3>You are not signed in</H3>
			</Card.Header>
			<Card.Content>
				<Button variant="link" href={urls.auth.signin} class="flex items-center gap-1">
					<Enter size="20" />
					<Large>Sign In</Large>
				</Button>
			</Card.Content>
		</Card.Root>
	</div>
{/if}
