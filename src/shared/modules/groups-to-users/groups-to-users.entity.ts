import { Group } from '../groups/group.entity';
import { Entity, Fields, Relations } from 'remult';

@Entity<GroupsToUsers>('groups_to_users', {
	id: {
		userId: true,
		groupId: true
	}
})
export class GroupsToUsers {
	@Fields.string()
	userId = '';

	@Fields.string()
	groupId = '';

	@Relations.toOne<GroupsToUsers, Group>(() => Group, 'groupId')
	group?: Group;
}
