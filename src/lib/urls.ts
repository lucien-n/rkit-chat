export default {
	home: { root: '/' },
	app: {
		groups: { root: '/app/g' },
		profile: { root: '/app/p', me: '/app/p/me' }
	},
	auth: {
		signin: '/auth/signin',
		signup: '/auth/signup',
		signout: '/auth/signout'
	}
};
