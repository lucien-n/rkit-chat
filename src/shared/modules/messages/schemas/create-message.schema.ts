import { z } from 'zod';
import messageRules from '../message.rules';

export const createMessageSchema = z.object({
	content: z.string().min(messageRules.content.min).max(messageRules.content.max)
});

export type CreateMessageSchema = typeof createMessageSchema;

export type CreateMessageInput = z.infer<CreateMessageSchema>;
