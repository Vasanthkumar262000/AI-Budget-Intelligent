import { Request, Response, NextFunction } from 'express';
import { getAuth } from '@clerk/express';
import { getOrCreateUser } from '../services/user.service';
import { ApiError } from '../utils/ApiError';

export function syncUser(req: Request, _res: Response, next: NextFunction) {
  const auth = getAuth(req);
  if (!auth?.userId) {
    return next(new ApiError(401, 'Unauthorized'));
  }
  getOrCreateUser(auth.userId)
    .then((user) => {
      req.userId = user.id;
      next();
    })
    .catch(next);
}
