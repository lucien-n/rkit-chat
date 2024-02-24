import { Group } from './group.entity';
import { parseZSchema } from '$shared/helpers/zod';
import { AuthError, Error } from '$shared/helpers/errors';
import { UsersController } from '../users/users.controller';
import { GroupsToUsers } from '../groups-to-users/groups-to-users.entity';
import { BackendMethod, Controller, remult, type MembersToInclude, Allow } from 'remult';
import { createGroupSchema, type CreateGroupInput } from './schemas/create-group.schema';

@Controller('GroupsController')
export class GroupsController {
	@BackendMethod({ allowed: false })
	static async findById(
		id: string,
		include: MembersToInclude<Group> = {}
	): Promise<Group | undefined> {
		const group = remult.repo(Group).findOne({ where: { id }, include });
		return remult.repo(Group).toJson(group);
	}

	@BackendMethod({ allowed: Allow.authenticated })
	static async findByUser(
		userId: string,
		include: MembersToInclude<Group> = {}
	): Promise<Group[] | undefined> {
		const userGroups = await remult.repo(GroupsToUsers).find({
			where: { userId: userId }
		});

		const groupsIds = userGroups.map(({ groupId }) => groupId);
		const groups = await remult.repo(Group).find({ where: { id: { $in: groupsIds } }, include });

		return remult.repo(Group).toJson(groups);
	}

	@BackendMethod({ allowed: false })
	static async create(inputs: CreateGroupInput) {
		const { name } = parseZSchema(inputs, createGroupSchema);

		const authUser = remult.user;
		if (!authUser) throw Error.AuthRequired;

		const user = await UsersController.findById(authUser.id);
		if (!user) throw AuthError.UserNotFound;

		const group = await remult.repo(Group).insert({ name, adminId: authUser.id });
		await remult
			.repo(Group)
			.relations(group)
			.users.insert([{ userId: user.id, groupId: group.id }]);

		return remult.repo(Group).toJson(group);
	}

	@BackendMethod({ allowed: false })
	static async add(userId: string, groupId: string) {
		const user = await UsersController.findById(userId);
		if (!user) {
			throw 'Failed to add user to group';
		}

		const group = await GroupsController.findById(groupId, { users: true });
		if (!group) {
			throw 'Failed to add user to group';
		}

		const userInGroup = group.users?.find((gtp) => gtp.userId === userId);
		if (userInGroup) {
			throw 'Failed to add user to group';
		}

		await remult.repo(Group).relations(group).users.insert([{ userId, groupId }]);
		await GroupsController.calculateUserCount(groupId);
	}

	@BackendMethod({ allowed: false })
	static async remove(userId: string, groupId: string) {
		const user = await UsersController.findById(userId);
		if (!user) {
			throw 'Failed to remove user from group';
		}

		const group = await GroupsController.findById(groupId, { users: true });
		if (!group) {
			throw 'Failed to remove user from group';
		}

		const userInGroup = group.users?.find((gtp) => gtp.userId === userId);
		if (!userInGroup) {
			throw 'Failed to remove user from group';
		}

		await remult.repo(Group).relations(group).users.delete({ userId, groupId });
		await GroupsController.calculateUserCount(groupId);
	}

	@BackendMethod({ allowed: false })
	static async calculateUserCount(groupId: string) {
		const group = await GroupsController.findById(groupId, { users: true });
		if (!group) {
			throw 'Failed to calculate user count';
		}

		const userCount = group.users?.length;
		if (userCount === undefined) {
			throw 'Failed to calculate user count';
		}

		await remult.repo(Group).update(groupId, { userCount });
	}
}
