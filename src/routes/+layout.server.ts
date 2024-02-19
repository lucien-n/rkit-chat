import { remult } from 'remult';
import type { LayoutServerLoad } from './$types';
import { ProfilesController } from '$shared/modules/profiles/profiles.controller';

export const load: LayoutServerLoad = async ({ locals }) => {
	return {
		session: locals.session,
		user: remult.user,
		profile: remult.user ? await ProfilesController.findById(remult.user.id) : null
	};
};
