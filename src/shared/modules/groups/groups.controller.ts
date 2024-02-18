import { BackendMethod, Controller, remult } from 'remult';
import { createGroupSchema, type CreateGroupInput } from './schemas/create-group.schema';
import { parseZSchema } from '$shared/helpers/zod';
import { Error } from '$shared/helpers/errors';
import { Group } from './group.entity';

@Controller('GroupsController')
export class GroupsController {
	@BackendMethod({ allowed: false })
	static async create(inputs: CreateGroupInput) {
		const { name } = parseZSchema(inputs, createGroupSchema);

		const currentUser = remult.user;
		if (!currentUser) throw Error.AuthRequired;

		const group = await remult.repo(Group).insert({ name, adminId: currentUser.id });

		return remult.repo(Group).toJson(group);
	}
}
