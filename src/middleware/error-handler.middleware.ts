//global error handler middleware

import * as express from 'express';

export function globalErrorHandler(
    err: unknown,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    req: express.Request,
    res: express.Response
): void {
    if (Array.isArray(err)) {
        const errorObj = err.map((e) => {
            return e.constraints;
        });
        res.status(401).send(errorObj);
    } else {
        res.status(500).send('something went wrong');
    }
}
