import { Entity, Fields, Relations } from 'remult';
import { AuthUser } from '../auth/auth_user.entity';

@Entity<Message>('messages', { allowApiCrud: true }) // !temp
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
