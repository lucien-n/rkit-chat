import { fail, type ActionFailure, type RequestEvent } from '@sveltejs/kit';
import type { SuperValidated } from 'sveltekit-superforms';
import { superValidate } from 'sveltekit-superforms/server';
import type { AnyZodObject, ZodObject, ZodRawShape } from 'zod';

type SuperActionFailure<SchemaObject extends AnyZodObject> =
	| ActionFailure<{
			form: SuperValidated<SchemaObject>;
	  }>
	| {
			form: SuperValidated<SchemaObject>;
	  };

export const superFormAction = async <
	Schema extends ZodRawShape,
	SchemaObject extends ZodObject<Schema>
>(
	event: RequestEvent,
	schema: SchemaObject,
	callback: (
		form: SuperValidated<SchemaObject>
	) => Promise<void | unknown | SuperActionFailure<SchemaObject>>
) => {
	const form = await superValidate(event, schema);
	if (!form.valid) {
		return fail(400, {
			form
		});
	}

	// message() needs to be thrown
	try {
		const data = await callback(form);
		if (data) return { ...data, form };
	} catch (e) {
		return e;
	}

	return {
		form
	};
};
