import urls from '$lib/urls';
import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { message, superValidate } from 'sveltekit-superforms/server';
import { UsersController } from '$shared/modules/users/users.controller';
import { GroupsController } from '$shared/modules/groups/groups.controller';
import { createGroupSchema } from '$shared/modules/groups/schemas/create-group.schema';

export const load: PageServerLoad = async ({ params, locals: { authUser: autUser } }) => {
	const { userId } = params;

	if (userId === 'me') {
		redirect(307, autUser ? urls.app.user.root + '/' + autUser.id : urls.auth.signin);
	}

	const user = await UsersController.findById(userId);
	if (!user) {
		error(404, 'User not found');
	}

	return {
		user
	};
};

export const actions: Actions = {
	createGroup: async (event) => {
		const form = await superValidate(event, createGroupSchema);
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		const { name } = form.data;

		await GroupsController.create({ name });

		return message(form, 'Group created');
	}
};
