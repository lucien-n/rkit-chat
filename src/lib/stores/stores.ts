import type { UserInfo } from 'remult';
import { writable } from 'svelte/store';
import { Group } from '$shared/modules/groups/group.entity';
import { Profile } from '$shared/modules/profiles/profile.entity';

export const userStore = writable<UserInfo | null>(null);
export const profileStore = writable<Profile | null>(null);
export const groupsStore = writable<Group[]>([]);
