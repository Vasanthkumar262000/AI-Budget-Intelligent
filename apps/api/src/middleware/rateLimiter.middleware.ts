import rateLimit from 'express-rate-limit';

export const aiRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: { success: false, error: 'Too many AI analysis requests. Try again in an hour.' },
  standardHeaders: true,
  keyGenerator: (req) => (req as { userId?: string }).userId ?? req.ip ?? 'anonymous',
});
