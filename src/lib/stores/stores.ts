import { writable } from 'svelte/store';
import { User } from '$shared/modules/users/user.entity';
import { Group } from '$shared/modules/groups/group.entity';

export const userStore = writable<User | null>(null);
export const groupsStore = writable<Group[]>([]);
