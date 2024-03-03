import { z } from 'zod';
import messageRules from '../message.rules';
import { getZString } from '$shared/helpers/zod';

export const sendMessageSchema = z.object({
	content: getZString('content', messageRules.field.content)
});

export type SendMessageSchema = typeof sendMessageSchema;

export type SendMessageInput = z.infer<SendMessageSchema>;
