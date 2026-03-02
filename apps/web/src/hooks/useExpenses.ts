import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useApi } from './useApi';

export function useExpenses(month?: number, year?: number) {
  const api = useApi();
  return useQuery({
    queryKey: ['expenses', month, year],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (month != null) params.set('month', String(month));
      if (year != null) params.set('year', String(year));
      const { data } = await api.get(`/expenses?${params}`);
      return data.data;
    },
  });
}

export function useCreateExpense() {
  const api = useApi();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (body: unknown) => {
      const { data } = await api.post('/expenses', body);
      return data.data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['expenses'] }),
  });
}
