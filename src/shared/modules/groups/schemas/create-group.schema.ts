import { z } from 'zod';
import groupRules from '../group.rules';
import { getZString } from '$shared/helpers/zod';

export const createGroupSchema = z.object({
	name: getZString('name', groupRules.field.name)
});

export type CreateGroupSchema = typeof createGroupSchema;

export type CreateGroupInput = z.infer<CreateGroupSchema>;
