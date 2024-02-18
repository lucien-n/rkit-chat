import { BackendMethod, Controller, remult } from 'remult';
import { Message } from './message.entity';
import type { CreateMessageInput } from './schemas/create-message.schema';
import { Error } from '$shared/helpers/errors';

@Controller('MessagesController')
export class MessagesController {
	@BackendMethod({ allowed: false })
	static async findById(id: string) {
		return remult.repo(Message).findOne({ where: { id } });
	}

	@BackendMethod({ allowed: false })
	static async create(inputs: CreateMessageInput) {
		const { content } = inputs;

		const user = remult.user;
		if (!user) throw Error.AuthRequired;

		return remult.repo(Message).insert({ content, authorId: user.id });
	}
}
