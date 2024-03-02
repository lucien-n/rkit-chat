import { Entity, Fields } from 'remult';

@Entity('friend_requests')
export class FriendRequest {
	@Fields.cuid()
	id = '';

	@Fields.string()
	fromUserId = '';

	@Fields.string()
	toUserId = '';

	@Fields.boolean()
	accepted = false;
}
