import urls from '$lib/urls';
import type { PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { ProfilesController } from '$shared/modules/profiles/profiles.controller';

export const load: PageServerLoad = async ({ params, locals: { user } }) => {
	const { profileId } = params;

	if (profileId === 'me') {
		redirect(307, user ? urls.app.profile.root + '/' + user.id : urls.auth.signin);
	}

	const profile = await ProfilesController.findById(profileId);
	if (!profile) {
		error(404, 'Profile not found');
	}

	return {
		profile
	};
};
