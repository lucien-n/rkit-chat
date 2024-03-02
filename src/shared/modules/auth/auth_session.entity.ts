import { AuthUser } from './auth_user.entity';
import { Entity, Fields, Relations } from 'remult';

@Entity<AuthSession>('auth_sessions', { allowApiCrud: false })
export class AuthSession {
	@Fields.cuid()
	id!: string;

	@Fields.date()
	expires_at!: Date;

	@Fields.string()
	user_id?: string;

	@Relations.toOne(() => AuthUser, { field: 'userId' })
	user?: AuthUser;
}
