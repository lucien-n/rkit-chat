import { Friend } from './friend.entity';
import { BackendMethod, Controller, remult } from 'remult';

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

	@BackendMethod({ apiPrefix: 'friends', allowed: false })
	static async remove(userIdA: string, userIdB: string) {
		await remult.repo(Friend).delete({ userIdA, userIdB });
		await remult.repo(Friend).delete({ userIdB, userIdA });
	}

	@BackendMethod({ apiPrefix: 'friends', allowed: false })
	static async areFriends(userIdA: string, userIdB: string) {
		const existingFriend = await remult.repo(Friend).findOne({
			where: {
				$or: [
					{ userIdA, userIdB },
					{ userIdA: userIdB, userIdB: userIdA	 }
				]
			}
		});
		return remult.repo(Friend).toJson(existingFriend);
	}
}
