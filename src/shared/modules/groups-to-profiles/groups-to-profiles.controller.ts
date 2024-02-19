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
		const groups = await remult.repo(GroupsToProfiles).find({
			where: { profileId },
			include: { group: true, ...include }
		});
		return remult
			.repo(GroupsToProfiles)
			.toJson(groups)
			.map(({ group }) => group);
	}
}
