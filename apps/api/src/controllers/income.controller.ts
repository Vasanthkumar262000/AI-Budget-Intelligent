import { Request, Response } from 'express';
import { incomeService } from '../services/income.service';
import { success } from '../utils/responseFormatter';
import { asyncHandler } from '../utils/asyncHandler';

export const incomeController = {
  getAll: asyncHandler(async (req: Request, res: Response) => {
    const data = await incomeService.getAll(req.userId!);
    return success(res, data);
  }),
  getByMonth: asyncHandler(async (req: Request, res: Response) => {
    const year = parseInt(req.params.year, 10);
    const month = parseInt(req.params.month, 10);
    const data = await incomeService.getByMonth(req.userId!, year, month);
    return success(res, data);
  }),
  upsert: asyncHandler(async (req: Request, res: Response) => {
    const data = await incomeService.upsert(req.userId!, req.body);
    return success(res, data, 201);
  }),
  delete: asyncHandler(async (req: Request, res: Response) => {
    await incomeService.delete(req.userId!, req.params.id);
    return success(res, { deleted: true });
  }),
};
