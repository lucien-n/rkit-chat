import groupRules from './group.rules';
import { User } from '../users/user.entity';
import { Allow, Entity, Fields, Relations } from 'remult';
import { GroupsToUsers } from '../groups-to-users/groups-to-users.entity';

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

	@Fields.string({ minLength: groupRules.name.min, maxLength: groupRules.name.max })
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
