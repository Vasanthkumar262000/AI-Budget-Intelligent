import { Decimal } from '@prisma/client/runtime/library';
import { prisma } from '../lib/prisma';
import { ApiError } from '../utils/ApiError';
import { expenseCreateSchema, expenseUpdateSchema } from '@budget-intelligence/shared';

function decimalToNumber(d: Decimal | null | undefined): number {
  return d ? Number(d) : 0;
}

function parseDate(v: string | Date): Date {
  if (typeof v === 'string') return new Date(v);
  return v;
}

export const expensesService = {
  async getAll(
    userId: string,
    filters?: { month?: number; year?: number }
  ) {
    const where: { userId: string; date?: { gte?: Date; lt?: Date } } = { userId };
    if (filters?.month !== undefined && filters?.year !== undefined) {
      const start = new Date(filters.year, filters.month, 1);
      const end = new Date(filters.year, filters.month + 1, 0, 23, 59, 59);
      where.date = { gte: start, lt: end };
    }
    const items = await prisma.expense.findMany({
      where,
      orderBy: { date: 'desc' },
    });
    return items.map((i) => ({
      ...i,
      amount: decimalToNumber(i.amount),
    }));
  },
  async getSummary(
    userId: string,
    filters?: { month?: number; year?: number }
  ) {
    const where: { userId: string; date?: { gte?: Date; lt?: Date } } = { userId };
    if (filters?.month !== undefined && filters?.year !== undefined) {
      const start = new Date(filters.year, filters.month, 1);
      const end = new Date(filters.year, filters.month + 1, 0, 23, 59, 59);
      where.date = { gte: start, lt: end };
    }
    const items = await prisma.expense.groupBy({
      by: ['category'],
      where,
      _sum: { amount: true },
    });
    return items.map((i) => ({
      category: i.category,
      total: decimalToNumber(i._sum.amount),
    }));
  },
  async getOne(userId: string, id: string) {
    const item = await prisma.expense.findFirst({
      where: { id, userId },
    });
    if (!item) throw new ApiError(404, 'Expense not found');
    return { ...item, amount: decimalToNumber(item.amount) };
  },
  async create(userId: string, data: unknown) {
    const parsed = expenseCreateSchema.parse(data);
    const item = await prisma.expense.create({
      data: {
        userId,
        description: parsed.description,
        amount: parsed.amount,
        category: parsed.category,
        date: parseDate(parsed.date),
        notes: parsed.notes,
      },
    });
    return { ...item, amount: decimalToNumber(item.amount) };
  },
  async update(userId: string, id: string, data: unknown) {
    const parsed = expenseUpdateSchema.parse(data);
    const existing = await prisma.expense.findFirst({ where: { id, userId } });
    if (!existing) throw new ApiError(404, 'Expense not found');
    const item = await prisma.expense.update({
      where: { id },
      data: {
        ...(parsed.description != null && { description: parsed.description }),
        ...(parsed.amount != null && { amount: parsed.amount }),
        ...(parsed.category != null && { category: parsed.category }),
        ...(parsed.date != null && { date: parseDate(parsed.date) }),
        ...(parsed.notes != null && { notes: parsed.notes }),
      },
    });
    return { ...item, amount: decimalToNumber(item.amount) };
  },
  async delete(userId: string, id: string) {
    const existing = await prisma.expense.findFirst({ where: { id, userId } });
    if (!existing) throw new ApiError(404, 'Expense not found');
    await prisma.expense.delete({ where: { id } });
  },
};
