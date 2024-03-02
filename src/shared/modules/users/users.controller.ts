import { toHandle, validateStringLength } from '$shared/helpers/helpers';
import {
	remult,
	Controller,
	BackendMethod,
	type EntityFilter,
	type MembersToInclude
} from 'remult';
import { User } from './user.entity';
import userRules from './user.rules';
import type { AuthUser } from '../auth/auth_user.entity';
import { UserSettings } from '../user-settings/user-settings.entity';

@Controller('UsersController')
export class UsersController {
	@BackendMethod({ apiPrefix: '/users', allowed: false })
	static async findById(
		id: string,
		include: MembersToInclude<User> = {}
	): Promise<User | undefined> {
		const user = remult.repo(User).findOne({ where: { id }, include });
		return remult.repo(User).toJson(user);
	}

	@BackendMethod({ apiPrefix: '/users', allowed: false })
	static async findOne(
		where: EntityFilter<User>,
		include: MembersToInclude<User> = {}
	): Promise<User | undefined> {
		const user = remult.repo(User).findOne({ where, include });
		return remult.repo(User).toJson(user);
	}

	@BackendMethod({ apiPrefix: '/users', allowed: false })
	static async create(authUser: AuthUser, username: string) {
		const existingUser = await remult.repo(User).findOne({ where: { id: authUser.id } });
		if (existingUser) return existingUser;

		const handle = toHandle(username);
		if (!validateStringLength(handle, userRules.field.handle)) throw 'Invalid username';

		const user = await remult.repo(User).insert({ id: authUser.id, username, handle });

		const settings = await remult.repo(UserSettings).insert({ id: user.id });
		await remult.repo(User).update(user.id, { settings });

		return UsersController.findById(user.id);
	}

	@BackendMethod({ apiPrefix: '/users', allowed: false })
	static async calculateGroupCount(userId: string) {
		const user = await UsersController.findById(userId, { groups: true });
		if (!user) throw 'Failed to calculate group count';

		const groupCount = user.groups?.length;
		if (groupCount === undefined) throw 'Failed to calculate group count';

		await remult.repo(User).update(userId, { groupCount });
	}
}
