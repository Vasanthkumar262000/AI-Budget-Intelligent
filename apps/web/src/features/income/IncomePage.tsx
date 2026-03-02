import { useMonthlyIncome } from '@/hooks/useMonthlyIncome';
import { MonthlyIncomeForm } from './MonthlyIncomeForm';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { formatCurrency } from '@budget-intelligence/shared';
import { getMonthName } from '@budget-intelligence/shared';

export function IncomePage() {
  const { data: incomes, isLoading, error } = useMonthlyIncome();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500">Failed to load income</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Monthly Income</h1>
      <MonthlyIncomeForm />
      {!incomes?.length ? (
        <p className="text-gray-500">No income configured. Add monthly income to get started.</p>
      ) : (
        <div className="bg-white rounded-lg border divide-y">
          {incomes.map((inc: { id: string; month: number; year: number; amount: number }) => (
            <div key={inc.id} className="p-4 flex justify-between">
              <p className="font-medium">{getMonthName(inc.month)} {inc.year}</p>
              <p className="font-semibold text-green-600">{formatCurrency(inc.amount)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
