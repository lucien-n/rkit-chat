import { z } from 'zod';
import authRules from '../auth.rules';
import { getZString } from '$shared/helpers/zod';
import userRules from '$shared/modules/users/user.rules';

export const signupSchema = z.object({
	username: getZString('username', userRules.username),
	email: z.string().email(),
	password: getZString('password', authRules.password)
});

export type SignupSchema = typeof signupSchema;

export type SignupInput = z.infer<SignupSchema>;
