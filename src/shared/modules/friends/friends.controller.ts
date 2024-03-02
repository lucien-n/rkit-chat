import { Friend } from './friend.entity';
import { BackendMethod, Controller, remult } from 'remult';

@Controller('FriendsController')
export class FriendsController {
	@BackendMethod({ apiPrefix: 'friends', allowed: false })
	static async add(userIdA: string, userIdB: string) {
		const friend = remult.repo(Friend).insert({ userIdA, userIdB });
		return remult.repo(Friend).toJson(friend);
	}

	@BackendMethod({ apiPrefix: 'friends', allowed: false })
	static async remove(userIdA: string, userIdB: string) {
		await remult.repo(Friend).delete({ userIdA, userIdB });
		await remult.repo(Friend).delete({ userIdB, userIdA });
	}
}
