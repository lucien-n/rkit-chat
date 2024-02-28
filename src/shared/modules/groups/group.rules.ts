import type { Group } from './group.entity';
import type { Rule } from '$shared/helpers/types';

export default {
	field: {
		name: {
			min: 3,
			max: 32
		}
	},
	maxGroups: 30
} satisfies Rule<Group, 'name'>;
