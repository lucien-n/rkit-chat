import { Error } from '$shared/helpers/errors';
import type { RequestHandler } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { actionResult, superValidate } from 'sveltekit-superforms';
import { MessagesController } from '$shared/modules/messages/messages.controller';
import { sendMessageSchema } from '$shared/modules/messages/schemas/send-message.schema';

export const POST: RequestHandler = async (event) => {
	const { request } = event;

	const { groupId } = event.params;
	if (!groupId) throw 'Missing group id';

	const form = await superValidate(request, zod(sendMessageSchema));

	if (!form.valid) return actionResult('failure', { form }, 400);

	const { content } = form.data;

	try {
		await MessagesController.send({ content }, groupId);
	} catch (e) {
		return actionResult('failure', { message: e ?? Error.InternalError, form }, 400);
	}

	return actionResult('success', { form });
};
