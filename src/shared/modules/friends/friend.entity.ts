import { Entity, Fields } from 'remult';

@Entity<Friend>('friends', { id: { userIdA: true, userIdB: true } })
export class Friend {
	@Fields.string()
	userIdA = '';

	@Fields.string()
	userIdB = '';
}
