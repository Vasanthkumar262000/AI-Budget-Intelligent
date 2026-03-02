import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useApi } from '@/hooks/useApi';
import { useQueryClient } from '@tanstack/react-query';

const formSchema = z.object({
  month: z.number().min(0).max(11),
  year: z.number().int().min(2020),
  amount: z.number().nonnegative(),
});

type FormData = z.infer<typeof formSchema>;

export function MonthlyIncomeForm() {
  const [open, setOpen] = useState(false);
  const api = useApi();
  const qc = useQueryClient();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      amount: 0,
    },
  });

  const onSubmit = async (data: FormData) => {
    await api.post('/income', data);
    qc.invalidateQueries({ queryKey: ['income'] });
    reset();
    setOpen(false);
  };

  return (
    <div className="mb-6">
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add Monthly Income
      </button>
      {open && (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 p-4 bg-white rounded-lg border space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium mb-1">Month</label>
            <select {...register('month', { valueAsNumber: true })} className="w-full border rounded px-3 py-2">
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i}>
                  {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Year</label>
            <input
              type="number"
              {...register('year', { valueAsNumber: true })}
              className="w-full border rounded px-3 py-2"
            />
            {errors.year && <p className="text-red-500 text-sm">{errors.year.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Amount</label>
            <input
              type="number"
              step="0.01"
              {...register('amount', { valueAsNumber: true })}
              className="w-full border rounded px-3 py-2"
            />
            {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}
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
