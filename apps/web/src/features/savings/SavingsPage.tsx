import { useSavings } from '@/hooks/useSavings';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { EmptyState } from '@/components/shared/EmptyState';
import { formatCurrency } from '@budget-intelligence/shared';

export function SavingsPage() {
  const { data: goals, isLoading, error } = useSavings();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500">Failed to load savings goals</p>;
  if (!goals?.length) return <EmptyState message="No savings goals yet." />;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Savings Goals</h1>
      <div className="grid gap-4">
        {goals.map((goal: { id: string; name: string; targetAmount: number; savedAmount: number }) => {
          const pct = goal.targetAmount > 0 ? (goal.savedAmount / goal.targetAmount) * 100 : 0;
          return (
            <div key={goal.id} className="bg-white rounded-lg border p-4">
              <div className="flex justify-between mb-2">
                <p className="font-medium">{goal.name}</p>
                <p>{formatCurrency(goal.savedAmount)} / {formatCurrency(goal.targetAmount)}</p>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500"
                  style={{ width: `${Math.min(pct, 100)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
