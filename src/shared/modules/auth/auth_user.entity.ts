import { Entity, Fields } from 'remult';

@Entity<AuthUser>('auth_users')
export class AuthUser {
	@Fields.uuid()
	id!: string;

	@Fields.createdAt()
	createdAt!: Date;

	@Fields.updatedAt()
	updatedAt!: Date;

	@Fields.string()
	username!: string;

	@Fields.string()
	email!: string;

	@Fields.string()
	hashedPassword!: string;
}
