import { Decimal } from '@prisma/client/runtime/library';
import Anthropic from '@anthropic-ai/sdk';
import { prisma } from '../lib/prisma';
import { ApiError } from '../utils/ApiError';

function decimalToNumber(d: Decimal | null | undefined): number {
  return d ? Number(d) : 0;
}

function formatCurrency(n: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);
}

export const aiService = {
  async analyze(userId: string, month?: number, year?: number) {
    const m = month ?? new Date().getMonth();
    const y = year ?? new Date().getFullYear();

    const [incomes, expenses, investments, savings, subscriptions] = await Promise.all([
      prisma.monthlyIncome.findMany({ where: { userId } }),
      prisma.expense.findMany({
        where: {
          userId,
          date: {
            gte: new Date(y, m, 1),
            lt: new Date(y, m + 1, 1),
          },
        },
      }),
      prisma.investment.findMany({ where: { userId } }),
      prisma.savingsGoal.findMany({ where: { userId } }),
      prisma.subscription.findMany({ where: { userId, isActive: true } }),
    ]);

    const incomeForMonth = incomes.find((i) => i.month === m && i.year === y);
    const totalIncome = incomeForMonth ? decimalToNumber(incomeForMonth.amount) : 0;
    const totalExpenses = expenses.reduce((s, e) => s + decimalToNumber(e.amount), 0);
    const byCategory = expenses.reduce<Record<string, number>>((acc, e) => {
      acc[e.category] = (acc[e.category] ?? 0) + decimalToNumber(e.amount);
      return acc;
    }, {});
    const totalInvested = investments.reduce((s, i) => s + decimalToNumber(i.amount), 0);
    const subsMonthly = subscriptions.reduce((s, sub) => {
      const amt = decimalToNumber(sub.amount);
      if (sub.billing === 'Monthly') return s + amt;
      if (sub.billing === 'Annual') return s + amt / 12;
      if (sub.billing === 'Weekly') return s + amt * 4.33;
      return s;
    }, 0);

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) throw new ApiError(500, 'AI service not configured');

    const prompt = `You are a financial advisor. Analyze this user's financial data for ${m + 1}/${y}.

INCOME: ${formatCurrency(totalIncome)}
EXPENSES: ${formatCurrency(totalExpenses)} — by category: ${JSON.stringify(byCategory)}
SUBSCRIPTIONS (monthly equiv): ${formatCurrency(subsMonthly)}
INVESTMENTS: ${formatCurrency(totalInvested)}
SAVINGS GOALS: ${savings.length} goals

Provide a concise analysis (4-6 paragraphs) covering:
1. Spending optimization
2. Investment strategy
3. Subscription audit
4. Savings acceleration
5. Key risks

Be specific and actionable.`;

    const anthropic = new Anthropic({ apiKey });
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    });

    const content = response.content.find((c) => c.type === 'text');
    const text = content && 'text' in content ? content.text : 'No analysis generated.';

    const analysis = await prisma.aIAnalysis.create({
      data: { userId, month: m, year: y, content: text },
    });

    return { id: analysis.id, content: text };
  },
  async getHistory(userId: string) {
    const items = await prisma.aIAnalysis.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });
    return items.map((i) => ({
      id: i.id,
      month: i.month,
      year: i.year,
      content: i.content,
      createdAt: i.createdAt,
    }));
  },
};
