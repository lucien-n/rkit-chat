import type { UserInfo } from 'remult';
import { writable } from 'svelte/store';

export const userStore = writable<UserInfo | null>(null);
