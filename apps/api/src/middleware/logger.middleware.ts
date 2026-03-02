import winston from 'winston';

export const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [new winston.transports.Console()],
});

export function requestLogger(req: { method: string; path: string; userId?: string }) {
  logger.info('Request', {
    method: req.method,
    path: req.path,
    userId: req.userId,
  });
}
