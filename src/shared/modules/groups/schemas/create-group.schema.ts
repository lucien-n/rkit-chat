import { z } from 'zod';

export const createGroupSchema = z.object({
	name: z.string().min(1).max(32)
});

export type CreateGroupSchema = typeof createGroupSchema;

export type CreateGroupInput = z.infer<CreateGroupSchema>;
