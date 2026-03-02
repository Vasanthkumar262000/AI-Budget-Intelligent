import { Request, Response } from 'express';
import { aiService } from '../services/ai.service';
import { success } from '../utils/responseFormatter';
import { asyncHandler } from '../utils/asyncHandler';

export const aiController = {
  analyze: asyncHandler(async (req: Request, res: Response) => {
    const { month, year } = req.body;
    const data = await aiService.analyze(req.userId!, month, year);
    return success(res, data, 201);
  }),
  getHistory: asyncHandler(async (req: Request, res: Response) => {
    const data = await aiService.getHistory(req.userId!);
    return success(res, data);
  }),
};
