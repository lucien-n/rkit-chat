import groupRules from './group.rules';
import { dbNames } from '$shared/helpers/remult';
import { Profile } from '../profiles/profile.entity';
import { Allow, Entity, Fields, Relations } from 'remult';
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

	@Fields.string({ minLength: groupRules.name.min, maxLength: groupRules.name.max })
	name?: string;

	@Fields.integer({
		sqlExpression: () => {
			const gtp = dbNames(GroupsToProfiles, true);
			const p = dbNames(Profile);

			return `(
				SELECT COUNT(${p.id})
				FROM public."${gtp}"
				LEFT JOIN ${p} ON ${gtp.profileId} = ${p.id}
			)`;
		}
	})
	profileCount: number = 0;

	@Fields.string()
	adminId?: string;

	@Relations.toOne(() => Profile, { field: 'adminId' })
	admin?: Profile;

	@Relations.toMany(() => GroupsToProfiles, 'groupId')
	profiles?: GroupsToProfiles[];
}
