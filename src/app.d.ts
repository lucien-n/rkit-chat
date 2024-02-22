declare global {
	namespace App {
		interface Locals {
			session: import('lucia').Session | null;
			user: import('lucia').User | null;
			profile: import('$shared/modules/profiles/profile.entity').Profile | null;
		}
	}
}

export {};

declare module 'remult' {
	export interface UserInfo {
		email: string;
	}
}
