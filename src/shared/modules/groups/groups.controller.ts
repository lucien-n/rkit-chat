import { nanoid } from 'nanoid';
import { Group } from './group.entity';
import groupRules from './group.rules';
import { parseZSchema } from '$shared/helpers/zod';
import { AuthError, Error } from '$shared/helpers/errors';
import { UsersController } from '../users/users.controller';
import { GroupsToUsers } from '../groups-to-users/groups-to-users.entity';
import { Allow, BackendMethod, Controller, remult, type MembersToInclude } from 'remult';
import { createGroupSchema, type CreateGroupInput } from './schemas/create-group.schema';

@Controller('GroupsController')
export class GroupsController {
	@BackendMethod({ apiPrefix: '/groups', allowed: false })
	static async findById(
		id: string,
		include: MembersToInclude<Group> = {}
	): Promise<Group | undefined> {
		const group = remult.repo(Group).findOne({ where: { id }, include });
		return remult.repo(Group).toJson(group);
	}

	@BackendMethod({ apiPrefix: '/groups', allowed: Allow.authenticated })
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

	@BackendMethod({ apiPrefix: '/groups', allowed: false })
	static async create(inputs: CreateGroupInput) {
		const { name } = parseZSchema(inputs, createGroupSchema);

		const authUser = remult.user;
		if (!authUser) throw Error.AuthRequired;

		const user = await UsersController.findById(authUser.id);
		if (!user) throw AuthError.UserNotFound;

		if (user.groupCount >= groupRules.maxGroups)
			throw `You've reached your group quota (${groupRules.maxGroups})`;

		const id = nanoid();
		const group = await remult.repo(Group).insert({ id, name, adminId: authUser.id, userCount: 1 });
		await remult
			.repo(Group)
			.relations(group)
			.users.insert([{ userId: user.id, groupId: group.id }]);

		return remult.repo(Group).toJson(group);
	}

	@BackendMethod({ apiPrefix: '/groups', allowed: false })
	static async add(userId: string, groupId: string) {
		const user = await UsersController.findById(userId);
		if (!user) throw 'Failed to add user to group';

		const group = await GroupsController.findById(groupId, { users: true });
		if (!group) throw 'Failed to add user to group';

		if (user.groupCount >= groupRules.maxGroups)
			throw `This user reach his group quota (${groupRules.maxGroups})`;

		const userInGroup = group.users?.find((gtp) => gtp.userId === userId);
		if (userInGroup) throw 'Failed to add user to group';

		await remult.repo(Group).relations(group).users.insert([{ userId, groupId }]);
		await GroupsController.calculateUserCount(groupId);
		await UsersController.calculateGroupCount(userId);
	}

	@BackendMethod({ apiPrefix: '/groups', allowed: false })
	static async remove(userId: string, groupId: string) {
		const user = await UsersController.findById(userId);
		if (!user) throw 'Failed to remove user from group';

		const group = await GroupsController.findById(groupId, { users: true });
		if (!group) throw 'Failed to remove user from group';

		const userInGroup = group.users?.find((gtp) => gtp.userId === userId);
		if (!userInGroup) throw 'Failed to remove user from group';

		await remult.repo(Group).relations(group).users.delete({ userId, groupId });
		await GroupsController.calculateUserCount(groupId);
		await UsersController.calculateGroupCount(userId);
	}

	@BackendMethod({ apiPrefix: '/groups', allowed: Allow.authenticated })
	static async leave(groupId: string) {
		const failMessage = 'Failed to leave group';

		const authUser = remult.user;
		if (!authUser) throw failMessage;

		const user = await UsersController.findById(authUser.id);
		if (!user) throw failMessage;

		const group = await GroupsController.findById(groupId);
		if (!group) throw failMessage;

		const isAdmin = authUser.id === group.adminId;
		if (isAdmin) throw failMessage;

		await GroupsController.remove(authUser.id, groupId);
	}

	@BackendMethod({ apiPrefix: '/groups', allowed: false })
	static async calculateUserCount(groupId: string) {
		const group = await GroupsController.findById(groupId, { users: true });
		if (!group) throw 'Failed to calculate user count';

		const userCount = group.users?.length;
		if (userCount === undefined) throw 'Failed to calculate user count';

		await remult.repo(Group).update(groupId, { userCount });
	}

	@BackendMethod({ apiPrefix: '/groups', allowed: Allow.authenticated })
	static async delete(groupId: string) {
		const user = remult.user;
		if (!user) throw Error.AuthRequired;

		const group = await GroupsController.findById(groupId);
		if (!group) throw 'Failed to delete group';

		const isUserAdmin = user.id === group.adminId;
		if (!isUserAdmin) throw 'Failed to delete group';

		await remult.repo(Group).delete(groupId);
	}
}
