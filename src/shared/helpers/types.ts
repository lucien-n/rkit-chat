export type Rule = {
	min: number;
	max: number;
};

export type RuleSet<T extends object, K extends keyof T> = Record<K, Rule>;

export type RemultError = { message: string; url: string; status: number };
