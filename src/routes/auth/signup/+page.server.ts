import { superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { signupSchema } from '$lib/schemas/signup.schema';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(signupSchema))
	};
};
