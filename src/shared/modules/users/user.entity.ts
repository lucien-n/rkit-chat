import userRules from './user.rules';
import { AuthUser } from '../auth/auth_user.entity';
import { getStringOptions } from '$shared/helpers/helpers';
import { Entity, Fields, Relations, remult } from 'remult';
import { UserSettings } from '../user-settings/user-settings.entity';
import { GroupsToUsers } from '../groups-to-users/groups-to-users.entity';

@Entity<User>('users', { apiPrefilter: () => ({ id: remult.user?.id }), id: { id: true } }) // !temp allowApiCrud
export class User {
	@Fields.string()
	id!: string;

	@Fields.createdAt()
	createdAt!: Date;

	@Fields.updatedAt()
	updatedAt!: Date;

	@Fields.string()
	handle!: string;

	@Fields.string(getStringOptions(userRules.field.username))
	username!: string;

	@Fields.integer()
	groupCount: number = 50;

	@Relations.toOne(() => AuthUser, { field: 'id' })
	user?: AuthUser;

	@Relations.toOne(() => UserSettings, { field: 'id' })
	settings?: UserSettings;

	@Relations.toMany(() => GroupsToUsers, 'userId')
	groups?: GroupsToUsers[];
}
