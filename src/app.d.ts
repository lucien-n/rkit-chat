declare global {
	namespace App {
		interface Locals {
			authSession: import('lucia').Session | null;
			authUser: import('lucia').User | null;
		}
	}
}

export {};

declare module 'remult' {
	export interface UserInfo {
		email: string;
	}
}
