import urls from '$lib/urls';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	redirect(303, urls.groups + '/default');
};
