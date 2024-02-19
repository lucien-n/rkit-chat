import { BackendMethod, Controller, remult, type MembersToInclude } from 'remult';
import { Message } from './message.entity';
import type { CreateMessageInput } from './schemas/create-message.schema';
import { Error } from '$shared/helpers/errors';
import { GroupsController } from '../groups/groups.controller';

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

	@BackendMethod({ allowed: false })
	static async create(inputs: CreateMessageInput, groupId: string) {
		const { content } = inputs;

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
