import { Error } from '$shared/helpers/errors';
import { FriendRequestsController } from '$shared/modules/friend-requests/friend-requests.controller';
import { sendFriendSchema } from '$shared/modules/friend-requests/schemas/send-friend-request.schema';
import type { RequestHandler } from '@sveltejs/kit';
import { actionResult, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const POST: RequestHandler = async (event) => {
	const { request } = event;

	const form = await superValidate(request, zod(sendFriendSchema));

	if (!form.valid) return actionResult('failure', { form }, 400);

	const { handle } = form.data;

	try {
		await FriendRequestsController.send(handle);
	} catch (e) {
		return actionResult('failure', { message: e ?? Error.InternalError, form }, 400);
	}

	return actionResult('success', { form });
};
