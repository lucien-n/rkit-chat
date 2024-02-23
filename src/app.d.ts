declare global {
	namespace App {
		interface Locals {
			session: import('lucia').Session | null;
			user: import('lucia').User | null;
		}
	}
}

export {};

declare module 'remult' {
	export interface UserInfo {
		email: string;
	}
}
