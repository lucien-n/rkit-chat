import { toast } from 'svelte-sonner';
import type { RemultError } from '$shared/helpers/types';

/**
 * Try Controller
 *
 * @param {() => Promise<void>} action
 * @param {VoidFunction} [onSuccess=() => {
 * 		toast.success('Success!');
 * 	}]
 * @param {(error: RemultError) => void} [onError=(error) => {
 * 		toast.error(error.message);
 * 	}]
 */
export const contry = async <T>(
	action: () => Promise<void>,
	onSuccess: (result: T) => void = () => {
		toast.success('Success!');
	},
	onError: (error: RemultError) => void = (error) => {
		toast.error(error.message);
	}
) => {
	try {
		const result = await action();
		onSuccess(result as T);
	} catch (e) {
		const error = e as RemultError;
		onError(error);
	}
};
