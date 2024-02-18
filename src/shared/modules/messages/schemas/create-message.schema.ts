import { z } from 'zod';

export const createMessageSchema = z.object({
	content: z.string().min(3).max(1000)
});

export type CreateMessageSchema = typeof createMessageSchema;

export type CreateMessageInput = z.infer<CreateMessageSchema>;
