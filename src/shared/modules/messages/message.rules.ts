import type { RuleSet } from '$shared/helpers/types';
import type { Message } from './message.entity';

export default {
	content: {
		min: 1,
		max: 1024
	}
} satisfies RuleSet<Message, 'content'>;
