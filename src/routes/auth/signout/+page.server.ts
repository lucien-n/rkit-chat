import { urls } from '$lib/urls';
import type { Actions } from './$types';
import { lucia } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
	default: async (event) => {
		if (!event.locals.authSession) {
			return fail(401);
		}

		await lucia.invalidateSession(event.locals.authSession.id);
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		redirect(302, urls.home.root);
	}
};
