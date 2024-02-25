import { z } from 'zod';
import userRules from '$shared/modules/users/user.rules';

export const signupSchema = z.object({
	username: z.string().min(userRules.username.min).max(userRules.username.max),
	email: z.string().email(),
	password: z.string().min(8).max(255)
});

export type SignupSchema = typeof signupSchema;

export type SignupInput = z.infer<SignupSchema>;
