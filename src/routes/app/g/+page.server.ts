import urls from '$lib/urls';
import { remult } from 'remult';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { UsersController } from '$shared/modules/users/users.controller';m '$shared/modules/profiles/users.controller'; '$shared/modules/profiles/users.controller';

export const load: PageServerLoad = async () => {
	if (!remult.authenticated() || !remult.user) redirect(302, urls.home.root);

	const profile = await UsersController.findById(remult.user.id, { groups: true });
	if (!profile) redirect(302, urls.home.root);

	const firstGroupId = profile.groups?.[0].groupId ?? 'default';
	if (!firstGroupId) redirect(302, urls.home.root);

	redirect(307, urls.app.groups.root + '/' + firstGroupId);
};
