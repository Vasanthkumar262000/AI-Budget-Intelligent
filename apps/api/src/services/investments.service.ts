import { Decimal } from '@prisma/client/runtime/library';
import { prisma } from '../lib/prisma';
import { ApiError } from '../utils/ApiError';
import { investmentCreateSchema, investmentUpdateSchema } from '@budget-intelligence/shared';

function decimalToNumber(d: Decimal | null | undefined): number {
  return d ? Number(d) : 0;
}

function parseDate(v: string | Date): Date {
  if (typeof v === 'string') return new Date(v);
  return v;
}

export const investmentsService = {
  async getAll(userId: string) {
    const items = await prisma.investment.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
    });
    return items.map((i) => ({
      ...i,
      amount: decimalToNumber(i.amount),
      returnPct: i.returnPct != null ? decimalToNumber(i.returnPct) : null,
    }));
  },
  async getSummary(userId: string) {
    const items = await prisma.investment.groupBy({
      by: ['type'],
      where: { userId },
      _sum: { amount: true },
      _avg: { returnPct: true },
    });
    return items.map((i) => ({
      type: i.type,
      total: decimalToNumber(i._sum.amount),
      avgReturnPct: i._avg.returnPct != null ? decimalToNumber(i._avg.returnPct) : null,
    }));
  },
  async getOne(userId: string, id: string) {
    const item = await prisma.investment.findFirst({
      where: { id, userId },
    });
    if (!item) throw new ApiError(404, 'Investment not found');
    return {
      ...item,
      amount: decimalToNumber(item.amount),
      returnPct: item.returnPct != null ? decimalToNumber(item.returnPct) : null,
    };
  },
  async create(userId: string, data: unknown) {
    const parsed = investmentCreateSchema.parse(data);
    const item = await prisma.investment.create({
      data: {
        userId,
        name: parsed.name,
        type: parsed.type,
        amount: parsed.amount,
        returnPct: parsed.returnPct,
        date: parseDate(parsed.date),
        notes: parsed.notes,
      },
    });
    return {
      ...item,
      amount: decimalToNumber(item.amount),
      returnPct: item.returnPct != null ? decimalToNumber(item.returnPct) : null,
    };
  },
  async update(userId: string, id: string, data: unknown) {
    const parsed = investmentUpdateSchema.parse(data);
    const existing = await prisma.investment.findFirst({ where: { id, userId } });
    if (!existing) throw new ApiError(404, 'Investment not found');
    const item = await prisma.investment.update({
      where: { id },
      data: {
        ...(parsed.name != null && { name: parsed.name }),
        ...(parsed.type != null && { type: parsed.type }),
        ...(parsed.amount != null && { amount: parsed.amount }),
        ...(parsed.returnPct != null && { returnPct: parsed.returnPct }),
        ...(parsed.date != null && { date: parseDate(parsed.date) }),
        ...(parsed.notes != null && { notes: parsed.notes }),
      },
    });
    return {
      ...item,
      amount: decimalToNumber(item.amount),
      returnPct: item.returnPct != null ? decimalToNumber(item.returnPct) : null,
    };
  },
  async delete(userId: string, id: string) {
    const existing = await prisma.investment.findFirst({ where: { id, userId } });
    if (!existing) throw new ApiError(404, 'Investment not found');
    await prisma.investment.delete({ where: { id } });
  },
};
