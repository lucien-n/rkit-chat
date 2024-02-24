import { Entity, Fields } from 'remult';
import { Theme } from './enums/theme.enum';

@Entity<UserSettings>('user_settings', { id: { id: true } })
export class UserSettings {
	@Fields.string()
	id!: string;

	@Fields.object()
	theme: Theme = Theme.System;
}
