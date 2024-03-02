import { Error } from '$shared/helpers/errors';
import { Friend } from '../friends/friend.entity';
import { FriendRequest } from './friend-request.entity';
import { BackendMethod, Controller, remult } from 'remult';
import { UsersController } from '../users/users.controller';
import { FriendsController } from '../friends/friends.controller';

@Controller('FriendRequestsController')
export class FriendRequestsController {
	@BackendMethod({ apiPrefix: 'friend-requests', allowed: false })
	static async send(handle: string) {
		const authUser = remult.user;
		if (!authUser) throw Error.AuthRequired;

		const receiver = await UsersController.findOne({ handle });
		if (!receiver) throw 'User not found';

		const fromUserId = authUser.id;
		const toUserId = receiver.id;

		const existingFriend = await remult.repo(Friend).findOne({
			where: {
				$or: [
					{ userIdA: fromUserId, userIdB: toUserId },
					{ userIdA: toUserId, userIdB: fromUserId }
				]
			}
		});
		if (existingFriend) throw 'You are already friends with this user';

		const exists = await remult
			.repo(FriendRequest)
			.findOne({ where: { $and: [{ fromUserId }, { toUserId }] } });
		if (exists) throw 'You already sent a friend request to this user';

		const friendRequest = await remult.repo(FriendRequest).insert({ fromUserId, toUserId });

		return remult.repo(FriendRequest).toJson(friendRequest);
	}

	@BackendMethod({ apiPrefix: 'friend-requests', allowed: true })
	static async accept(senderId: string) {
		if (!senderId) throw Error.InternalError;

		const authUser = remult.user;
		if (!authUser) throw Error.AuthRequired;

		const fromUserId = senderId;
		const toUserId = authUser.id;

		const existingFriendRequest = await remult
			.repo(FriendRequest)
			.findOne({ where: { fromUserId, toUserId } });
		if (!existingFriendRequest) throw 'Friend request not found';

		// delete invite bothways
		for await (const request of remult.repo(FriendRequest).query({
			where: {
				$or: [
					{ fromUserId, toUserId },
					{ fromUserId: authUser.id, toUserId: senderId }
				]
			}
		})) {
			remult.repo(FriendRequest).delete(request);
		}

		return FriendsController.add(fromUserId, toUserId);
	}
}
