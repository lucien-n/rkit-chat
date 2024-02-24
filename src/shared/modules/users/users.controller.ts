import { User } from './user.entity';
import type { AuthUser } from '../auth/auth_user.entity';
import { UserSettings } from '../user-settings/user-settings.entity';
import { BackendMethod, Controller, remult, type MembersToInclude } from 'remult';

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
	static async create(authUser: AuthUser, username: string) {
		const existingUser = await remult.repo(User).findOne({ where: { id: authUser.id } });
		if (existingUser) return existingUser;

		const user = await remult.repo(User).insert({ id: authUser.id, username });

		const settings = await remult.repo(UserSettings).insert({ id: user.id });
		await remult.repo(User).update(user.id, { settings });

		return UsersController.findById(user.id);
	}
}
