import { Error } from '$shared/helpers/errors';
import type { RequestHandler } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { actionResult, superValidate } from 'sveltekit-superforms';
import { addFriendSchema } from '$shared/modules/friend-requests/schemas/add-friend.schema';
import { FriendRequestsController } from '$shared/modules/friend-requests/friend-requests.controller';

export const POST: RequestHandler = async (event) => {
	const { request } = event;

	const form = await superValidate(request, zod(addFriendSchema));

	if (!form.valid) return actionResult('failure', { form }, 400);

	const { handle } = form.data;

	try {
		await FriendRequestsController.sendFriendRequest(handle);
	} catch (e) {
		return actionResult('failure', { message: e ?? Error.InternalError, form }, 400);
	}

	return actionResult('success', { form });
};
