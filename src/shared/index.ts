import { AuthController } from './modules/auth/auth.controller';
import { AuthSession } from './modules/auth/auth_session.entity';
import { AuthUser } from './modules/auth/auth_user.entity';
import { GroupsToProfiles } from './modules/groups-to-profile/groups-to-profile.entity';
import { Group } from './modules/groups/group.entity';
import { Message } from './modules/messages/message.entity';
import { MessagesController } from './modules/messages/messages.controller';
import { Profile } from './modules/profiles/profile.entity';
import { ProfilesController } from './modules/profiles/profiles.controller';

export const entities = [AuthUser, AuthSession, Message, Profile, Group, GroupsToProfiles];
export const controllers = [AuthController, MessagesController, ProfilesController];
