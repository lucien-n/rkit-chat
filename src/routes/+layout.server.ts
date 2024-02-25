import { rejson } from '$lib/helpers/rejson';
import { UsersController } from '$shared/modules/users/users.controller';
import { remult } from 'remult';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { authSession: session } }) => {
	const user = remult.user && (await UsersController.findById(remult.user?.id, { settings: true }));

	return {
		session,
		user: rejson(user)
	};
};
