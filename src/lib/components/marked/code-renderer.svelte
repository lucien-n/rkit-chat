<script lang="ts">
	import { Marked } from 'marked';
	import { markedHighlight } from 'marked-highlight';
	import hljs from 'highlight.js';
	import { Card } from '$shadcn/card';
	import { Badge } from '$shadcn/badge';

	export let text: string;
	export let raw: string;
	export let lang: string = 'plaintext';

	const marked = new Marked(
		markedHighlight({
			langPrefix: 'hljs language-',
			highlight(code) {
				const language = hljs.getLanguage(lang) ? lang : 'plaintext';
				return hljs.highlight(code, { language }).value;
			}
		})
	);
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css"
	/>
</svelte:head>

<!-- eslint-disable-next-line svelte/no-at-html-tags -->
<div class="relative px-3 py-2">
	{@html marked.parse(raw)}
	<div class="absolute right-2 top-1 p-3">
		<Badge>{lang}</Badge>
	</div>
</div>
