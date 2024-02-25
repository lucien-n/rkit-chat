import type { RuleSet } from '$shared/helpers/types';
import type { User } from './user.entity';

export default {
	username: {
		min: 3,
		max: 24
	}
} as RuleSet<User, 'username'>;
