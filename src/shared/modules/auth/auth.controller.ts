import { BackendMethod, Controller, remult } from 'remult';
import { signupSchema, type SignupInput } from './schemas/signup.schema';
import { parseZSchema } from '$shared/helpers/zod';
import { AuthError } from '$shared/helpers/errors';
import { Argon2id } from 'oslo/password';
import { signinSchema, type SigninInput } from './schemas/signin.schema';
import { AuthUser } from './auth_user.entity';

@Controller('AuthController')
export class AuthController {
	@BackendMethod({ allowed: false })
	static async findByEmail(email: string) {
		for await (const user of remult.repo(AuthUser).query()) {
			if (user.email?.toLowerCase() === email.toLowerCase()) return user;
		}

		return null;
	}

	@BackendMethod({ allowed: false })
	static async signup(inputs: SignupInput) {
		const { username, email, password } = parseZSchema(inputs, signupSchema);

		const existingUser = await this.findByEmail(email);
		if (existingUser) throw AuthError.EmailAlreadyUsed;

		const hashedPassword = await new Argon2id().hash(password);

		return remult.repo(AuthUser).insert({ username, email, hashedPassword });
	}

	@BackendMethod({ allowed: false })
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
