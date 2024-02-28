import messageRules from './message.rules';
import { User } from '../users/user.entity';
import { Group } from '../groups/group.entity';
import { getStringOptions } from '$shared/helpers/helpers';
import { Entity, Fields, Relations, remult } from 'remult';

@Entity<Message>('messages', {
	apiPrefilter: () => {
		return {
			groupId: { $in: remult.user?.groups }
		};
	},
	allowApiDelete: false,
	allowApiUpdate: false,
	allowApiInsert: false
})
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
