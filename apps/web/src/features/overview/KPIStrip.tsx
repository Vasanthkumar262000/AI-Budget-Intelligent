import { useExpenses } from '@/hooks/useExpenses';
import { useUIStore } from '@/store/uiStore';
import { useMonthlyIncome } from '@/hooks/useMonthlyIncome';
import { useSubscriptions } from '@/hooks/useSubscriptions';
import { useInvestments } from '@/hooks/useInvestments';
import { formatCurrency } from '@budget-intelligence/shared';

export function KPIStrip() {
  const { selectedMonth, selectedYear } = useUIStore();
  const { data: expenses } = useExpenses(selectedMonth, selectedYear);
  const { data: income } = useMonthlyIncome();
  const { data: subscriptions } = useSubscriptions();
  const { data: investments } = useInvestments();

  const totalIncome =
    income?.filter((i: { month: number; year: number }) => i.month === selectedMonth && i.year === selectedYear)
      .reduce((s: number, i: { amount?: number }) => s + (i.amount ?? 0), 0) ?? 0;
  const totalExpenses = expenses?.reduce((s: number, e: { amount?: number }) => s + (e.amount ?? 0), 0) ?? 0;
  const totalSubs = subscriptions?.filter((s: { isActive?: boolean }) => s.isActive).reduce((a: number, s: { amount?: number; billing?: string }) => {
    const amt = s.amount ?? 0;
    if (s.billing === 'Monthly') return a + amt;
    if (s.billing === 'Annual') return a + amt / 12;
    return a + amt * 4.33;
  }, 0) ?? 0;
  const totalInvested = investments?.reduce((s: number, i: { amount?: number }) => s + (i.amount ?? 0), 0) ?? 0;
  const balance = totalIncome - totalExpenses - totalSubs;

  const kpis = [
    { label: 'Income', value: formatCurrency(totalIncome), color: 'text-green-600' },
    { label: 'Expenses', value: formatCurrency(totalExpenses), color: 'text-red-600' },
    { label: 'Subscriptions', value: formatCurrency(totalSubs), color: 'text-orange-600' },
    { label: 'Invested', value: formatCurrency(totalInvested), color: 'text-blue-600' },
    { label: 'Balance', value: formatCurrency(balance), color: balance >= 0 ? 'text-green-600' : 'text-red-600' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-4">
      {kpis.map(({ label, value, color }) => (
        <div key={label} className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-500">{label}</p>
          <p className={`text-xl font-semibold ${color}`}>{value}</p>
        </div>
      ))}
    </div>
  );
}
