import type { AuthUser } from './auth_user.entity';
import type { RuleSet } from '$shared/helpers/types';

export default {
	field: {
		password: {
			min: 8,
			max: 255
		}
	}
} satisfies {
	field: RuleSet<
		AuthUser & {
			password: string;
		},
		'password'
	>;
};
