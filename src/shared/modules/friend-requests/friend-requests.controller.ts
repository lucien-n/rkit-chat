import { Error } from '$shared/helpers/errors';
import { FriendRequest } from './friend-request.entity';
import { BackendMethod, Controller, remult } from 'remult';
import { UsersController } from '../users/users.controller';

@Controller('FriendRequestsController')
export class FriendRequestsController {
	@BackendMethod({ apiPrefix: 'friend-requests', allowed: false })
	static async sendFriendRequest(handle: string) {
		const authUser = remult.user;
		if (!authUser) throw Error.AuthRequired;

		const receiver = await UsersController.findOne({ handle });
		if (!receiver) throw 'User not found';

		const fromUserId = authUser.id;
		const toUserId = receiver.id;

		const exists = await remult
			.repo(FriendRequest)
			.findOne({ where: { $and: [{ fromUserId }, { toUserId }] } });
		if (exists) throw 'You already sent a friend request to this user';

		const friendRequest = await remult.repo(FriendRequest).insert({ fromUserId, toUserId });

		return remult.repo(FriendRequest).toJson(friendRequest);
	}

	@BackendMethod({ apiPrefix: 'friend-requests', allowed: false })
	static async acceptFriendRequest(senderId: string) {
		const authUser = remult.user;
		if (!authUser) throw Error.AuthRequired;

		const fromUserId = senderId;
		const toUserId = authUser.id;

		const exists = await remult
			.repo(FriendRequest)
			.findOne({ where: { $and: [{ fromUserId }, { toUserId }] } });
		if (!exists) throw 'Friend request not found';

		const friendRequest = await remult.repo(FriendRequest).insert({ fromUserId, toUserId });

		return remult.repo(FriendRequest).toJson(friendRequest);
	}
}