import type { FieldRule } from './types';
import type { StringFieldOptions } from 'remult';
import type { StringFieldOptions } from 'remult';

export const getStringOptions = (rule: FieldRule): StringFieldOptions => ({
	minLength: rule.min,
	maxLength: rule.max
});

export const validateString = (str: string, rule: FieldRule) =>
	str.length >= rule.min && str.length <= rule.max;

export const toHandle = (username: string) => username.replace(/[^a-zA-Z0-9]/g, '');

export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
