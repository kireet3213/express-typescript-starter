import { Response, Request } from 'express';
import { catchAsync } from '../../helper/async-promise-handler';
import * as jwt from 'jsonwebtoken';
import { User } from '../../database/models/user.model';
import { logger } from '../../logger';

export const secret = process.env.JWT_SECRET || 'WeWillRockYou';

type RequestWithLogger = Request & {
    log?: {
        info: (payload: object, message: string) => void;
    };
};

export const authenticateUser = catchAsync(
    async (req: Request, res: Response) => {
        const user = req.user as User;
        const token = jwt.sign({ userId: user.id }, secret, {
            algorithm: 'HS256',
            expiresIn: '2d',
        });
        ((req as RequestWithLogger).log || logger).info(
            { userId: user.id },
            'Issued authentication token'
        );
        return res.status(200).json({ success: true, secret: token });
    }
);
