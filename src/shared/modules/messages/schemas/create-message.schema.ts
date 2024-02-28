import { z } from 'zod';
import messageRules from '../message.rules';
import { getZString } from '$shared/helpers/zod';

export const createMessageSchema = z.object({
	content: getZString('content', messageRules.field.content)
});

export type CreateMessageSchema = typeof createMessageSchema;

export type CreateMessageInput = z.infer<CreateMessageSchema>;
