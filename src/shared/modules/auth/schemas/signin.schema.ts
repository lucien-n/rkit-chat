import { z } from 'zod';

export const signinSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8).max(255)
});

export type SigninSchema = typeof signinSchema;

export type SigninInput = z.infer<SigninSchema>;
