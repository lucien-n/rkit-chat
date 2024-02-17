import { superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';
import { signupSchema } from '$shared/modules/auth/schemas/signup.schema';
import { createSession } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';
import urls from '$lib/urls';
import { AuthController } from '$shared/modules/auth/auth.controller';
import { remult } from 'remult';

export const load: PageServerLoad = async () => {
	if (remult.authenticated()) redirect(302, urls.home);

	return {
		form: await superValidate(signupSchema)
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, signupSchema);
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		const { username, email, password } = form.data;

		const user = await AuthController.signup({ username, email, password });

		await createSession(event, user);

		redirect(302, urls.home);
	}
};
