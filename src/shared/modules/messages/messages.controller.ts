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
		const user = remult.repo(Message).findOne({ where: { id }, include });
		return remult.repo(Message).toJson(user);
	}

	@BackendMethod({ allowed: Allow.authenticated })
	static async createMessage(inputs: CreateMessageInput, groupId: string) {
		const { content } = parseZSchema(inputs, createMessageSchema);

		const authUser = remult.user;
		if (!authUser) throw Error.AuthRequired;

		const group = await GroupsController.findById(groupId, { users: true });
		if (
			group?.adminId !== authUser.id &&
			!group?.users?.find(({ userId }) => userId === authUser.id)
		)
			throw Error.Forbidden;

		return remult.repo(Message).insert({ content, authorId: authUser.id, groupId });
	}

	@BackendMethod({ allowed: Allow.authenticated })
	static async deleteMessage(messageId: string) {
		const authUser = remult.user;
		if (!authUser) throw Error.AuthRequired;

		const message = await MessagesController.findById(messageId, { group: true });
		if (!message) throw 'Message not found';

		const isAuthor = authUser.id === message.authorId;
		const isAdmin = authUser.id === message.group?.adminId;

		if (!isAdmin && !isAuthor) throw 'You are neither the author or an admin';

		await remult.repo(Message).delete(messageId);
	}
}
