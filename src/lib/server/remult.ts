import type { UserInfo } from 'remult';
import type { RequestEvent } from '@sveltejs/kit';
import { UsersController } from '$shared/modules/users/users.controller';
import { GroupsController } from '$shared/modules/groups/groups.controller';

export const initApi = async () => {};

export const getUser = async (event: RequestEvent): Promise<UserInfo | undefined> => {
	if (!event.locals.authUser) return undefined;

	const { id } = event.locals.authUser;

	const user = await UsersController.findById(id, { user: true });
	if (!user?.user) return undefined;

	const groups = (await GroupsController.findByUser(user.id)) ?? [];

	return {
		id,
		name: user.username ?? 'Unknown',
		email: user.user.email ?? 'unknown-mail',
		groups: groups.map(({ id }) => id)
	};
};
