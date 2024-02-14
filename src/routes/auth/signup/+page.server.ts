import { superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad } from './$types';
import { signupSchema } from '$lib/schemas/signup.schema';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(signupSchema)
	};
};
