import { Entity, Fields, Relations } from 'remult';
import { AuthUser } from '../auth/auth_user.entity';

@Entity<Profile>('profiles', { allowApiCrud: true }) // !temp
export class Profile {
	@Fields.string()
	id!: string;

	@Fields.createdAt()
	createdAt!: Date;

	@Fields.updatedAt()
	updatedAt!: Date;

	@Fields.string()
	username!: string;

	@Relations.toOne(() => AuthUser, { field: 'id' })
	user?: AuthUser;
}
