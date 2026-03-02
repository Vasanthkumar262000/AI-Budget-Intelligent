import { Request, Response } from 'express';
import { investmentsService } from '../services/investments.service';
import { success } from '../utils/responseFormatter';
import { asyncHandler } from '../utils/asyncHandler';

export const investmentsController = {
  getAll: asyncHandler(async (req: Request, res: Response) => {
    const data = await investmentsService.getAll(req.userId!);
    return success(res, data);
  }),
  getSummary: asyncHandler(async (req: Request, res: Response) => {
    const data = await investmentsService.getSummary(req.userId!);
    return success(res, data);
  }),
  getOne: asyncHandler(async (req: Request, res: Response) => {
    const data = await investmentsService.getOne(req.userId!, req.params.id);
    return success(res, data);
  }),
  create: asyncHandler(async (req: Request, res: Response) => {
    const data = await investmentsService.create(req.userId!, req.body);
    return success(res, data, 201);
  }),
  update: asyncHandler(async (req: Request, res: Response) => {
    const data = await investmentsService.update(req.userId!, req.params.id, req.body);
    return success(res, data);
  }),
  delete: asyncHandler(async (req: Request, res: Response) => {
    await investmentsService.delete(req.userId!, req.params.id);
    return success(res, { deleted: true });
  }),
};
