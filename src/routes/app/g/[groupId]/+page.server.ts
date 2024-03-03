import { remult } from 'remult';
import { urls } from '$lib/urls';
import { fail, redirect } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import type { RemultError } from '$shared/helpers/types';
import { message, superValidate } from 'sveltekit-superforms/server';
import { GroupsController } from '$shared/modules/groups/groups.controller';
import { createGroupSchema } from '$shared/modules/groups/schemas/create-group.schema';
import { sendMessageSchema } from '$shared/modules/messages/schemas/send-message.schema';

export const load: PageServerLoad = async (event) => {
	const { groupId } = event.params;
	const group = (await GroupsController.findById(groupId)) ?? null;

	if (!group || !remult.user?.groups.includes(group?.id)) redirect(307, urls.home.root);

	return {
		group,
		messageForm: await superValidate(zod(sendMessageSchema))
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

		try {
			await GroupsController.create({ name });
		} catch (e) {
			const err = e as RemultError;
			return message(form, err.message, { status: err.status ?? 500 });
		}

		return message(form, 'Group created');
	}
};
