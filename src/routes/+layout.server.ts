import { remult } from 'remult';
import type { LayoutServerLoad } from './$types';
import { UsersController } from '$shared/modules/users/users.controller';

export const load: LayoutServerLoad = async ({ locals: { authSession: session } }) => {
	const user = remult.user ? await UsersController.findById(remult.user?.id) : null;

	return {
		session,
		user
	};
};
