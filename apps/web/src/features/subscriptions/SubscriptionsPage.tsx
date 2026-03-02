import { useSubscriptions } from '@/hooks/useSubscriptions';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { EmptyState } from '@/components/shared/EmptyState';
import { formatCurrency } from '@budget-intelligence/shared';

export function SubscriptionsPage() {
  const { data: subs, isLoading, error } = useSubscriptions();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500">Failed to load subscriptions</p>;
  if (!subs?.length) return <EmptyState message="No subscriptions yet." />;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Subscriptions</h1>
      <div className="bg-white rounded-lg border divide-y">
        {subs.map((sub: { id: string; name: string; billing: string; amount: number; isActive?: boolean }) => (
          <div key={sub.id} className="p-4 flex justify-between items-center">
            <div>
              <p className="font-medium">{sub.name}</p>
              <p className="text-sm text-gray-500">{sub.billing} · {sub.isActive ? 'Active' : 'Inactive'}</p>
            </div>
            <p className="font-semibold">{formatCurrency(sub.amount)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
