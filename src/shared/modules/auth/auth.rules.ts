import type { AuthUser } from './auth_user.entity';
import type { RuleSet } from '$shared/helpers/types';

export default {
	password: {
		min: 8,
		max: 255
	}
} satisfies RuleSet<
	AuthUser & {
		password: string;
	},
	'password'
>;
