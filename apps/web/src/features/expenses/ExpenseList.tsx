import { useExpenses } from '@/hooks/useExpenses';
import { ExpenseRow } from './ExpenseRow';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { EmptyState } from '@/components/shared/EmptyState';

export function ExpenseList() {
  const { data: expenses, isLoading, error } = useExpenses();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500">Failed to load expenses</p>;
  if (!expenses?.length) return <EmptyState message="No expenses yet. Add one to get started." />;

  return (
    <div className="bg-white rounded-lg border divide-y">
      {expenses.map((exp: { id: string; description: string; amount: number; category: string; date: string }) => (
        <ExpenseRow key={exp.id} expense={exp} />
      ))}
    </div>
  );
}
