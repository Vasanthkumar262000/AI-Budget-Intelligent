import { Decimal } from '@prisma/client/runtime/library';
import { prisma } from '../lib/prisma';
import { ApiError } from '../utils/ApiError';
import { savingsGoalCreateSchema, savingsGoalUpdateSchema } from '@budget-intelligence/shared';

function decimalToNumber(d: Decimal | null | undefined): number {
  return d ? Number(d) : 0;
}

export const savingsService = {
  async getAll(userId: string) {
    const items = await prisma.savingsGoal.findMany({
      where: { userId },
    });
    return items.map((i) => ({
      ...i,
      targetAmount: decimalToNumber(i.targetAmount),
      savedAmount: decimalToNumber(i.savedAmount),
    }));
  },
  async getOne(userId: string, id: string) {
    const item = await prisma.savingsGoal.findFirst({
      where: { id, userId },
    });
    if (!item) throw new ApiError(404, 'Savings goal not found');
    return {
      ...item,
      targetAmount: decimalToNumber(item.targetAmount),
      savedAmount: decimalToNumber(item.savedAmount),
    };
  },
  async create(userId: string, data: unknown) {
    const parsed = savingsGoalCreateSchema.parse(data);
    const item = await prisma.savingsGoal.create({
      data: {
        userId,
        name: parsed.name,
        targetAmount: parsed.targetAmount,
        savedAmount: parsed.savedAmount ?? 0,
        color: parsed.color ?? '#4aab8d',
        notes: parsed.notes,
      },
    });
    return {
      ...item,
      targetAmount: decimalToNumber(item.targetAmount),
      savedAmount: decimalToNumber(item.savedAmount),
    };
  },
  async update(userId: string, id: string, data: unknown) {
    const parsed = savingsGoalUpdateSchema.parse(data);
    const existing = await prisma.savingsGoal.findFirst({ where: { id, userId } });
    if (!existing) throw new ApiError(404, 'Savings goal not found');
    const item = await prisma.savingsGoal.update({
      where: { id },
      data: {
        ...(parsed.name != null && { name: parsed.name }),
        ...(parsed.targetAmount != null && { targetAmount: parsed.targetAmount }),
        ...(parsed.savedAmount != null && { savedAmount: parsed.savedAmount }),
        ...(parsed.color != null && { color: parsed.color }),
        ...(parsed.notes != null && { notes: parsed.notes }),
      },
    });
    return {
      ...item,
      targetAmount: decimalToNumber(item.targetAmount),
      savedAmount: decimalToNumber(item.savedAmount),
    };
  },
  async delete(userId: string, id: string) {
    const existing = await prisma.savingsGoal.findFirst({ where: { id, userId } });
    if (!existing) throw new ApiError(404, 'Savings goal not found');
    await prisma.savingsGoal.delete({ where: { id } });
  },
};
