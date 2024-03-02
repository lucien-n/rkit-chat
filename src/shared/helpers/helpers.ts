import type { FieldRule } from './types';
import type { StringFieldOptions } from 'remult';
import userRules from '$shared/modules/users/user.rules';

export const getStringOptions = (rule: FieldRule): StringFieldOptions => ({
	minLength: rule.min,
	maxLength: rule.max
});

export const validateStringLength = (str: string, rule: FieldRule) =>
	str.length >= rule.min && str.length <= rule.max;

export const toHandle = (username: string): string => {
	const handle = username.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');

	if (!validateStringLength(handle, userRules.field.handle)) throw 'Invalid username';

	return handle;
};

export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
