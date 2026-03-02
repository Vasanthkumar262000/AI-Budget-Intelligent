import { Request, Response } from 'express';
import { reportsService } from '../services/reports.service';
import { success } from '../utils/responseFormatter';
import { asyncHandler } from '../utils/asyncHandler';

export const reportsController = {
  getMonthly: asyncHandler(async (req: Request, res: Response) => {
    const { month, year } = req.query;
    const data = await reportsService.getMonthly(req.userId!, {
      month: month ? parseInt(month as string, 10) : new Date().getMonth(),
      year: year ? parseInt(year as string, 10) : new Date().getFullYear(),
    });
    return success(res, data);
  }),
  getYearly: asyncHandler(async (req: Request, res: Response) => {
    const { year } = req.query;
    const data = await reportsService.getYearly(
      req.userId!,
      year ? parseInt(year as string, 10) : new Date().getFullYear()
    );
    return success(res, data);
  }),
};
