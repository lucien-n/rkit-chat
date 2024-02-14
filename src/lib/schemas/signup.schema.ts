import { z } from 'zod';

export const signupSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8).max(255)
});

export type SignupSchema = typeof signupSchema;
