import { rejson } from '$helpers/rejson';
import { error, fail } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import type { User } from '$shared/modules/users/user.entity';
import { message, superValidate } from 'sveltekit-superforms/server';
import { UsersController } from '$shared/modules/users/users.controller';
import { GroupsController } from '$shared/modules/groups/groups.controller';
import { FriendsController } from '$shared/modules/friends/friends.controller';
import { createGroupSchema } from '$shared/modules/groups/schemas/create-group.schema';

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

export const actions: Actions = {
	createGroup: async (event) => {
		const form = await superValidate(event, zod(createGroupSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		const { name } = form.data;

		await GroupsController.create({ name });

		return message(form, 'Group created');
	}
};
