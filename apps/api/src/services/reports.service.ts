import { Decimal } from '@prisma/client/runtime/library';
import { prisma } from '../lib/prisma';

function decimalToNumber(d: Decimal | null | undefined): number {
  return d ? Number(d) : 0;
}

export const reportsService = {
  async getMonthly(
    userId: string,
    opts: { month: number; year: number }
  ) {
    const start = new Date(opts.year, opts.month, 1);
    const end = new Date(opts.year, opts.month + 1, 0, 23, 59, 59);

    const [income, expenses, subscriptions] = await Promise.all([
      prisma.monthlyIncome.findUnique({
        where: {
          userId_month_year: { userId, month: opts.month, year: opts.year },
        },
      }),
      prisma.expense.findMany({
        where: { userId, date: { gte: start, lte: end } },
      }),
      prisma.subscription.findMany({
        where: { userId, isActive: true },
      }),
    ]);

    const totalIncome = income ? decimalToNumber(income.amount) : 0;
    const totalExpenses = expenses.reduce((s, e) => s + decimalToNumber(e.amount), 0);
    const byCategory = expenses.reduce<Record<string, number>>((acc, e) => {
      acc[e.category] = (acc[e.category] ?? 0) + decimalToNumber(e.amount);
      return acc;
    }, {});
    const subsMonthly = subscriptions.reduce((s, sub) => {
      const amt = decimalToNumber(sub.amount);
      if (sub.billing === 'Monthly') return s + amt;
      if (sub.billing === 'Annual') return s + amt / 12;
      if (sub.billing === 'Weekly') return s + amt * 4.33;
      return s;
    }, 0);

    return {
      month: opts.month,
      year: opts.year,
      income: totalIncome,
      expenses: totalExpenses,
      subscriptions: subsMonthly,
      byCategory,
      balance: totalIncome - totalExpenses - subsMonthly,
    };
  },
  async getYearly(userId: string, year: number) {
    const incomes = await prisma.monthlyIncome.findMany({
      where: { userId, year },
    });
    const expenses = await prisma.expense.findMany({
      where: {
        userId,
        date: {
          gte: new Date(year, 0, 1),
          lt: new Date(year + 1, 0, 1),
        },
      },
    });
    const subscriptions = await prisma.subscription.findMany({
      where: { userId, isActive: true },
    });

    const monthlyIncome = Array.from({ length: 12 }, (_, m) => {
      const inc = incomes.find((i) => i.month === m);
      return inc ? decimalToNumber(inc.amount) : 0;
    });
    const monthlyExpenses = Array.from({ length: 12 }, (_, m) => {
      return expenses
        .filter((e) => e.date.getMonth() === m)
        .reduce((s, e) => s + decimalToNumber(e.amount), 0);
    });
    const subsMonthly = subscriptions.reduce((s, sub) => {
      const amt = decimalToNumber(sub.amount);
      if (sub.billing === 'Monthly') return s + amt;
      if (sub.billing === 'Annual') return s + amt / 12;
      if (sub.billing === 'Weekly') return s + amt * 4.33;
      return s;
    }, 0);

    return {
      year,
      monthlyIncome,
      monthlyExpenses,
      subscriptionsMonthly: subsMonthly * 12,
      totalIncome: monthlyIncome.reduce((a, b) => a + b, 0),
      totalExpenses: monthlyExpenses.reduce((a, b) => a + b, 0),
    };
  },
};
