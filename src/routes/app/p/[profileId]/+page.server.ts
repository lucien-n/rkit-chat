import urls from '$lib/urls';
import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { message, superValidate } from 'sveltekit-superforms/server';
import { GroupsController } from '$shared/modules/groups/groups.controller';
import { ProfilesController } from '$shared/modules/profiles/profiles.controller';
import { createGroupSchema } from '$shared/modules/groups/schemas/create-group.schema';

export const load: PageServerLoad = async ({ params, locals: { user } }) => {
	const { profileId } = params;

	if (profileId === 'me') {
		redirect(307, user ? urls.app.profile.root + '/' + user.id : urls.auth.signin);
	}

	const profile = await ProfilesController.findById(profileId);
	if (!profile) {
		error(404, 'Profile not found');
	}

	return {
		profile
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
