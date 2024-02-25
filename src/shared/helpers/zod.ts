import type { Rule } from './types';
import { z, type ZodType } from 'zod';
import { capitalize } from './helpers';

export const parseZSchema = <Schema extends ZodType>(inputs: z.infer<Schema>, schema: Schema) => {
	const result = schema.safeParse(inputs);
	if (!result.success) {
		throw result.error.issues[0].message;
	}

	return result.data as z.infer<Schema>;
};

export const getZString = (
	name: string,
	{ min, max }: Rule,
	defaultValue: string | undefined = undefined
): z.ZodString => {
	const capitalizedName = capitalize(name);
	const zString = z
		.string({
			invalid_type_error: `${capitalizedName} needs to be a string`,
			required_error: `${capitalizedName} is required`
		})
		.min(min, `${capitalizedName} needs to be at least ${min} characters`)
		.max(max, `${capitalizedName} needs to be at most ${max} characters`);

	if (defaultValue) zString.default(defaultValue);

	return zString;
};
