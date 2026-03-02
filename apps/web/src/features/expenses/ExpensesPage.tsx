import { AddExpenseForm } from './AddExpenseForm';
import { ExpenseList } from './ExpenseList';

export function ExpensesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Expenses</h1>
      <AddExpenseForm />
      <ExpenseList />
    </div>
  );
}
