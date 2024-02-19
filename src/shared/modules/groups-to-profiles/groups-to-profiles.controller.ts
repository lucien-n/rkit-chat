import { BackendMethod, Controller, remult, type MembersToInclude, Allow } from 'remult';
import { Group } from '../groups/group.entity';
import { GroupsToProfiles } from './groups-to-profiles.entity';

@Controller('GroupsToProfileController')
export class GroupsToProfileController {
	@BackendMethod({ allowed: Allow.authenticated })
	static async findByUser(
		profileId: string,
		include: MembersToInclude<Group> = {}
	): Promise<Group[] | undefined> {
		const profileGroups = await remult.repo(GroupsToProfiles).find({
			where: { profileId }
		});

		const groupsIds = profileGroups.map(({ groupId }) => groupId);

		const groups = await remult.repo(Group).find({ where: { id: { $in: groupsIds } }, include });

		return remult.repo(Group).toJson(groups);
	}
}
