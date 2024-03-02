import { Entity, Fields } from 'remult';

@Entity<FriendRequest>('friend_requests', { id: { fromUserId: true, toUserId: true } })
export class FriendRequest {
	@Fields.string()
	fromUserId = '';

	@Fields.string()
	toUserId = '';
}
