import urls from '$lib/urls';
import { remult } from 'remult';
import { fail, redirect } from '@sveltejs/kit';
import { createSession } from '$lib/server/lucia';
import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { AuthController } from '$shared/modules/auth/auth.controller';
import { signupSchema } from '$shared/modules/auth/schemas/signup.schema';

export const load: PageServerLoad = async () => {
	if (remult.authenticated()) redirect(302, urls.home.root);

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

		redirect(302, urls.home.root);
	}
};
