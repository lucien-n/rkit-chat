import { rejson } from '$helpers/rejson';
import { FriendsController } from '$shared/modules/friends/friends.controller';
import type { User } from '$shared/modules/users/user.entity';
import { UsersController } from '$shared/modules/users/users.controller';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { handle } = params;

	const user = await UsersController.findOne(
		{ handle },
		{ friends: true, sentFriendRequests: true, receivedFriendRequests: true }
	);
	if (!user) {
		error(404, 'User not found');
	}

	const receivedFriendRequests =
		(user.receivedFriendRequests
			?.map(async ({ fromUserId }) => await UsersController.findById(fromUserId))
			.filter((user) => user !== undefined) as Promise<User>[]) ?? [];

	const sentFriendRequests =
		(user.sentFriendRequests
			?.map(async ({ toUserId }) => await UsersController.findById(toUserId))
			.filter((user) => user !== undefined) as Promise<User>[]) ?? [];

	const friends =
		(await FriendsController.findFriends(user.id).then((friendsIds) =>
			UsersController.find({ id: { $in: friendsIds } })
		)) ?? [];

	return {
		user: rejson(user),
		receivedFriendRequests: await Promise.all(receivedFriendRequests),
		sentFriendRequests: await Promise.all(sentFriendRequests),
		friends
	};
};
