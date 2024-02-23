import urls from '$lib/urls';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals: { user } }) => {
	const { profileId } = params;

	if (profileId === 'me') {
		redirect(307, user ? urls.app.profile.root + '/' + user.id : urls.auth.signin);
	}
};
