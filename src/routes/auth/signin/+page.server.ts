import { urls } from '$lib/urls';
import { fail, redirect } from '@sveltejs/kit';
import { createSession } from '$lib/server/lucia';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { AuthController } from '$shared/modules/auth/auth.controller';
import { signinSchema } from '$shared/modules/auth/schemas/signin.schema';
import { signinSchema } from '$shared/modules/auth/schemas/signin.schema';

export const load: PageServerLoad = async ({ locals: { authSession: session } }) => {
	if (session) redirect(302, urls.home.root);

	return {
		form: await superValidate(zod(signinSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(signinSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { email, password } = form.data;

		const user = await AuthController.signin({ email, password });

		await createSession(event, user);

		redirect(302, urls.home.root);
	}
};
