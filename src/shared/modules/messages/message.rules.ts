import type { Message } from './message.entity';
import type { RuleSet } from '$shared/helpers/types';

export default {
	field: {
		content: {
			min: 1,
			max: 1024
		}
	}
} satisfies { field: RuleSet<Message, 'content'> };
