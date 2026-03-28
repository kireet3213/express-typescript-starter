import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { secret } from '../controllers/auth/auth';
import { User } from '../database/models/user.model';
import { AuthorizationError } from '../helper/error-helpers';
import { catchAsync } from '../helper/async-promise-handler';
import { logger } from '../logger';

const authLogger = logger.child({ component: 'token-verification' });

export const verifyToken = catchAsync(async function verifyToken(
    req: express.Request,
    _res: express.Response,
    next: express.NextFunction
): Promise<void> {
    const user = await validateBearerToken(req.header('Authorization'));
    authLogger.info({ userId: user.id }, 'Bearer token verified');
    next();
});

async function validateBearerToken(authHeader: string | undefined) {
    if (!authHeader || !authHeader.includes('Bearer ')) {
        authLogger.warn('Bearer token missing or malformed');
        throw new AuthorizationError('Invalid Bearer Token');
    }

    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token, secret) as jwt.JwtPayload;
        const user = await User.findOne({
            where: {
                id: payload.userId,
            },
            rejectOnEmpty: true,
        });
        return user;
    } catch (error) {
        authLogger.warn({ err: error }, 'Bearer token verification failed');
        throw new AuthorizationError(JSON.stringify(error));
    }
}
