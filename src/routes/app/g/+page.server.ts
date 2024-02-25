import { remult } from 'remult';
import { urls } from '$lib/urls';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { UsersController } from '$shared/modules/users/users.controller';
import { UsersController } from '$shared/modules/users/users.controller';

export const load: PageServerLoad = async () => {
	if (!remult.authenticated() || !remult.user) redirect(302, urls.home.root);

	const user = await UsersController.findById(remult.user.id, { groups: true });
	if (!user) redirect(302, urls.home.root);

	const firstGroupId = user.groups?.[0].groupId ?? 'default';
	if (!firstGroupId) redirect(302, urls.home.root);

	redirect(307, urls.app.groups.root + '/' + firstGroupId);
};
