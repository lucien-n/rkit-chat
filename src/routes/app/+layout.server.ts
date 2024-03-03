import { urls } from '$lib/urls';
import { sendFriendSchema } from '$shared/modules/friend-requests/schemas/send-friend-request.schema';
import { GroupsController } from '$shared/modules/groups/groups.controller';
import { createGroupSchema } from '$shared/modules/groups/schemas/create-group.schema';
import { redirect } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/server';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { authUser } }) => {
	if (!authUser) redirect(303, urls.auth.signin);

	const groups = (await GroupsController.findByUser(authUser.id)) ?? [];

	return {
		groups,
		groupForm: await superValidate(zod(createGroupSchema)),
		sendFriendRequestForm: await superValidate(zod(sendFriendSchema))
	};
};
