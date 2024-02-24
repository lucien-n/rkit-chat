import type { UserInfo } from 'remult';
import { writable } from 'svelte/store';
import { User } from '$shared/modules/users/user.entity';
import { User } from '$shared/modules/users/user.entity';
import { Group } from '$shared/modules/groups/group.entity';

export const userStore = writable<UserInfo | null>(null);
export const profileStore = writable<User | null>(null);
export const groupsStore = writable<Group[]>([]);
