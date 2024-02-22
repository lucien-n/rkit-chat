import { Message } from './message.entity';
import { Error } from '$shared/helpers/errors';
import { parseZSchema } from '$shared/helpers/zod';
import { GroupsController } from '../groups/groups.controller';
import { BackendMethod, Controller, remult, type MembersToInclude, Allow } from 'remult';
import { createMessageSchema, type CreateMessageInput } from './schemas/create-message.schema';

@Controller('MessagesController')
export class MessagesController {
	@BackendMethod({ allowed: false })
	static async findById(
		id: string,
		include: MembersToInclude<Message> = {}
	): Promise<Message | undefined> {
		const profile = remult.repo(Message).findOne({ where: { id }, include });
		return remult.repo(Message).toJson(profile);
	}

	@BackendMethod({ allowed: Allow.authenticated })
	static async create(inputs: CreateMessageInput, groupId: string) {
		const { content } = parseZSchema(inputs, createMessageSchema);

		const user = remult.user;
		if (!user) throw Error.AuthRequired;

		const group = await GroupsController.findById(groupId, { profiles: true });
		if (
			group?.adminId !== user.id &&
			!group?.profiles?.find(({ profileId }) => profileId === user.id)
		)
			throw Error.Forbidden;

		return remult.repo(Message).insert({ content, authorId: user.id, groupId });
	}
}
