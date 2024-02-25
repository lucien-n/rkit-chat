import { createSession } from '$lib/server/lucia';
import urls from '$lib/urls';
import { AuthController } from '$shared/modules/auth/auth.controller';
import { signupSchema } from '$shared/modules/auth/schemas/signup.schema';
import { fail, redirect } from '@sveltejs/kit';
import { remult } from 'remult';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	if (remult.authenticated()) redirect(302, urls.home.root);

	return {
		form: await superValidate(zod(signupSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(signupSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		const { username, email, password } = form.data;

		const user = await AuthController.signup({ username, email, password });

		await createSession(event, user);

		redirect(302, urls.home.root);
	}
};
