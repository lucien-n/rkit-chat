import { rejson } from '$helpers/rejson';
import { FriendsController } from '$shared/modules/friends/friends.controller';
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
		(await UsersController.find({
			id: { $in: user.receivedFriendRequests?.flatMap(({ fromUserId }) => fromUserId) ?? [] }
		})) ?? [];

	const sentFriendRequests =
		(await UsersController.find({
			id: { $in: user.receivedFriendRequests?.flatMap(({ toUserId }) => toUserId) ?? [] }
		})) ?? [];

	const friends =
		(await FriendsController.findFriends(user.id).then((friendsIds) =>
			UsersController.find({ id: { $in: friendsIds } })
		)) ?? [];

	return {
		user: rejson(user),
		receivedFriendRequests: receivedFriendRequests,
		sentFriendRequests: sentFriendRequests,
		friends
	};
};
