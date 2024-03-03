import type { User } from '$shared/modules/users/user.entity';
import type { Group } from '$shared/modules/groups/group.entity';

export const urls = {
	home: { root: '/' },
	app: {
		group: { root: '/app/g' },
		user: { root: '/app/u', me: '/app/u/me' }
	},
	auth: {
		signin: '/auth/signin',
		signup: '/auth/signup',
		signout: '/auth/signout'
	}
};

export const getUserUrl = (user: User | undefined | null) =>
	user ? `${urls.app.user.root}/${user.handle}` : urls.home.root;

export const getGroupUrl = (group: Group | undefined | null) =>
	group ? `${urls.app.group.root}/${group.id}` : urls.home.root;

export const actions = {
	sendFriendRequest: '/actions/send-friend-request',
	sendMessage: '/actions/send-message/[groupId]',
	createGroup: '/actions/group-message'
} as const;

type Actions = typeof actions;

type ActionParams<T extends keyof Actions> = Actions[T] extends `${string}[${infer Param}]`
	? Record<Param, string>
	: undefined;

export const getAction = <T extends keyof Actions>(action: T, params?: ActionParams<T>): string => {
	let url: Actions[T] = actions[action]; // Declare 'url' with correct type
	if (params !== undefined) {
		Object.entries(params).forEach(([key, value]) => {
			url = url.replace(`[${key}]`, value) as Actions[T]; // Cast 'url' back to its original type after modification
		});
	}
	return url;
};
