import urls from '$lib/urls';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { GroupsController } from '$shared/modules/groups/groups.controller';

export const load: LayoutServerLoad = async ({ locals: { user } }) => {
	if (!user) redirect(303, urls.auth.signin);

	const groups = (await GroupsController.findByUser(user.id)) ?? [];

	return {
		groups
	};
};
