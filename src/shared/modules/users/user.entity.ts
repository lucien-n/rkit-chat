import { Entity, Fields, Relations } from 'remult';
import { AuthUser } from '../auth/auth_user.entity';
import { GroupsToUsers } from '../groups-to-users/groups-to-users.entity';

@Entity<User>('users', { allowApiCrud: true, id: { id: true } }) // !temp allowApiCrud
export class User {
	@Fields.string()
	id!: string;

	@Fields.createdAt()
	createdAt!: Date;

	@Fields.updatedAt()
	updatedAt!: Date;

	@Fields.string()
	username?: string;

	@Relations.toOne(() => AuthUser, { field: 'id' })
	user?: AuthUser;

	@Relations.toMany(() => GroupsToUsers, 'userId')
	groups?: GroupsToUsers[];
}
