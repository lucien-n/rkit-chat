import { Entity, Fields } from 'remult';

@Entity<AuthUser>('auth_users', { allowApiCrud: false })
export class AuthUser {
	@Fields.cuid()
	id!: string;

	@Fields.createdAt()
	createdAt!: Date;

	@Fields.updatedAt()
	updatedAt!: Date;

	@Fields.string()
	email?: string;

	@Fields.string()
	hashedPassword?: string;
}
