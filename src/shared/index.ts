import { User } from './modules/users/user.entity';
import { Group } from './modules/groups/group.entity';
import { AuthUser } from './modules/auth/auth_user.entity';
import { Message } from './modules/messages/message.entity';
import { AuthController } from './modules/auth/auth.controller';
import { AuthSession } from './modules/auth/auth_session.entity';
import { UsersController } from './modules/users/users.controller';
import { GroupsController } from './modules/groups/groups.controller';
import { MessagesController } from './modules/messages/messages.controller';
import { UserSettings } from './modules/user-settings/user-settings.entity';
import { GroupsToUsers } from './modules/groups-to-users/groups-to-users.entity';

export const entities = [AuthUser, AuthSession, Message, User, Group, GroupsToUsers, UserSettings];
export const controllers = [AuthController, MessagesController, UsersController, GroupsController];
