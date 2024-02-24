import type { Remult, UserInfo } from 'remult';
import type { RequestEvent } from '@sveltejs/kit';
import { Group } from '$shared/modules/groups/group.entity';
import { AuthUser } from '$shared/modules/auth/auth_user.entity';
import { UsersController } from '$shared/modules/users/users.controller';

export const initApi = async (remult: Remult) => {
	console.table(await remult.repo(AuthUser).find());
	console.table(await remult.repo(Group).find({ include: { users: true, admin: true } }));
};

export const getUser = async (event: RequestEvent): Promise<UserInfo | undefined> => {
	if (!event.locals.authUser) return undefined;

	const { id } = event.locals.authUser;

	const user = await UsersController.findById(id, { user: true });

	if (!user?.user) return undefined;

	return {
		id,
		name: user.username ?? 'Unknown',
		email: user.user.email ?? 'unknown-mail'
	};
};
