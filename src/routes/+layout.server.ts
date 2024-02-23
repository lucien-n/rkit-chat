import { remult } from 'remult';
import type { LayoutServerLoad } from './$types';
import { ProfilesController } from '$shared/modules/profiles/profiles.controller';

export const load: LayoutServerLoad = async ({ locals: { session } }) => {
	return {
		session,
		user: remult.user,
		profile: remult.user ? await ProfilesController.findById(remult.user?.id) : null
	};
};
