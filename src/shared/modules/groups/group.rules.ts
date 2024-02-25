import type { Group } from './group.entity';
import type { RuleSet } from '$shared/helpers/types';

export default {
	name: {
		min: 3,
		max: 32
	}
} satisfies RuleSet<Group, 'name'>;
