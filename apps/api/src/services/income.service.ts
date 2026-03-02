import { Decimal } from '@prisma/client/runtime/library';
import { prisma } from '../lib/prisma';
import { monthlyIncomeSchema } from '@budget-intelligence/shared';

function decimalToNumber(d: Decimal | null | undefined): number {
  return d ? Number(d) : 0;
}

export const incomeService = {
  async getAll(userId: string) {
    const items = await prisma.monthlyIncome.findMany({
      where: { userId },
      orderBy: [{ year: 'desc' }, { month: 'desc' }],
    });
    return items.map((i) => ({
      ...i,
      amount: decimalToNumber(i.amount),
    }));
  },
  async getByMonth(userId: string, year: number, month: number) {
    const item = await prisma.monthlyIncome.findUnique({
      where: { userId_month_year: { userId, month, year } },
    });
    return item ? { ...item, amount: decimalToNumber(item.amount) } : null;
  },
  async upsert(userId: string, data: unknown) {
    const parsed = monthlyIncomeSchema.parse(data);
    const item = await prisma.monthlyIncome.upsert({
      where: {
        userId_month_year: { userId, month: parsed.month, year: parsed.year },
      },
      create: { userId, month: parsed.month, year: parsed.year, amount: parsed.amount },
      update: { amount: parsed.amount },
    });
    return { ...item, amount: decimalToNumber(item.amount) };
  },
  async delete(userId: string, id: string) {
    await prisma.monthlyIncome.deleteMany({
      where: { id, userId },
    });
  },
};
