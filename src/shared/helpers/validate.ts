import type { Rule } from './types';

export const validateStringField = (value: string, rule: Rule) => {
	const { min, max } = rule;

	return value.length >= min && value.length <= max;
};
