export type Rule = {
	min: number;
	max: number;
};

export type RuleSet = Record<string, Rule>;
