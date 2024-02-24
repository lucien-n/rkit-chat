import type { Handle } from '@sveltejs/kit';
import { createBlankSession, lucia, refreshSession } from '$lib/server/lucia';

export const handleLucia: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get(lucia.sessionCookieName);
	if (!sessionId) {
		event.locals.authUser = null;
		event.locals.authSession = null;
		return resolve(event);
	}

	const { session, user } = await lucia.validateSession(sessionId);
	if (session && session.fresh) {
		await refreshSession(event, session);
	}

	if (!session) {
		await createBlankSession(event);
	}

	event.locals.authUser = user;
	event.locals.authSession = session;

	return resolve(event);
};
