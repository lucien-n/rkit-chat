import { remultSveltekit } from 'remult/remult-sveltekit';
import { createPostgresDataProvider } from 'remult/postgres';
import { DATABASE_URL } from '$env/static/private';
import { controllers, entities } from '$shared';
import { AuthUser } from '$shared/modules/auth/auth_user.entity';

export const handleRemult = remultSveltekit({
	dataProvider: createPostgresDataProvider({ connectionString: DATABASE_URL }),
	initApi: async (remult) => {
		console.table(await remult.repo(AuthUser).find());
	},
	getUser: async (event) => {
		return event.locals.user ?? undefined;
	},
	entities,
	controllers
});
