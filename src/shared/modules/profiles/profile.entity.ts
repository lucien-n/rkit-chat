import { Entity, Fields, Relations } from 'remult';
import { AuthUser } from '../auth/auth_user.entity';
import { GroupsToProfiles } from '../groups-to-profile/groups-to-profile.entity';
import type { Group } from '../groups/group.entity';

@Entity<Profile>('profiles', { allowApiCrud: true, id: { id: true } }) // !temp allowApiCrud
export class Profile {
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

	@Relations.toMany(() => GroupsToProfiles, 'profileId')
	groups?: Group[];
}
