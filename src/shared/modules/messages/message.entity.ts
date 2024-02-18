import { Entity, Fields, Relations } from 'remult';
import { AuthUser } from '../auth/auth_user.entity';

@Entity<Message>('messages', {
	allowApiRead: (c) => {
		console.log('c', c);
		return true;
	}
})
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

	@Relations.toOne(() => AuthUser, { field: 'authorId' })
	author?: AuthUser;
}
