import { getStringOptions } from '$shared/helpers/helpers';
import { Entity, Fields, Relations } from 'remult';
import { Group } from '../groups/group.entity';
import { User } from '../users/user.entity';
import messageRules from './message.rules';

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
