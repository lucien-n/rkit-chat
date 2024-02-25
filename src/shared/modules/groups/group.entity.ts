import { getStringOptions } from '$shared/helpers/helpers';
import { Allow, Entity, Fields, Relations } from 'remult';
import { GroupsToUsers } from '../groups-to-users/groups-to-users.entity';
import { User } from '../users/user.entity';
import groupRules from './group.rules';

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

	@Fields.string(getStringOptions(groupRules.name))
	name?: string;

	@Fields.integer()
	userCount: number = 0;

	@Fields.string()
	adminId?: string;

	@Relations.toOne(() => User, { field: 'adminId' })
	admin?: User;

	@Relations.toMany(() => GroupsToUsers, 'groupId')
	users?: GroupsToUsers[];
}
