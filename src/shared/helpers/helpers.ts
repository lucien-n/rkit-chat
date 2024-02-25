import type { Rule } from './types';
import type { StringFieldOptions } from 'remult';

export const getStringOptions = (rule: Rule | undefined): StringFieldOptions =>
	rule
		? {
				minLength: rule.min,
				maxLength: rule.max
			}
		: {};
