import { superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { signinSchema } from '$lib/schemas/signin.schema';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(signinSchema))
	};
};
