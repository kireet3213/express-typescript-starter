import pino, { LoggerOptions } from 'pino';

const loggerOptions: LoggerOptions = {
    level: process.env.LOG_LEVEL || 'info',
    timestamp: pino.stdTimeFunctions.isoTime,
    formatters: {
        level: (label) => ({ level: label }),
    },
    redact: {
        paths: [
            'req.headers.authorization',
            'req.headers.cookie',
            'req.body.password',
            'req.body.token',
            'req.body.secret',
            'headers.authorization',
            'headers.cookie',
            'password',
            'token',
            'secret',
        ],
        censor: '[Redacted]',
    },
};

const transport =
    process.env.LOG_PRETTY === 'true'
        ? pino.transport({
              target: 'pino-pretty',
              options: {
                  colorize: true,
                  singleLine: true,
                  translateTime: 'SYS:standard',
                  ignore: 'pid,hostname',
              },
          })
        : undefined;

export const logger = transport ? pino(loggerOptions, transport) : pino(loggerOptions);
