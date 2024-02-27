import type { RemultError } from '$shared/helpers/types';

/**
 * Try Controller
 *
 * @param {() => Promise<void>} action
 * @param {VoidFunction} [onSuccess] toast by default, action result as param
 * @param {(error: RemultError) => void} [onError] toast by default, error messaged as param
 */
export const contry = async <T>(
	action: () => Promise<void>,
	onSuccess: (result: T) => void = () => ({}),
	onError: (error: RemultError) => void = () => ({})
) => {
	try {
		const result = await action();
		onSuccess(result as T);
	} catch (e) {
		const error = e as RemultError;
		onError(error);
	}
};
