import type { RemultError } from '$shared/helpers/types';
import { GroupsController } from '$shared/modules/groups/groups.controller';
import { createGroupSchema } from '$shared/modules/groups/schemas/create-group.schema';
import { MessagesController } from '$shared/modules/messages/messages.controller';
import { createMessageSchema } from '$shared/modules/messages/schemas/create-message.schema';
import { fail } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { message, superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const { groupId } = event.params;
	const group = (await GroupsController.findById(groupId)) ?? null;

	return {
		messageForm: await superValidate(zod(createMessageSchema)),
		group
	};
};

export const actions: Actions = {
	createMessage: async (event) => {
		const form = await superValidate(event, zod(createMessageSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		const { content } = form.data;
		const { groupId } = event.params;

		await MessagesController.createMessage({ content }, groupId);

		return message(form, 'Message sent');
	},
	createGroup: async (event) => {
		const form = await superValidate(event, zod(createGroupSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		const { name } = form.data;

		try {
			await GroupsController.createGroup({ name });
		} catch (e) {
			const err = e as RemultError;
			return message(form, err.message, { status: err.status ?? 500 });
		}

		return message(form, 'Group created');
	}
};
