import type { Handle } from '@sveltejs/kit';
import { controllers, entities } from '$shared';
import { DATABASE_URL } from '$env/static/private';
import { getUser, initApi } from '$lib/server/remult';
import { remultSveltekit } from 'remult/remult-sveltekit';
import { createPostgresDataProvider } from 'remult/postgres';

export const handleRemult: Handle = remultSveltekit({
	dataProvider: createPostgresDataProvider({ connectionString: DATABASE_URL }),
	initApi,
	getUser,
	entities,
	controllers
});
