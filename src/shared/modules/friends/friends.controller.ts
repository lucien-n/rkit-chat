import { Error } from '$shared/helpers/errors';
import { Friend } from './friend.entity';
import { Allow, BackendMethod, Controller, remult } from 'remult';

@Controller('FriendsController')
export class FriendsController {
	@BackendMethod({ apiPrefix: 'friends', allowed: false })
	static async findFriends(userId: string): Promise<string[] | undefined> {
		const relations = await remult.repo(Friend).find({
			where: {
				$or: [{ userIdA: userId }, { userIdB: userId }]
			}
		});

		const friendsIds = relations
			.flatMap(({ userIdA, userIdB }) => [userIdA, userIdB])
			.filter((id) => id !== userId);

		return friendsIds;
	}

	@BackendMethod({ apiPrefix: 'friends', allowed: false })
	static async add(userIdA: string, userIdB: string) {
		const existingFriend = await remult.repo(Friend).findOne({
			where: {
				$or: [
					{ userIdA, userIdB },
					{ userIdA: userIdB, userIdB: userIdA }
				]
			}
		});
		if (existingFriend) throw 'You are already friends with this user';

		const friend = remult.repo(Friend).insert({ userIdA, userIdB });
		return remult.repo(Friend).toJson(friend);
	}

	@BackendMethod({ apiPrefix: 'friends', allowed: Allow.authenticated })
	static async remove(friendId: string) {
		const authUser = remult.user;
		if (!authUser) throw Error.AuthRequired;

		const friend = await FriendsController.areFriends(authUser.id, friendId);
		if (!friend) Error.InternalError;

		await remult.repo(Friend).delete(friend);
	}

	@BackendMethod({ apiPrefix: 'friends', allowed: false })
	static async areFriends(userIdA: string, userIdB: string) {
		const existingFriend = await remult.repo(Friend).findOne({
			where: {
				$or: [
					{ userIdA, userIdB },
					{ userIdA: userIdB, userIdB: userIdA }
				]
			}
		});
		return remult.repo(Friend).toJson(existingFriend);
	}
}
