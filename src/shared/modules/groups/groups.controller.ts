import { Group } from './group.entity';
import { parseZSchema } from '$shared/helpers/zod';
import { AuthError, Error } from '$shared/helpers/errors';
import { ProfilesController } from '../profiles/profiles.controller';
import { GroupsToProfiles } from '../groups-to-profiles/groups-to-profiles.entity';
import { BackendMethod, Controller, remult, type MembersToInclude, Allow } from 'remult';
import { createGroupSchema, type CreateGroupInput } from './schemas/create-group.schema';

@Controller('GroupsController')
export class GroupsController {
	@BackendMethod({ allowed: false })
	static async findById(
		id: string,
		include: MembersToInclude<Group> = {}
	): Promise<Group | undefined> {
		const profile = remult.repo(Group).findOne({ where: { id }, include });
		return remult.repo(Group).toJson(profile);
	}

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

	@BackendMethod({ allowed: false })
	static async create(inputs: CreateGroupInput) {
		const { name } = parseZSchema(inputs, createGroupSchema);

		const user = remult.user;
		if (!user) throw Error.AuthRequired;

		const profile = await ProfilesController.findById(user.id);
		if (!profile) throw AuthError.UserNotFound;

		const group = await remult.repo(Group).insert({ name, adminId: user.id });
		await remult
			.repo(Group)
			.relations(group)
			.profiles.insert([{ profileId: profile.id, groupId: group.id }]);

		return remult.repo(Group).toJson(group);
	}

	@BackendMethod({ allowed: false })
	static async add(profileId: string, groupId: string) {
		const profile = await ProfilesController.findById(profileId);
		if (!profile) {
			throw 'Failed to add user to group';
		}

		const group = await GroupsController.findById(groupId, { profiles: true });
		if (!group) {
			throw 'Failed to add user to group';
		}

		const profileInGroup = group.profiles?.find((gtp) => gtp.profileId === profileId);
		if (profileInGroup) {
			throw 'Failed to add user to group';
		}

		await remult
			.repo(Group)
			.relations(group)
			.profiles.insert([{ profileId: profileId, groupId: groupId }]);
	}

	@BackendMethod({ allowed: false })
	static async remove(profileId: string, groupId: string) {
		const profile = await ProfilesController.findById(profileId);
		if (!profile) {
			throw 'Failed to remove user from group';
		}

		const group = await GroupsController.findById(groupId, { profiles: true });
		if (!group) {
			throw 'Failed to remove user from group';
		}

		const profileInGroup = group.profiles?.find((gtp) => gtp.profileId === profileId);
		if (!profileInGroup) {
			throw 'Failed to remove user from group';
		}

		await remult.repo(Group).relations(group).profiles.delete({ profileId, groupId });
	}
}
