import { z } from 'zod';
import { getZString } from '$shared/helpers/zod';
import userRules from '$shared/modules/users/user.rules';

export const addFriendSchema = z.object({
	handle: getZString('handle', userRules.field.handle)
});

export type AddFriendSchema = typeof addFriendSchema;
export type AddFriendInput = z.infer<AddFriendSchema>;
