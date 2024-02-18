import { BackendMethod, Controller, remult, type MembersToInclude } from 'remult';
import type { AuthUser } from '../auth/auth_user.entity';
import { Profile } from './profile.entity';

@Controller('ProfilesController')
export class ProfilesController {
	@BackendMethod({ allowed: false })
	static async findById(
		id: string,
		include: MembersToInclude<Profile> = {}
	): Promise<Profile | undefined> {
		const profile = remult.repo(Profile).findOne({ where: { id }, include });
		return remult.repo(Profile).toJson(profile);
	}

	@BackendMethod({ allowed: false })
	static async create(authUser: AuthUser, username: string) {
		const profile = await remult.repo(Profile).findOne({ where: { id: authUser.id } });
		if (profile) return profile;

		const newProfile = remult.repo(Profile).insert({ id: authUser.id, username });
		return remult.repo(Profile).toJson(newProfile);
	}
}
