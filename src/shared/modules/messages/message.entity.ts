import { Entity, Fields, Relations } from 'remult';
import { Profile } from '../profiles/profile.entity';
import { Group } from '../groups/group.entity';

@Entity<Message>('messages', { allowApiCrud: true }) // !temp allowApiCrud
export class Message {
	@Fields.uuid()
	id!: string;

	@Fields.createdAt()
	createdAt!: Date;

	@Fields.updatedAt()
	updatedAt!: Date;

	@Fields.string()
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
