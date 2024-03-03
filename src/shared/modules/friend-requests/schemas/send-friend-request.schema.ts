import { z } from 'zod';
import { getZString } from '$shared/helpers/zod';
import userRules from '$shared/modules/users/user.rules';

export const sendFriendSchema = z.object({
	handle: getZString('handle', userRules.field.handle)
});

export type SendFriendRequestSchema = typeof sendFriendSchema;
export type SendFriendRequestInput = z.infer<SendFriendRequestSchema>;
