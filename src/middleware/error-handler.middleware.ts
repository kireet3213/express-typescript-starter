//global error handler middleware

import * as express from 'express';
import { ValidationError } from 'sequelize';
import { AuthorizationError } from '../helper/error-helpers';
import { logger } from '../logger';

type RequestWithLogger = express.Request & {
    log?: {
        error: (payload: object, message: string) => void;
        warn: (payload: object, message: string) => void;
    };
};

export function globalErrorHandler(
    err: unknown,
    req: express.Request,
    res: express.Response,
    _next: express.NextFunction
): void {
    const requestLogger = (req as RequestWithLogger).log;

    if (Array.isArray(err)) {
        const errorObj = err.map((e) => {
            return e.constraints;
        });
        requestLogger?.warn(
            {
                path: req.originalUrl,
                method: req.method,
                validationErrors: errorObj,
            },
            'Request validation failed'
        );
        res.status(401).send(errorObj);
    } else if (err instanceof AuthorizationError) {
        requestLogger?.warn(
            {
                path: req.originalUrl,
                method: req.method,
                error: err.message,
            },
            'Authorization failed'
        );
        res.status(401).json(err);
    } else if (err instanceof ValidationError) {
        const error = JSON.parse(JSON.stringify(err.errors[0]));
        delete error.instance;
        requestLogger?.warn(
            {
                path: req.originalUrl,
                method: req.method,
                error,
            },
            'Database validation failed'
        );
        res.status(422).json(error);
    } else {
        (requestLogger || logger).error(
            {
                err,
                path: req.originalUrl,
                method: req.method,
            },
            'Unhandled request error'
        );
        res.status(500).send(err);
    }
}
