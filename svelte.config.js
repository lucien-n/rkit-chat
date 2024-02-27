import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [vitePreprocess({})],

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		alias: {
			$shadcn: './src/lib/shadcn/components/ui',
			$cn: './src/lib/shadcn/utils',
			$shared: './src/shared',
			$typography: './src/lib/components/typography',
			$ui: './src/lib/components/ui',
			$custom: './src/lib/components/custom',
			$marked: './src/lib/components/marked',
			$layouts: './src/lib/components/layouts',
			$helpers: './src/lib/helpers',
			$contexts: './src/lib/contexts',
			$stores: './src/lib/stores'
		}
	}
};

export default config;
