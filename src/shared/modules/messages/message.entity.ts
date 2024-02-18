import { Entity, Fields, Relations } from 'remult';
import { Profile } from '../profiles/profile.entity';

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
	authorId!: string;

	@Relations.toOne(() => Profile, { field: 'authorId' })
	author?: Profile;
}
