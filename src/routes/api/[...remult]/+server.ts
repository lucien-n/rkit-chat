import { controllers, entities } from '$shared';
import { DATABASE_URL } from '$env/static/private';
import { getUser, initApi } from '$lib/server/remult';
import { remultSveltekit } from 'remult/remult-sveltekit';
import { createPostgresDataProvider } from 'remult/postgres';

export const _api = remultSveltekit({
	dataProvider: createPostgresDataProvider({ connectionString: DATABASE_URL }),
	initApi,
	getUser,
	entities,
	controllers
});

export const GET = _api.GET;
export const POST = _api.POST;
export const PUT = _api.PUT;
export const DELETE = _api.DELETE;
