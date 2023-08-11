//global error handler middleware

import * as express from 'express';

export function globalErrorHandler(err: any, req: express.Request, res: express.Response, next: express.NextFunction): void {
    if (Array.isArray(err)) {
        const errorObj = err.map((e) => {
            return e.constraints
        })
        res.status(401).send(errorObj)

    }
    else {

        res.status(500).send("something went wrong")
    }
}