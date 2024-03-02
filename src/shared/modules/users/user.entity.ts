import userRules from './user.rules';
import { Friend } from '../friends/friend.entity';
import { AuthUser } from '../auth/auth_user.entity';
import { getStringOptions } from '$shared/helpers/helpers';
import { Entity, Fields, Relations, remult } from 'remult';
import { UserSettings } from '../user-settings/user-settings.entity';
import { FriendRequest } from '../friend-requests/friend-request.entity';
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
	groupCount: number = 0;

	@Relations.toOne(() => AuthUser, { field: 'id' })
	user?: AuthUser;

	@Relations.toOne(() => UserSettings, { field: 'id' })
	settings?: UserSettings;

	@Relations.toMany(() => GroupsToUsers, 'userId')
	groups?: GroupsToUsers[];

	@Relations.toMany(() => Friend, 'userIdA')
	friends?: Friend[];

	@Relations.toMany(() => FriendRequest, 'toUserId')
	receivedFriendRequests?: FriendRequest[];

	@Relations.toMany(() => FriendRequest, 'fromUserId')
	sentFriendRequests?: FriendRequest[];
}
