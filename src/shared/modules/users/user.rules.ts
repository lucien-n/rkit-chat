import type { User } from './user.entity';
import type { RuleSet } from '$shared/helpers/types';

export default {
	username: {
		min: 3,
		max: 24
	},
	handle: {
		min: 3,
		max: 24
	}
} as RuleSet<User, 'username' | 'handle'>;
