import { z } from 'zod';
import authRules from '../auth.rules';
import { getZString } from '$shared/helpers/zod';

export const signinSchema = z.object({
	email: z.string().email(),
	password: getZString('password', authRules.field.password)
});

export type SigninSchema = typeof signinSchema;

export type SigninInput = z.infer<SigninSchema>;
