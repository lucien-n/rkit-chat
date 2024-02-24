import messageRules from './message.rules';
import { Group } from '../groups/group.entity';
import { Entity, Fields, Relations } from 'remult';
import { Profile } from '../profiles/profile.entity';

@Entity<Message>('messages')
export class Message {
	@Fields.uuid()
	id!: string;

	@Fields.createdAt()
	createdAt!: Date;

	@Fields.updatedAt()
	updatedAt!: Date;

	@Fields.string({ minLength: messageRules.content.min, maxLength: messageRules.content.max })
	content!: string;

	@Fields.string()
	groupId?: string;

	@Fields.string()
	authorId?: string;

	@Relations.toOne(() => Group, { field: 'groupId' })
	group?: Group;

	@Relations.toOne(() => Profile, { field: 'authorId' })
	author?: Profile;
}
