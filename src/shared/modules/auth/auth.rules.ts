import type { AuthUser } from './auth_user.entity';
import type { Rule } from '$shared/helpers/types';

export default {
	field: {
		password: {
			min: 8,
			max: 255
		}
	}
} satisfies Rule<
	AuthUser & {
		password: string;
	},
	'password'
>;
