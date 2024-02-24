import messageRules from './message.rules';
import { Group } from '../groups/group.entity';
import { Entity, Fields, Relations } from 'remult';
import { Profile } from '../profiles/profile.entity';
import { validateStringField } from '$shared/helpers/validate';

@Entity<Message>('messages')
export class Message {
	@Fields.uuid()
	id!: string;

	@Fields.createdAt()
	createdAt!: Date;

	@Fields.updatedAt()
	updatedAt!: Date;

	@Fields.string({ validate: (value) => validateStringField(value, messageRules.content) })
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
