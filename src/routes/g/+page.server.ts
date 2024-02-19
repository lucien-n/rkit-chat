import { remult } from 'remult';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import urls from '$lib/urls';
import { ProfilesController } from '$shared/modules/profiles/profiles.controller';

export const load: PageServerLoad = async () => {
	if (!remult.authenticated() || !remult.user) redirect(302, urls.home);

	const profile = await ProfilesController.findById(remult.user.id, { groups: true });
	if (!profile) redirect(302, urls.home);

	const firstGroupId = profile.groups?.[0].id;
	if (!firstGroupId) redirect(302, urls.home);

	redirect(307, urls.groups + '/' + firstGroupId);
};
