import { KPIStrip } from './KPIStrip';
import { MonthSelector } from '@/components/shared/MonthSelector';
import { HealthScoreGauge } from '@/components/shared/HealthScoreGauge';
import { AreaChart } from '@/components/charts/AreaChart';
import { DonutChart } from '@/components/charts/DonutChart';
import { useUIStore } from '@/store/uiStore';
import { useExpenseSummary } from '@/hooks/useExpenseSummary';
import { useHealthScore } from '@/hooks/useHealthScore';
import { useMonthlyIncome } from '@/hooks/useMonthlyIncome';
import { useSubscriptions } from '@/hooks/useSubscriptions';
import { useExpenses } from '@/hooks/useExpenses';
import { getMonthName } from '@budget-intelligence/shared';

export function OverviewPage() {
  const { selectedMonth, selectedYear, setSelectedMonth, setSelectedYear } = useUIStore();
  const healthScore = useHealthScore(selectedMonth, selectedYear);
  const { data: summary } = useExpenseSummary(selectedMonth, selectedYear);
  const { data: income } = useMonthlyIncome(selectedYear);
  const { data: allExpenses } = useExpenses();
  const { data: subs } = useSubscriptions();

  const donutData =
    summary?.map((s: { category: string; total: number }) => ({ name: s.category, value: s.total })) ?? [];

  const yearlyData = Array.from({ length: 12 }, (_, m) => {
    const inc = income?.find((i: { month: number; year: number }) => i.month === m && i.year === selectedYear);
    const exp = allExpenses?.filter(
      (e: { date: string }) =>
        new Date(e.date).getMonth() === m && new Date(e.date).getFullYear() === selectedYear
    );
    const subTotal =
      subs?.filter((s: { isActive: boolean }) => s.isActive).reduce((a: number, s: { amount: number; billing: string }) => {
        const amt = s.amount;
        if (s.billing === 'Monthly') return a + amt;
        if (s.billing === 'Annual') return a + amt / 12;
        return a + amt * 4.33;
      }, 0) ?? 0;
    return {
      name: getMonthName(m).slice(0, 3),
      income: inc?.amount ?? 0,
      expenses: exp?.reduce((s: number, e: { amount: number }) => s + e.amount, 0) ?? 0,
      subscriptions: subTotal,
    };
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Overview</h1>
      <MonthSelector
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        onSelect={(m, y) => {
          setSelectedMonth(m);
          setSelectedYear(y);
        }}
      />
      <KPIStrip />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white rounded-lg border p-4">
          <h2 className="font-semibold mb-4">Income vs Expenses vs Subscriptions</h2>
          <AreaChart data={yearlyData} />
        </div>
        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-lg border p-4 flex justify-center">
            <HealthScoreGauge score={healthScore} />
          </div>
          {donutData.length > 0 && (
            <div className="bg-white rounded-lg border p-4">
              <h2 className="font-semibold mb-4">Spending by Category</h2>
              <DonutChart data={donutData} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
