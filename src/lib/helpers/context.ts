import { getContext, setContext } from 'svelte';
import { writable, type Writable } from 'svelte/store';

export const createContext = <T>(
	key: string,
	initialValue: T | undefined = undefined
): [() => Writable<T>, (value: T) => Writable<T>] => {
	const store: Writable<T> = writable<T>(initialValue) as Writable<T>;

	const set = (value: T) => {
		store.set(value);
		setContext(key, store);

		return store;
	};

	const get = () => {
		return getContext<Writable<T>>(key);
	};

	return [get, set];
};
