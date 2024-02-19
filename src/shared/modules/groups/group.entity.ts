import { Allow, Entity, Fields, Relations } from 'remult';
import { Profile } from '../profiles/profile.entity';
import { GroupsToProfiles } from '../groups-to-profiles/groups-to-profiles.entity';

@Entity<Group>('groups', {
	allowApiCrud: Allow.authenticated
})
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
	profiles?: GroupsToProfiles[];
}
