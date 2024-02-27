import type { ComponentType } from 'svelte';

export type MenuItem =
	| {
			type?: 'item';
			label: string;
			onClick?: VoidFunction;
			icon?: ComponentType;
	  }
	| { type: 'separator' };
