import { Request, Response } from 'express';
import { subscriptionsService } from '../services/subscriptions.service';
import { success } from '../utils/responseFormatter';
import { asyncHandler } from '../utils/asyncHandler';

export const subscriptionsController = {
  getAll: asyncHandler(async (req: Request, res: Response) => {
    const data = await subscriptionsService.getAll(req.userId!);
    return success(res, data);
  }),
  create: asyncHandler(async (req: Request, res: Response) => {
    const data = await subscriptionsService.create(req.userId!, req.body);
    return success(res, data, 201);
  }),
  update: asyncHandler(async (req: Request, res: Response) => {
    const data = await subscriptionsService.update(req.userId!, req.params.id, req.body);
    return success(res, data);
  }),
  toggle: asyncHandler(async (req: Request, res: Response) => {
    const data = await subscriptionsService.toggle(req.userId!, req.params.id);
    return success(res, data);
  }),
  delete: asyncHandler(async (req: Request, res: Response) => {
    await subscriptionsService.delete(req.userId!, req.params.id);
    return success(res, { deleted: true });
  }),
};
