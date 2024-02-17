import { AuthController } from './modules/auth/auth.controller';
import { AuthSession } from './modules/auth/auth_session.entity';
import { AuthUser } from './modules/auth/auth_user.entity';

export const entities = [AuthUser, AuthSession];
export const controllers = [AuthController];
