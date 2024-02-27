<script lang="ts">
	import { Marked } from 'marked';
	import { markedHighlight } from 'marked-highlight';
	import hljs from 'highlight.js';
	import { Badge } from '$shadcn/badge';

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
	<!-- Atom One Dark -->
	<style>
		pre code.hljs {
			@apply block overflow-x-auto p-3;
		}

		code.hljs {
			@apply px-[3px] py-[5px];
		}

		code.hljs > *,
		hljs-built_in {
			@apply font-mono;
		}

		.hljs {
			@apply rounded-2xl bg-[#282c34] text-[#abb2bf];
		}

		.hljs-comment,
		.hljs-quote {
			@apply italic text-[#5c6370];
		}

		.hljs-doctag,
		.hljs-keyword,
		.hljs-formula {
			@apply text-[#c678dd];
		}

		.hljs-section,
		.hljs-name,
		.hljs-selector-tag,
		.hljs-deletion,
		.hljs-subst {
			@apply text-[#e06c75];
		}

		.hljs-literal {
			@apply text-[#56b6c2];
		}

		.hljs-string,
		.hljs-regexp,
		.hljs-addition,
		.hljs-attribute,
		.hljs-meta .hljs-string {
			@apply text-[#98c379];
		}

		.hljs-attr,
		.hljs-variable,
		.hljs-template-variable,
		.hljs-type,
		.hljs-selector-class,
		.hljs-selector-attr,
		.hljs-selector-pseudo,
		.hljs-number {
			@apply text-[#d19a66];
		}

		.hljs-symbol,
		.hljs-bullet,
		.hljs-link,
		.hljs-meta,
		.hljs-selector-id,
		.hljs-title {
			@apply text-[#61aeee];
		}

		.hljs-built_in,
		.hljs-title.class_,
		.hljs-class .hljs-title {
			@apply text-[#e6c07b];
		}

		.hljs-emphasis {
			@apply italic;
		}

		.hljs-strong {
			@apply font-bold;
		}

		.hljs-link {
			@apply underline;
		}
	</style>
</svelte:head>

<div class="relative my-2">
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html marked.parse(raw)}
	<div class="absolute right-2 top-1 p-3">
		<Badge>{lang}</Badge>
	</div>
</div>
