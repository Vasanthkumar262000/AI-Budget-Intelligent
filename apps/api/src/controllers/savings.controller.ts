import { Request, Response } from 'express';
import { savingsService } from '../services/savings.service';
import { success } from '../utils/responseFormatter';
import { asyncHandler } from '../utils/asyncHandler';

export const savingsController = {
  getAll: asyncHandler(async (req: Request, res: Response) => {
    const data = await savingsService.getAll(req.userId!);
    return success(res, data);
  }),
  getOne: asyncHandler(async (req: Request, res: Response) => {
    const data = await savingsService.getOne(req.userId!, req.params.id);
    return success(res, data);
  }),
  create: asyncHandler(async (req: Request, res: Response) => {
    const data = await savingsService.create(req.userId!, req.body);
    return success(res, data, 201);
  }),
  update: asyncHandler(async (req: Request, res: Response) => {
    const data = await savingsService.update(req.userId!, req.params.id, req.body);
    return success(res, data);
  }),
  delete: asyncHandler(async (req: Request, res: Response) => {
    await savingsService.delete(req.userId!, req.params.id);
    return success(res, { deleted: true });
  }),
};
