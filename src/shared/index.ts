import { AuthController } from './modules/auth/auth.controller';
import { AuthSession } from './modules/auth/auth_session.entity';
import { AuthUser } from './modules/auth/auth_user.entity';
import { Message } from './modules/messages/message.entity';
import { MessagesController } from './modules/messages/messages.controller';

export const entities = [AuthUser, AuthSession, Message];
export const controllers = [AuthController, MessagesController];
