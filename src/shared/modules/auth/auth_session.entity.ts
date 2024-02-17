import { Entity, Fields, Relations } from 'remult';
import { AuthUser } from './auth_user.entity';

@Entity<AuthSession>('auth_sessions')
export class AuthSession {
	@Fields.uuid()
	id!: string;

	@Fields.date()
	expires_at!: Date;

	@Fields.string()
	user_id!: string;

	@Relations.toOne(() => AuthUser, { field: 'userId' })
	user!: AuthUser;
}
