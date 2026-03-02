import { useExpenses } from './useExpenses';
import { useMonthlyIncome } from './useMonthlyIncome';
import { useSubscriptions } from './useSubscriptions';

export function useHealthScore(month?: number, year?: number): number {
  const { data: expenses } = useExpenses(month, year);
  const { data: income } = useMonthlyIncome(year);
  const { data: subs } = useSubscriptions();

  const totalIncome = income
    ?.filter((i: { month: number }) => i.month === (month ?? new Date().getMonth()))
    .reduce((s: number, i: { amount: number }) => s + i.amount, 0) ?? 0;
  const totalExpenses = expenses?.reduce((s: number, e: { amount: number }) => s + e.amount, 0) ?? 0;
  const totalSubs =
    subs?.filter((s: { isActive: boolean }) => s.isActive).reduce((a: number, s: { amount: number; billing: string }) => {
      const amt = s.amount;
      if (s.billing === 'Monthly') return a + amt;
      if (s.billing === 'Annual') return a + amt / 12;
      return a + amt * 4.33;
    }, 0) ?? 0;

  if (totalIncome <= 0) return 50;
  const savingsRate = (totalIncome - totalExpenses - totalSubs) / totalIncome;
  const expenseRatio = totalExpenses / totalIncome;
  let score = 50;
  if (savingsRate > 0.2) score += 25;
  else if (savingsRate > 0.1) score += 15;
  else if (savingsRate > 0) score += 5;
  if (expenseRatio > 1) score -= 30;
  else if (expenseRatio > 0.9) score -= 15;
  return Math.min(100, Math.max(0, score));
}
