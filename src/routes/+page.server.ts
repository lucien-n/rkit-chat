import { message, superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';
import { createMessageSchema } from '$shared/modules/messages/schemas/create-message.schema';
import { MessagesController } from '$shared/modules/messages/messages.controller';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(createMessageSchema)
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, createMessageSchema);
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		const { content } = form.data;

		await MessagesController.create({ content });

		return message(form, 'Message sent');
	}
};
