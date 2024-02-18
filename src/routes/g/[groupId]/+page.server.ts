import { message, superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';
import { createMessageSchema } from '$shared/modules/messages/schemas/create-message.schema';
import { MessagesController } from '$shared/modules/messages/messages.controller';
import { fail } from '@sveltejs/kit';
import { createGroupSchema } from '$shared/modules/groups/schemas/create-group.schema';
import { GroupsController } from '$shared/modules/groups/groups.controller';

export const load: PageServerLoad = async (event) => {
	const { groupId } = event.params;

	console.log(groupId);

	return {
		messageForm: await superValidate(createMessageSchema),
		groupForm: await superValidate(createGroupSchema)
	};
};

export const actions: Actions = {
	createMessage: async (event) => {
		const form = await superValidate(event, createMessageSchema);
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		const { content } = form.data;
		const { groupId } = event.params;

		await MessagesController.create({ content }, groupId);

		return message(form, 'Message sent');
	},
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
