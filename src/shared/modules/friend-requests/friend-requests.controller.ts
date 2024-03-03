import { Error } from '$shared/helpers/errors';
import { FriendRequest } from './friend-request.entity';
import { Allow, BackendMethod, Controller, remult } from 'remult';
import { UsersController } from '../users/users.controller';
import { FriendsController } from '../friends/friends.controller';

@Controller('FriendRequestsController')
export class FriendRequestsController {
	@BackendMethod({ apiPrefix: 'friend-requests', allowed: false })
	static async delete(userIdA: string, userIdB: string) {
		// delete invite bothways
		for await (const request of remult.repo(FriendRequest).query({
			where: {
				$or: [
					{ fromUserId: userIdA, toUserId: userIdB },
					{ fromUserId: userIdB, toUserId: userIdA }
				]
			}
		})) {
			await remult.repo(FriendRequest).delete(request);
		}
	}

	@BackendMethod({ apiPrefix: 'friend-requests', allowed: false })
	static async send(handle: string) {
		const authUser = remult.user;
		if (!authUser) throw Error.AuthRequired;

		const receiver = await UsersController.findOne({ handle });
		if (!receiver) throw 'User not found';

		const fromUserId = authUser.id;
		const toUserId = receiver.id;

		if (fromUserId === toUserId) throw 'You cannot send a friend request to yourself';

		const existingFriend = await FriendsController.areFriends(fromUserId, toUserId);
		if (existingFriend) throw 'You are already friends with this user';

		const exists = await remult
			.repo(FriendRequest)
			.findOne({ where: { $and: [{ fromUserId }, { toUserId }] } });
		if (exists) throw 'You already sent a friend request to this user';

		const friendRequest = await remult.repo(FriendRequest).insert({ fromUserId, toUserId });

		return remult.repo(FriendRequest).toJson(friendRequest);
	}

	@BackendMethod({ apiPrefix: 'friend-requests', allowed: Allow.authenticated })
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

		await FriendRequestsController.delete(fromUserId, toUserId);

		return FriendsController.add(fromUserId, toUserId);
	}

	@BackendMethod({ apiPrefix: 'friend-requests', allowed: Allow.authenticated })
	static async decline(senderId: string) {
		if (!senderId) throw Error.InternalError;

		const authUser = remult.user;
		if (!authUser) throw Error.AuthRequired;

		const fromUserId = senderId;
		const toUserId = authUser.id;

		const existingFriendRequest = await remult
			.repo(FriendRequest)
			.findOne({ where: { fromUserId, toUserId } });
		if (!existingFriendRequest) throw 'Friend request not found';

		await FriendRequestsController.delete(fromUserId, toUserId);
	}
}
