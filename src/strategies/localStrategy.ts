import { Strategy } from 'passport-local';
import { User } from '../database/models/user.model';
import { comparePassword } from '../helper/bcrypt-helpers';
import { LoginUserDto } from '../controllers/auth/validation-dtos/login-user.dto';
import { validateOrRejectSchema } from '../helper/validate-schema';
import { logger } from '../logger';

const authLogger = logger.child({ component: 'local-auth' });

export const localStrategy = new Strategy(
    { usernameField: 'email' },
    async (email: string, password: string, cb) => {
        try {
            const input = new LoginUserDto();
            input.email = email;
            input.password = password;
            await validateOrRejectSchema(input);

            const user = await User.findOne({
                where: {
                    email,
                },
                rejectOnEmpty: true,
            });

            const isValidPassword = await comparePassword(
                password,
                user.password
            );

            if (!user || !isValidPassword) {
                authLogger.warn('Login rejected because credentials are invalid');
                return cb(null, false, {
                    message: 'Incorrect email or password.',
                });
            }

            authLogger.info({ userId: user.id }, 'Login accepted');
            return cb(null, user);
        } catch (error) {
            authLogger.error({ err: error }, 'Login failed unexpectedly');
            return cb(error);
        }
    }
);
