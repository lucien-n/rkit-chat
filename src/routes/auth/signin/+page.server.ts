import type { PageServerLoad } from './$types';
import { signinSchema } from '$lib/schemas/signin.schema';
import { superValidate } from 'sveltekit-superforms/server';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(signinSchema)
	};
};
