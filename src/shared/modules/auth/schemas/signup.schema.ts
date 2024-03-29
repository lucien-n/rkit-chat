import { z } from 'zod';

export const signupSchema = z.object({
	username: z.string().min(3).max(255),
	email: z.string().email(),
	password: z.string().min(8).max(255)
});

export type SignupSchema = typeof signupSchema;

export type SignupInput = z.infer<SignupSchema>;
