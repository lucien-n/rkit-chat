import messageRules from './message.rules';
import { User } from '../users/user.entity';
import { Group } from '../groups/group.entity';
import { Entity, Fields, Relations } from 'remult';
import { getStringOptions } from '$shared/helpers/helpers';

@Entity<Message>('messages')
export class Message {
	@Fields.uuid()
	id!: string;

	@Fields.createdAt()
	createdAt!: Date;

	@Fields.updatedAt()
	updatedAt!: Date;

	@Fields.string(getStringOptions(messageRules.content))
	content!: string;

	@Fields.boolean()
	edited: boolean = false;

	@Fields.string()
	groupId?: string;

	@Fields.string()
	authorId?: string;

	@Relations.toOne(() => Group, { field: 'groupId' })
	group?: Group;

	@Relations.toOne(() => User, { field: 'authorId' })
	author?: User;
}
