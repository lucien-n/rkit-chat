import type { ErrorStatus } from 'sveltekit-superforms';

export type FieldRule = {
	min: number;
	max: number;
};

export type FieldRuleSet<T extends object, K extends keyof T> = Record<K, FieldRule>;
export type Rule<T extends object, K extends keyof T> = {
	field: FieldRuleSet<T, K>;
} & Record<string, unknown>;

export type RemultError = { message: string; url?: string; status?: ErrorStatus };
