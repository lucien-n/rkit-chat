import type { User } from '$shared/modules/users/user.entity';

export const urls = {
	home: { root: '/' },
	app: {
		groups: { root: '/app/g' },
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
