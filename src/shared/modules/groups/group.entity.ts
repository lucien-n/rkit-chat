import { Entity, Fields, Relations } from 'remult';
import { Profile } from '../profiles/profile.entity';
import { GroupsToProfiles } from '../groups-to-profile/groups-to-profile.entity';

@Entity<Group>('groups')
export class Group {
	@Fields.uuid()
	id!: string;

	@Fields.createdAt()
	createdAt!: Date;

	@Fields.updatedAt()
	updatedAt!: Date;

	@Fields.string()
	name?: string;

	@Fields.string()
	adminId?: string;

	@Relations.toOne(() => Profile, { field: 'adminId' })
	admin?: Profile;

	@Relations.toMany(() => GroupsToProfiles, 'groupId')
	profiles?: Profile[];
}
