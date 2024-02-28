import type { User } from './user.entity';
import type { Rule } from '$shared/helpers/types';

export default {
	field: {
		username: {
			min: 3,
			max: 24
		},
		handle: {
			min: 3,
			max: 24
		}
	}
} as Rule<User, 'username' | 'handle'>;
