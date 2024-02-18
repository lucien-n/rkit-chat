import { BackendMethod, Controller, remult, type MembersToInclude } from 'remult';
import { createGroupSchema, type CreateGroupInput } from './schemas/create-group.schema';
import { parseZSchema } from '$shared/helpers/zod';
import { Error } from '$shared/helpers/errors';
import { Group } from './group.entity';

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

		const currentUser = remult.user;
		if (!currentUser) throw Error.AuthRequired;

		const group = await remult.repo(Group).insert({ name, adminId: currentUser.id });

		return remult.repo(Group).toJson(group);
	}
}
