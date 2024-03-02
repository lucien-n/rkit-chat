import { Entity, Fields } from 'remult';

@Entity('friends')
export class Friend {
	@Fields.cuid()
	id = '';

	@Fields.string()
	userIdA = '';

	@Fields.string()
	userIdB = '';
}
