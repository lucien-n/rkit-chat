import type { ZodType, z } from 'zod';

export const parseZSchema = <Schema extends ZodType>(inputs: z.infer<Schema>, schema: Schema) => {
	const result = schema.safeParse(inputs);
	if (!result.success) {
		throw result.error.issues[0].message;
	}

	return result.data as z.infer<Schema>;
};
