import { remult } from 'remult';
import type { LayoutServerLoad } from './$types';
import { UsersController } from '$shared/modules/users/users.controller';rs.controller';

export const load: LayoutServerLoad = async ({ locals: { session } }) => {
	return {
		session,
		user: remult.user,
		profile: remult.user ? await UsersController.findById(remult.user?.id) : null
	};
};
