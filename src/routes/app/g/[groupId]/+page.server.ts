import { remult } from 'remult';
import { urls } from '$lib/urls';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/server';
import { GroupsController } from '$shared/modules/groups/groups.controller';
import { sendMessageSchema } from '$shared/modules/messages/schemas/send-message.schema';

export const load: PageServerLoad = async (event) => {
	const { groupId } = event.params;
	const group = (await GroupsController.findById(groupId)) ?? null;

	if (!group || !remult.user?.groups.includes(group?.id)) redirect(307, urls.home.root);

	return {
		group,
		messageForm: await superValidate(zod(sendMessageSchema))
	};
};
