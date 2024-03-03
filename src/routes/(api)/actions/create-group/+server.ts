import { Error } from '$shared/helpers/errors';
import type { RequestHandler } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { actionResult, superValidate } from 'sveltekit-superforms';
import { GroupsController } from '$shared/modules/groups/groups.controller';
import { createGroupSchema } from '$shared/modules/groups/schemas/create-group.schema';

export const POST: RequestHandler = async (event) => {
	const { request } = event;

	const form = await superValidate(request, zod(createGroupSchema));

	if (!form.valid) return actionResult('failure', { form }, 400);

	const { name } = form.data;

	try {
		await GroupsController.create({ name });
	} catch (e) {
		return actionResult('failure', { message: e ?? Error.InternalError, form }, 400);
	}

	return actionResult('success', { form });
};
