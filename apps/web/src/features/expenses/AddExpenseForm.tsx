import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { expenseCategoryEnum } from '@budget-intelligence/shared';
import { useCreateExpense } from '@/hooks/useExpenses';
import { EXPENSE_CATEGORIES } from '@/constants/categories';

const formSchema = z.object({
  description: z.string().min(1, 'Required'),
  amount: z.number().positive('Must be positive'),
  category: expenseCategoryEnum,
  date: z.string().min(1),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function AddExpenseForm() {
  const [open, setOpen] = useState(false);
  const create = useCreateExpense();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { date: new Date().toISOString().slice(0, 10) },
  });

  const onSubmit = async (data: FormData) => {
    await create.mutateAsync({
      ...data,
      date: new Date(data.date).toISOString(),
    });
    reset();
    setOpen(false);
  };

  return (
    <div className="mb-6">
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add Expense
      </button>
      {open && (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 p-4 bg-white rounded-lg border space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <input {...register('description')} className="w-full border rounded px-3 py-2" />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Amount</label>
            <input type="number" step="0.01" {...register('amount', { valueAsNumber: true })} className="w-full border rounded px-3 py-2" />
            {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select {...register('category')} className="w-full border rounded px-3 py-2">
              {EXPENSE_CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input type="date" {...register('date')} className="w-full border rounded px-3 py-2" />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Save
            </button>
            <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 border rounded hover:bg-gray-50">
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
