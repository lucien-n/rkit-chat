import groupRules from './group.rules';
import { User } from '../users/user.entity';
import { Entity, Fields, Relations } from 'remult';
import { getStringOptions } from '$shared/helpers/helpers';
import { GroupsToUsers } from '../groups-to-users/groups-to-users.entity';

@Entity<Group>('groups', { allowApiCrud: false, id: { id: true } })
export class Group {
	@Fields.string()
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
