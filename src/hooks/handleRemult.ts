import { remult } from 'remult';
import type { Handle } from '@sveltejs/kit';
import { _api } from '../routes/api/[...remult]/+server';
import { ProfilesController } from '$shared/modules/profiles/profiles.controller';

export const handleRemult: Handle = async ({ event, resolve }) => {
	_api.withRemult(event, async () => {
		event.locals.profile = remult?.user
			? (await ProfilesController.findById(remult.user.id)) ?? null
			: null;
	});

	return resolve(event);
};
