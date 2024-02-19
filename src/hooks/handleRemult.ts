import { remultSveltekit } from 'remult/remult-sveltekit';
import { createPostgresDataProvider } from 'remult/postgres';
import { DATABASE_URL } from '$env/static/private';
import { controllers, entities } from '$shared';
import { AuthUser } from '$shared/modules/auth/auth_user.entity';
import { ProfilesController } from '$shared/modules/profiles/profiles.controller';
import { Group } from '$shared/modules/groups/group.entity';

export const handleRemult = remultSveltekit({
	dataProvider: createPostgresDataProvider({ connectionString: DATABASE_URL }),
	initApi: async (remult) => {
		console.table(await remult.repo(AuthUser).find());
		console.table(await remult.repo(Group).find({ include: { profiles: true, admin: true } }));
	},
	getUser: async (event) => {
		if (!event.locals.user) return undefined;

		const { id } = event.locals.user;

		const profile = await ProfilesController.findById(id, { user: true });

		if (!profile?.user) return undefined;

		return {
			id,
			name: profile.username ?? 'Unknown',
			email: profile.user.email ?? 'unknown-mail'
		};
	},
	entities,
	controllers
});
