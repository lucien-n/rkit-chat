import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { session, remultUser, profile } }) => {
	return {
		session,
		user: remultUser,
		profile
	};
};
