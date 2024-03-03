import { Argon2id } from 'oslo/password';
import { AuthUser } from './auth_user.entity';
import { parseZSchema } from '$shared/helpers/zod';
import { AuthError } from '$shared/helpers/errors';
import { UsersController } from '../users/users.controller';
import { signupSchema, type SignupInput } from './schemas/signup.schema';
import { signinSchema, type SigninInput } from './schemas/signin.schema';
import { BackendMethod, Controller, remult, type MembersToInclude } from 'remult';

@Controller('AuthController')
export class AuthController {
	@BackendMethod({ apiPrefix: 'auth', allowed: false })
	static async findByEmail(email: string) {
		for await (const user of remult.repo(AuthUser).query()) {
			if (user.email?.toLowerCase() === email.toLowerCase()) return user;
		}

		return null;
	}

	@BackendMethod({ apiPrefix: 'auth', allowed: false })
	static async findById(
		id: string,
		include: MembersToInclude<AuthUser> = {}
	): Promise<AuthUser | undefined> {
		const user = remult.repo(AuthUser).findOne({ where: { id }, include });
		return remult.repo(AuthUser).toJson(user);
	}

	@BackendMethod({ apiPrefix: 'auth', allowed: false })
	static async signup(inputs: SignupInput) {
		const { username, email, password } = parseZSchema(inputs, signupSchema);

		const existingUser = await this.findByEmail(email);
		if (existingUser) throw AuthError.EmailAlreadyUsed;

		const hashedPassword = await new Argon2id().hash(password);

		const authUser = await remult.repo(AuthUser).insert({ email, hashedPassword });

		await UsersController.create(authUser, username);

		return authUser;
	}

	@BackendMethod({ apiPrefix: 'auth', allowed: false })
	static async signin(inputs: SigninInput) {
		const { email, password } = parseZSchema(inputs, signinSchema);

		const user = await this.findByEmail(email);
		if (!user) throw AuthError.UserNotFound;

		const validPassword =
			user.hashedPassword && (await new Argon2id().verify(user.hashedPassword, password));
		if (!validPassword) {
			throw AuthError.InvalidCredentials;
		}

		return user;
	}
}
