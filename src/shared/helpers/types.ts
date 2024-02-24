export type Rule = {
	min: number;
	max: number;
};

export type RuleSet = Record<string, Rule>;

export type RemultError = { message: string; url: string; status: number };
