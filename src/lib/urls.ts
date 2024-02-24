export default {
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
