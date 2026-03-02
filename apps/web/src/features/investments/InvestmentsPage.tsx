import { useInvestments } from '@/hooks/useInvestments';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { EmptyState } from '@/components/shared/EmptyState';
import { formatCurrency } from '@budget-intelligence/shared';

export function InvestmentsPage() {
  const { data: investments, isLoading, error } = useInvestments();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500">Failed to load investments</p>;
  if (!investments?.length) return <EmptyState message="No investments yet." />;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Investments</h1>
      <div className="bg-white rounded-lg border divide-y">
        {investments.map((inv: { id: string; name: string; type: string; amount: number }) => (
          <div key={inv.id} className="p-4 flex justify-between">
            <div>
              <p className="font-medium">{inv.name}</p>
              <p className="text-sm text-gray-500">{inv.type}</p>
            </div>
            <p className="font-semibold">{formatCurrency(inv.amount)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
