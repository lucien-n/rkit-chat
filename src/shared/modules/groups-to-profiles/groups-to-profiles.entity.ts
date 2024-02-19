import { Entity, Fields, Relations } from 'remult';
import { Group } from '../groups/group.entity';

@Entity<GroupsToProfiles>('groupsToProfiles', {
	id: {
		profileId: true,
		groupId: true
	}
})
export class GroupsToProfiles {
	@Fields.string()
	profileId = '';

	@Fields.string()
	groupId = '';

	@Relations.toOne<GroupsToProfiles, Group>(() => Group, 'groupId')
	group?: Group;
}
