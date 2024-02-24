import urls from '$lib/urls';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { GroupsController } from '$shared/modules/groups/groups.controller';
import { createGroupSchema } from '$shared/modules/groups/schemas/create-group.schema';

export const load: LayoutServerLoad = async ({ locals: { authUser } }) => {
	if (!authUser) redirect(303, urls.auth.signin);

	const groups = (await GroupsController.findByUser(authUser.id)) ?? [];

	return {
		groups,
		groupForm: await superValidate(createGroupSchema)
	};
};
