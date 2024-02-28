import type { Group } from './group.entity';
import type { RuleSet } from '$shared/helpers/types';

export default {
	field: {
		name: {
			min: 3,
			max: 32
		}
	}
} satisfies { field: RuleSet<Group, 'name'> };
