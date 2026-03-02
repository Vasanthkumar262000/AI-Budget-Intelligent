import { Request, Response } from 'express';
import { expensesService } from '../services/expenses.service';
import { success } from '../utils/responseFormatter';
import { asyncHandler } from '../utils/asyncHandler';

export const expensesController = {
  getAll: asyncHandler(async (req: Request, res: Response) => {
    const { month, year } = req.query;
    const data = await expensesService.getAll(req.userId!, {
      month: month ? parseInt(month as string, 10) : undefined,
      year: year ? parseInt(year as string, 10) : undefined,
    });
    return success(res, data);
  }),
  getSummary: asyncHandler(async (req: Request, res: Response) => {
    const { month, year } = req.query;
    const data = await expensesService.getSummary(req.userId!, {
      month: month ? parseInt(month as string, 10) : undefined,
      year: year ? parseInt(year as string, 10) : undefined,
    });
    return success(res, data);
  }),
  getOne: asyncHandler(async (req: Request, res: Response) => {
    const data = await expensesService.getOne(req.userId!, req.params.id);
    return success(res, data);
  }),
  create: asyncHandler(async (req: Request, res: Response) => {
    const data = await expensesService.create(req.userId!, req.body);
    return success(res, data, 201);
  }),
  update: asyncHandler(async (req: Request, res: Response) => {
    const data = await expensesService.update(req.userId!, req.params.id, req.body);
    return success(res, data);
  }),
  delete: asyncHandler(async (req: Request, res: Response) => {
    await expensesService.delete(req.userId!, req.params.id);
    return success(res, { deleted: true });
  }),
};
