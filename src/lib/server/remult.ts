import type { Remult, UserInfo } from 'remult';
import type { RequestEvent } from '@sveltejs/kit';
import { Group } from '$shared/modules/groups/group.entity';
import { AuthUser } from '$shared/modules/auth/auth_user.entity';
import { ProfilesController } from '$shared/modules/profiles/profiles.controller';

export const initApi = async (remult: Remult) => {
	console.table(await remult.repo(AuthUser).find());
	console.table(await remult.repo(Group).find({ include: { profiles: true, admin: true } }));
};

export const getUser = async (event: RequestEvent): Promise<UserInfo | undefined> => {
	if (!event.locals.user) return undefined;

	const { id } = event.locals.user;

	const profile = await ProfilesController.findById(id, { user: true });

	if (!profile?.user) return undefined;

	return {
		id,
		name: profile.username ?? 'Unknown',
		email: profile.user.email ?? 'unknown-mail'
	};
};
