import { Decimal } from '@prisma/client/runtime/library';
import { prisma } from '../lib/prisma';
import { ApiError } from '../utils/ApiError';
import { subscriptionCreateSchema, subscriptionUpdateSchema } from '@budget-intelligence/shared';

function decimalToNumber(d: Decimal | null | undefined): number {
  return d ? Number(d) : 0;
}

function parseDate(v: string | Date | null | undefined): Date | null {
  if (v == null) return null;
  if (typeof v === 'string') return new Date(v);
  return v;
}

export const subscriptionsService = {
  async getAll(userId: string) {
    const items = await prisma.subscription.findMany({
      where: { userId },
    });
    return items.map((i) => ({
      ...i,
      amount: decimalToNumber(i.amount),
    }));
  },
  async create(userId: string, data: unknown) {
    const parsed = subscriptionCreateSchema.parse(data);
    const item = await prisma.subscription.create({
      data: {
        userId,
        name: parsed.name,
        amount: parsed.amount,
        billing: parsed.billing,
        category: parsed.category,
        nextDate: parseDate(parsed.nextDate),
        isActive: parsed.isActive ?? true,
        notes: parsed.notes,
      },
    });
    return { ...item, amount: decimalToNumber(item.amount) };
  },
  async update(userId: string, id: string, data: unknown) {
    const parsed = subscriptionUpdateSchema.parse(data);
    const existing = await prisma.subscription.findFirst({ where: { id, userId } });
    if (!existing) throw new ApiError(404, 'Subscription not found');
    const item = await prisma.subscription.update({
      where: { id },
      data: {
        ...(parsed.name != null && { name: parsed.name }),
        ...(parsed.amount != null && { amount: parsed.amount }),
        ...(parsed.billing != null && { billing: parsed.billing }),
        ...(parsed.category != null && { category: parsed.category }),
        ...(parsed.nextDate !== undefined && { nextDate: parseDate(parsed.nextDate) }),
        ...(parsed.isActive != null && { isActive: parsed.isActive }),
        ...(parsed.notes != null && { notes: parsed.notes }),
      },
    });
    return { ...item, amount: decimalToNumber(item.amount) };
  },
  async toggle(userId: string, id: string) {
    const existing = await prisma.subscription.findFirst({ where: { id, userId } });
    if (!existing) throw new ApiError(404, 'Subscription not found');
    const item = await prisma.subscription.update({
      where: { id },
      data: { isActive: !existing.isActive },
    });
    return { ...item, amount: decimalToNumber(item.amount) };
  },
  async delete(userId: string, id: string) {
    const existing = await prisma.subscription.findFirst({ where: { id, userId } });
    if (!existing) throw new ApiError(404, 'Subscription not found');
    await prisma.subscription.delete({ where: { id } });
  },
};
