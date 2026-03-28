import { randomUUID } from 'crypto';
import pino from 'pino';
import pinoHttp from 'pino-http';
import { logger } from '../logger';

function resolveRequestId(requestIdHeader: string | string[] | undefined) {
    if (Array.isArray(requestIdHeader)) {
        return requestIdHeader[0] || randomUUID();
    }

    return requestIdHeader || randomUUID();
}

export const httpLogger = pinoHttp({
    logger,
    quietReqLogger: true,
    genReqId: (req, res) => {
        const requestId = resolveRequestId(req.headers['x-request-id']);
        res.setHeader('x-request-id', requestId);
        return requestId;
    },
    customLogLevel: (_req, res, err) => {
        if (err || res.statusCode >= 500) {
            return 'error';
        }

        if (res.statusCode >= 400) {
            return 'warn';
        }

        return 'info';
    },
    customReceivedMessage: () => 'request received',
    customSuccessMessage: () => 'request completed',
    customErrorMessage: () => 'request failed',
    serializers: {
        err: pino.stdSerializers.err,
        req: (req) => ({
            id: req.id,
            method: req.method,
            url: req.url,
            remoteAddress: req.remoteAddress,
            remotePort: req.remotePort,
        }),
        res: (res) => ({
            statusCode: res.statusCode,
        }),
    },
});
