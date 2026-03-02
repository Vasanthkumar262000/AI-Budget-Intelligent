import { formatCurrency } from '@budget-intelligence/shared';

interface ExpenseRowProps {
  expense: { id: string; description: string; amount: number; category: string; date: string };
}

export function ExpenseRow({ expense }: ExpenseRowProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div>
        <p className="font-medium">{expense.description}</p>
        <p className="text-sm text-gray-500">{expense.category} · {new Date(expense.date).toLocaleDateString()}</p>
      </div>
      <p className="font-semibold text-red-600">{formatCurrency(expense.amount)}</p>
    </div>
  );
}
