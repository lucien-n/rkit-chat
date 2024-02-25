import { toHandle, validateString } from '$shared/helpers/helpers';
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
	@BackendMethod({ allowed: false })
	static async findById(
		id: string,
		include: MembersToInclude<User> = {}
	): Promise<User | undefined> {
		const user = remult.repo(User).findOne({ where: { id }, include });
		return remult.repo(User).toJson(user);
	}

	@BackendMethod({ allowed: false })
	static async findOne(
		where: EntityFilter<User>,
		include: MembersToInclude<User> = {}
	): Promise<User | undefined> {
		const user = remult.repo(User).findOne({ where, include });
		return remult.repo(User).toJson(user);
	}

	@BackendMethod({ allowed: false })
	static async create(authUser: AuthUser, username: string) {
		const existingUser = await remult.repo(User).findOne({ where: { id: authUser.id } });
		if (existingUser) return existingUser;

		const handle = toHandle(username);
		if (!validateString(handle, userRules.handle)) throw 'Invalid username';

		const user = await remult.repo(User).insert({ id: authUser.id, username, handle });

		const settings = await remult.repo(UserSettings).insert({ id: user.id });
		await remult.repo(User).update(user.id, { settings });

		return UsersController.findById(user.id);
	}
}
