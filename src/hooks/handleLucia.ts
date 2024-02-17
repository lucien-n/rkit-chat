import { createBlankSession, lucia, refreshSession } from '$lib/server/lucia';
import type { Handle } from '@sveltejs/kit';

export const handleLucia: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get(lucia.sessionCookieName);
	if (!sessionId) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	const { session, user } = await lucia.validateSession(sessionId);
	if (session && session.fresh) {
		await refreshSession(event, session);
	}

	if (!session) {
		await createBlankSession(event);
	}

	event.locals.user = user;
	event.locals.session = session;

	return resolve(event);
};
