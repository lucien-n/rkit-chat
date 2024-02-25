import urls from '$lib/urls';
import type { PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { UsersController } from '$shared/modules/users/users.controller';

export const load: PageServerLoad = async ({ locals: { authUser } }) => {
	if (!authUser) redirect(307, urls.home.root);

	const user = await UsersController.findById(authUser?.id);
	if (!user) error(404, 'User not found');

	redirect(307, urls.app.user.root + '/' + user.handle);
};
