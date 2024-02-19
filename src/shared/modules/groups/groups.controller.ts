import { BackendMethod, Controller, remult, type MembersToInclude } from 'remult';
import { createGroupSchema, type CreateGroupInput } from './schemas/create-group.schema';
import { parseZSchema } from '$shared/helpers/zod';
import { AuthError, Error } from '$shared/helpers/errors';
import { Group } from './group.entity';
import { Profile } from '../profiles/profile.entity';
import { ProfilesController } from '../profiles/profiles.controller';

@Controller('GroupsController')
export class GroupsController {
	@BackendMethod({ allowed: false })
	static async findById(
		id: string,
		include: MembersToInclude<Group> = {}
	): Promise<Group | undefined> {
		const profile = remult.repo(Group).findOne({ where: { id }, include });
		return remult.repo(Group).toJson(profile);
	}

	@BackendMethod({ allowed: false })
	static async create(inputs: CreateGroupInput) {
		const { name } = parseZSchema(inputs, createGroupSchema);

		const user = remult.user;
		if (!user) throw Error.AuthRequired;

		const profile = await ProfilesController.findById(user.id);
		if (!profile) throw AuthError.UserNotFound;

		const group = await remult.repo(Group).insert({ name, adminId: user.id });
		await remult.repo(Profile).relations(profile).groups.insert([group]);

		return remult.repo(Group).toJson(group);
	}
}
