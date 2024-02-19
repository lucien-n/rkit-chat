import { BackendMethod, Controller, remult, type MembersToInclude, type Repository } from 'remult';
import { createGroupSchema, type CreateGroupInput } from './schemas/create-group.schema';
import { parseZSchema } from '$shared/helpers/zod';
import { AuthError, Error } from '$shared/helpers/errors';
import { Group } from './group.entity';
import { ProfilesController } from '../profiles/profiles.controller';

@Controller('GroupsController')
export class GroupsController {
	static repo: Repository<Group> = remult.repo(Group);

	@BackendMethod({ allowed: false })
	static async findById(
		id: string,
		include: MembersToInclude<Group> = {}
	): Promise<Group | undefined> {
		const profile = this.repo.findOne({ where: { id }, include });
		return this.repo.toJson(profile);
	}

	@BackendMethod({ allowed: false })
	static async create(inputs: CreateGroupInput) {
		const { name } = parseZSchema(inputs, createGroupSchema);

		const user = remult.user;
		if (!user) throw Error.AuthRequired;

		const profile = await ProfilesController.findById(user.id);
		if (!profile) throw AuthError.UserNotFound;

		const group = await this.repo.insert({ name, adminId: user.id });
		console.log(group, profile);
		const res = await this.repo
			.relations(group)
			.profiles.insert([{ profileId: profile.id, groupId: group.id }]);
		console.log(res);

		return this.repo.toJson(group);
	}
}
