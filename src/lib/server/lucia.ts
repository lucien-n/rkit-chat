import pg from 'pg';
import { dev } from '$app/environment';
import { Lucia, type Session } from 'lucia';
import type { RequestEvent } from '@sveltejs/kit';
import { DATABASE_URL } from '$env/static/private';
import { NodePostgresAdapter } from '@lucia-auth/adapter-postgresql';
import type { AuthUser } from '$shared/modules/auth/auth_user.entity';

const pool = new pg.Pool({
	connectionString: DATABASE_URL
});
const adapter = new NodePostgresAdapter(pool, {
	user: 'auth_users',
	session: 'auth_sessions'
});

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: !dev
		}
	},
	getUserAttributes: (attributes) => {
		return {
			email: attributes.email
		};
	}
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: Omit<AuthUser, 'id'>;
	}
}

export const createSession = async (event: RequestEvent, user: { id: string }) => {
	const session = await lucia.createSession(user.id, {});
	await refreshSession(event, session);
};

export const refreshSession = async (event: RequestEvent, session: Session) => {
	const sessionCookie = lucia.createSessionCookie(session.id);
	event.cookies.set(sessionCookie.name, sessionCookie.value, {
		path: '/',
		...sessionCookie.attributes
	});
};

export const createBlankSession = async (event: RequestEvent) => {
	const sessionCookie = lucia.createBlankSessionCookie();
	event.cookies.set(sessionCookie.name, sessionCookie.value, {
		path: '/',
		...sessionCookie.attributes
	});
};
