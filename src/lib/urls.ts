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

export const actions = {
	addFriend: '/actions/add-friend'
};

export const getUserUrl = (user: User | undefined | null) =>
	user ? `${urls.app.user.root}/${user.handle}` : urls.home.root;

export const getGroupUrl = (group: Group | undefined | null) =>
	group ? `${urls.app.group.root}/${group.id}` : urls.home.root;
