import { remultSveltekit } from 'remult/remult-sveltekit';
import { createPostgresDataProvider } from 'remult/postgres';
import { DATABASE_URL } from '$env/static/private';
import { controllers, entities } from '$shared';
import { AuthUser } from '$shared/modules/auth/auth_user.entity';
import { AuthController } from '$shared/modules/auth/auth.controller';

export const handleRemult = remultSveltekit({
	dataProvider: createPostgresDataProvider({ connectionString: DATABASE_URL }),
	initApi: async (remult) => {
		console.table(await remult.repo(AuthUser).find());
	},
	getUser: async (event) => {
		if (!event.locals.user) return undefined;

		const { id } = event.locals.user;

		const user = await AuthController.findById(id);

		return {
			id,
			name: user.username,
			email: user.email
		};
	},
	entities,
	controllers
});
