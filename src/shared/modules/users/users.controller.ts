import { User } from './user.entity';
import type { AuthUser } from '../auth/auth_user.entity';
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
		const user = await remult.repo(User).findOne({ where: { id: authUser.id } });
		if (user) return user;

		const newUser = remult.repo(User).insert({ id: authUser.id, username });
		return remult.repo(User).toJson(newUser);
	}
}
