import { remult } from 'remult';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	return {
		session: locals.session,
		user: remult.user
	};
};
