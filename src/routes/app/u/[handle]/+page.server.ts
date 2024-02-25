import { GroupsController } from '$shared/modules/groups/groups.controller';
import { createGroupSchema } from '$shared/modules/groups/schemas/create-group.schema';
import { UsersController } from '$shared/modules/users/users.controller';
import { error, fail } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { message, superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { handle } = params;

	const user = await UsersController.findOne({ handle });
	if (!user) {
		error(404, 'User not found');
	}

	return {
		user
	};
};

export const actions: Actions = {
	createGroup: async (event) => {
		const form = await superValidate(event, zod(createGroupSchema));
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
